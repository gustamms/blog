---
title: "Guia completo de Kafka com Docker e PHP"
description: "Aprenda o que é Kafka, como funciona e como configurar um ambiente local com Docker para consumir e produzir mensagens com PHP."
tags: [kafka, docker, php, backend, mensageria]
date: "2026-04-05"
---

# Guia completo de Kafka com Docker e PHP

Se voce ja ouviu falar em Kafka e ficou perdido sem saber por onde comecar, este post e para voce. Vou explicar desde o basico ate um exemplo pratico usando PHP, tudo rodando em containers Docker — nada instalado na maquina.

## O que e Kafka?

Apache Kafka e uma plataforma de **streaming distribuido** de codigo aberto, originalmente desenvolvida pelo LinkedIn. Ele funciona como um sistema de **mensageria** de alta performance, capaz de processar milhoes de eventos por segundo.

Pense no Kafka como um "grande buffer" entre produtores e consumidores de dados:

```
Produtor → Kafka (topico) → Consumidor
```

A grande diferenca entre Kafka e sistemas de mensageria tradicionais e que **ele armazena as mensagens por tempo configuravel**, permitindo que multiplos consumidores leiam os mesmos dados em ritmos diferentes.

## Conceitos fundamentais

### Broker

Um broker e uma instancia (servidor) do Kafka. Em producao, voce geralmente tem varios brokers trabalhando juntos em cluster para garantir alta disponibilidade.

### Topico (Topic)

Um topico e como uma **categoria** ou **canal** onde as mensagens sao publicadas. Por exemplo:

- `pedidos` → todas as mensagens relacionadas a pedidos
- `logs` → logs da aplicacao
- `emails` → fila de envio de emails

### Particao

Cada topico pode ser dividido em **particoes**. Particoes permitem que o Kafka processe mensagens em paralelo e escale horizontalmente.

```
Topico: pedidos
├── Particao 0: pedido 1, pedido 4, pedido 7
├── Particao 1: pedido 2, pedido 5, pedido 8
└── Particao 2: pedido 3, pedido 6, pedido 9
```

### Offset

Cada mensagem dentro de uma particao recebe um **offset** — um identificador unico e sequencial. O offset permite que o consumidor saiba exatamente onde parou.

### Producer (Produtor)

E a aplicacao que **publica** mensagens em um ou mais topicos.

### Consumer (Consumidor)

E a aplicacao que **le** mensagens de um ou mais topicos.

### Consumer Group

Varios consumidores podem trabalhar juntos em um **grupo**. Cada particao e consumida por apenas um consumidor do grupo, permitindo processamento paralelo.

### Zookeeper vs KRaft

Antigamente o Kafka dependia do **Zookeeper** para gerenciamento de cluster. A partir da versao 3.3+, o Kafka introduziu o modo **KRaft** (Kafka Raft), que remove a dependencia do Zookeeper e simplifica a arquitetura.

## Subindo o ambiente com Docker

Vamos usar o **Kraft mode** (sem Zookeeper), que e o futuro do Kafka. Crie um arquivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  kafka:
    image: apache/kafka:3.9.0
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
```

Suba o container:

```bash
docker compose up -d
```

Verifique se esta rodando:

```bash
docker ps
```

Voce deve ver o container `kafka` rodando na porta `9092`.

## Criando um topico

Acesse o container do Kafka:

```bash
docker exec -it kafka bash
```

Crie um topico chamado `testes`:

```bash
kafka-topics.sh --create --topic testes --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

Liste os topicos criados:

```bash
kafka-topics.sh --list --bootstrap-server localhost:9092
```

## Exemplo pratico com PHP

Para conectar no Kafka com PHP, vamos usar a extensao **rdkafka** (librdkafka bindings).

### Preparando o ambiente PHP

Crie um `Dockerfile` para o PHP:

```dockerfile
FROM php:8.3-cli

RUN apt-get update && apt-get install -y \
    librdkafka-dev \
    git \
    && pecl install rdkafka \
    && docker-php-ext-enable rdkafka \
    && curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
```

Atualize o `docker-compose.yml` adicionando o servico PHP:

```yaml
version: '3.8'

services:
  kafka:
    image: apache/kafka:3.9.0
    container_name: kafka
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_PROCESS_ROLES: broker,controller
      KAFKA_CONTROLLER_QUORUM_VOTERS: 1@kafka:9093
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT
      KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_CONTROLLER_LISTENER_NAMES: CONTROLLER
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  php:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: php-kafka
    volumes:
      - ./php:/app
    working_dir: /app
    depends_on:
      - kafka
    command: tail -f /dev/null
```

### Produtor — enviando mensagens

Crie o arquivo `php/producer.php`:

```php
<?php

$conf = new RdKafka\Conf();
$conf->set('metadata.broker.list', 'kafka:9092');

$producer = new RdKafka\Producer($conf);

$topic = 'testes';
$mensagem = 'Ola Kafka! Mensagem enviada as ' . date('H:i:s');

$producer->produce($topic, null, $mensagem);
$producer->poll(0); // Forca o envio imediato

// Espera todas as mensagens serem enviadas
for ($flushRetries = 0; $flushRetries < 10; $flushRetries++) {
    $result = $producer->flush(1000);
    if (RD_KAFKA_RESP_ERR_NO_ERROR === $result) {
        break;
    }
}

echo "Mensagem enviada ao topico '{$topic}': {$mensagem}\n";
```

### Consumidor — recebendo mensagens

Crie o arquivo `php/consumer.php`:

```php
<?php

$conf = new RdKafka\Conf();
$conf->set('metadata.broker.list', 'kafka:9092');
$conf->set('group.id', 'meu-grupo');
$conf->set('auto.offset.reset', 'earliest'); // Comeca do inicio se nao houver offset salvo

$consumer = new RdKafka\KafkaConsumer($conf);
$consumer->subscribe(['testes']);

echo "Aguardando mensagens...\n";

while (true) {
    $message = $consumer->consume(5000); // Timeout de 5 segundos

    switch ($message->err) {
        case RD_KAFKA_RESP_ERR_NO_ERROR:
            echo "[{$message->topic_name}|{$message->partition}|{$message->offset}] {$message->payload}\n";
            break;

        case RD_KAFKA_RESP_ERR__PARTITION_EOF:
            echo "Nenhuma mensagem nova no momento...\n";
            break;

        case RD_KAFKA_RESP_ERR__TIMED_OUT:
            echo "Timeout. Aguardando...\n";
            break;

        default:
            echo "Erro: {$message->errstr()}\n";
            break;
    }
}
```

## Testando tudo junto

### 1. Suba os containers

```bash
docker compose up -d
docker compose exec kafka kafka-topics.sh --create --topic testes --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

### 2. Rode o consumidor em um terminal

```bash
docker compose exec php php /app/consumer.php
```

### 3. Em outro terminal, rode o produtor

```bash
docker compose exec php php /app/producer.php
```

### Resultado esperado

No terminal do consumidor, voce vera:

```
Aguardando mensagens...
[testes|0|0] Ola Kafka! Mensagem enviada as 14:32:15
```

Voce pode rodar o produtor varias vezes e ver as mensagens chegando em tempo real no consumidor!

## Resumo das configuracoes importantes

| Configuracao | O que faz |
|---|---|
| `bootstrap.servers` | Lista de brokers para conexao inicial |
| `group.id` | Identifica o grupo de consumidores |
| `auto.offset.reset` | `earliest` (comeca do inicio) ou `latest` (mensagens novas) |
| `enable.auto.commit` | Se true, commits automaticos de offset |
| `metadata.broker.list` | Enderecos dos brokers Kafka |

## Quando usar Kafka?

- **Microsservicos** — comunicacao assincrona entre servicos
- **Logging e monitoramento** — agregacao de logs de multiplas fontes
- **Processamento de streams** — analise de dados em tempo real
- **Event sourcing** ― rastreamento completo de mudancas de estado
- **Pipelines de dados** — alimentacao de data lakes e warehouses

Kafka brilha quando voce precisa de alta throughput, baixa latencia e processamento paralelo de grandes volumes de dados.

## Conclusao

Com Docker, voce sobe um ambiente completo de Kafka em minutos, sem instalar nada na maquina. O PHP, atraves da extensao rdkafka, se conecta facilmente ao Kafka para produzir e consumir mensagens.

O proximo passo seria explorar conceitos avancados como **schemas (Schema Registry)**, **exactly-once semantics** e **Kafka Streams**.
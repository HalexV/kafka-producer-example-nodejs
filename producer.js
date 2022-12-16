import { Kafka } from "kafkajs";
import { randomUUID } from "node:crypto";

async function bootstrap() {
  const kafka = new Kafka({
    clientId: "test-producer",
    brokers: ["ethical-deer-8563-us1-kafka.upstash.io:9092"],
    sasl: {
      mechanism: "scram-sha-256",
      username:
        "ZXRoaWNhbC1kZWVyLTg1NjMkJV8fxO7-BBtOqX9_YlJeBaWudywYJvsgFHY1SNw",
      password:
        "S14g74rJ0lUrdIn5JDnQTjHee7OjJRpR-EmhsUkS1dJ_jP7T59SL7H59hgYYqh8rqymZSg==",
    },
    ssl: true,
  });

  const producer = kafka.producer();

  await producer.connect();
  await producer.send({
    topic: "notifications.send-notification",
    messages: [
      {
        value: JSON.stringify({
          content: "Nova solicitação de amizade!",
          category: "social",
          recipientId: randomUUID(),
        }),
      },
    ],
  });

  await producer.disconnect();
}

bootstrap();

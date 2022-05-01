import {natsClient} from './nats-client'
import {OrderCreatedListener} from './events/listeners/order-created-listener'

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }

  try {
    await natsClient.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    )
    console.log('Connected to Nats');

    natsClient.client.on('close', () => {
      console.log('Disconnected from Nats');
      process.exit();
    })

    new OrderCreatedListener(natsClient.client).listen()

    process.on('SIGINT', () => natsClient.client.close())
    process.on('SIGTERM', () => natsClient.client.close())
  } catch (err) {
    console.error(err);
  }
};

start();

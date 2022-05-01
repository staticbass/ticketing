import {Queue, Worker} from 'bullmq'
import {ExpirationCompletePublisher} from '../events/publishers/expiration-complete-publisher'
import {natsClient} from '../nats-client'

interface Payload {
  orderId: string
}

console.log('connecting', process.env.REDIS_HOST)
const expirationQueue = new Queue<Payload>('order:expiration', {
  connection: {
    host: process.env.REDIS_HOST,
  }
})

const expirationWorker = new Worker('order:expiration', async (job) => {
  new ExpirationCompletePublisher(natsClient.client).publish({
    orderId: job.data.orderId
  })
}, {
  connection: {
    host: process.env.REDIS_HOST,
  }
})

export { expirationQueue, expirationWorker }

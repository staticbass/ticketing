import {IOrderCreatedEvent, Listener, Subjects} from '@staticbass/staticbass-learning'
import {queueGroupName} from './queue-group-name'
import {Message} from 'node-nats-streaming'
import {expirationQueue} from '../../queues/expiration-queues'

export class OrderCreatedListener extends Listener<IOrderCreatedEvent>{
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED
  queueGroupName = queueGroupName

  async onMessage(data: IOrderCreatedEvent['data'], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime()

    await expirationQueue.add('order:expiration', {
      orderId: data.id
    }, {
      delay
    })

    msg.ack()
  }
}
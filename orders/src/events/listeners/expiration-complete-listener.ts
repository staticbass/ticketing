import {Listener} from '@staticbass/staticbass-learning/build/events/base-listener'
import {
  IExpirationCompleteEvent,
  Subjects
} from '@staticbass/staticbass-learning'
import {Message} from 'node-nats-streaming'
import {queueGroupName} from './queue-group-name'
import {Order, OrderStatus} from '../../models/order'
import {OrderCancelledPublisher} from '../publishers/order-cancelled-publisher'

export class ExpirationCompleteListener extends Listener<IExpirationCompleteEvent> {
  subject: Subjects.EXPIRATION_COMPLETE = Subjects.EXPIRATION_COMPLETE
  queueGroupName = queueGroupName

  async onMessage(data: IExpirationCompleteEvent["data"], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket')
    if (!order) {
      throw new Error('order not found')
    }

    order.set({
      status: OrderStatus.Cancelled,
    })
    await order.save()

    new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: order.ticket.id
    })

    msg.ack()
  }
}
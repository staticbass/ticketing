import {IOrderCreatedEvent, Listener, Subjects} from '@staticbass/staticbass-learning'
import {queueGroupName} from './queue-group-name'
import {Message} from 'node-nats-streaming'
import {Ticket} from '../../models/ticket'
import {TicketUpdatedPublisher} from '../publishers/ticket-updated-publisher'

export class OrderCreatedListener extends Listener<IOrderCreatedEvent>{
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED
  queueGroupName = queueGroupName

  async onMessage(data: IOrderCreatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id)

    if (!ticket) {
      throw new Error('ticket not found')
    }

    ticket.set({ orderId: data.id })

    await ticket.save()

    const publisher = new TicketUpdatedPublisher(this.client)
    await publisher.publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      orderId: ticket.orderId,
      userId: ticket.userId,
      version: ticket.version,
    })

    msg.ack()
  }
}
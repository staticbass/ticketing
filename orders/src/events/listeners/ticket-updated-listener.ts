import {Listener} from '@staticbass/staticbass-learning/build/events/base-listener'
import {ITicketCreatedEvent, ITicketUpdatedEvent, Subjects} from '@staticbass/staticbass-learning'
import {Message} from 'node-nats-streaming'
import {queueGroupName} from './queue-group-name'
import {Ticket} from '../../models/ticket'

export class TicketUpdatedListener extends Listener<ITicketUpdatedEvent> {
  subject: Subjects.TICKET_UPDATED = Subjects.TICKET_UPDATED
  queueGroupName = queueGroupName

  async onMessage(data: ITicketCreatedEvent["data"], msg: Message) {
    const ticket = await Ticket.findByEvent(data)
    if (!ticket) {
      throw new Error('ticket not found')
    }

    const { title, price } = data
    ticket.set({ title, price })
    await ticket.save()

    msg.ack()
  }
}
import {Listener} from '@staticbass/staticbass-learning/build/events/base-listener'
import {ITicketCreatedEvent, Subjects} from '@staticbass/staticbass-learning'
import {Message} from 'node-nats-streaming'
import {queueGroupName} from './queue-group-name'
import {Ticket} from '../../models/ticket'

export class TicketCreatedListener extends Listener<ITicketCreatedEvent> {
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED
  queueGroupName = queueGroupName

  async onMessage(data: ITicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data
    const ticket = Ticket.build({
      id,
      title,
      price
    })
    await ticket.save()

    msg.ack()
  }
}
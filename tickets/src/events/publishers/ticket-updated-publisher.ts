import {ITicketUpdatedEvent, Publisher, Subjects} from '@staticbass/staticbass-learning'

export class TicketUpdatedPublisher extends Publisher<ITicketUpdatedEvent>{
  subject: Subjects.TICKET_UPDATED = Subjects.TICKET_UPDATED
}
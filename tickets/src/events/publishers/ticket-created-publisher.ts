import {ITicketCreatedEvent, Publisher, Subjects} from '@staticbass/staticbass-learning'

export class TicketCreatedPublisher extends Publisher<ITicketCreatedEvent>{
  subject: Subjects.TICKET_CREATED = Subjects.TICKET_CREATED
}
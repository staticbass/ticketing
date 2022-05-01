import {IOrderCreatedEvent, Publisher, Subjects} from '@staticbass/staticbass-learning'

export class OrderCreatedPublisher extends Publisher<IOrderCreatedEvent> {
  subject: Subjects.ORDER_CREATED = Subjects.ORDER_CREATED
}
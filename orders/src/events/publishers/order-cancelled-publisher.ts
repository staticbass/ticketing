import {IOrderCancelledEvent, Publisher, Subjects} from '@staticbass/staticbass-learning'

export class OrderCancelledPublisher extends Publisher<IOrderCancelledEvent> {
  subject: Subjects.ORDER_CANCELLED = Subjects.ORDER_CANCELLED
}
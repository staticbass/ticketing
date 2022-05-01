import {IExpirationCompleteEvent, Publisher, Subjects} from '@staticbass/staticbass-learning'

export class ExpirationCompletePublisher extends Publisher<IExpirationCompleteEvent> {
  subject: Subjects.EXPIRATION_COMPLETE = Subjects.EXPIRATION_COMPLETE
}
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from './user-created.event';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  handle(event: UserCreatedEvent) {
    const id = event.userId;
    // POSSO CRIAR UMA LOGICA PARA ENVIAR E-MAIL PARA O USUARIO CRIADO
  }
}

import { Event } from '@prisma/client';

export class CreateEventDto implements Partial<Event> {
  name: string;
  description: string;
  date: Date;
  price: number;
}

import { Event } from '@prisma/client';

export class CreateEventRequest implements Partial<Event> {
  name: string;
  description: string;
  date: Date;
  price: number;
}

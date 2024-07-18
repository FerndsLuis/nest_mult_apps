import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ReserveSpotDto } from './dto/reser.spot.dto';
import { Prisma, SpotStatus, TicketStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: { ...createEventDto, date: new Date(createEventDto.date) },
    });
  }

  findAll() {
    return this.prisma.event.findMany();
  }

  findOne(id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  update(id: string, updateEventDto: UpdateEventDto) {
    return this.prisma.event.update({
      where: { id },
      data: { ...updateEventDto, date: new Date(updateEventDto.date) },
    });
  }

  remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }

  async reserveSpot(dto: ReserveSpotDto & { eventId: string }) {
    console.log('🚀 ~ EventsService ~ reserveSpot ~ dto:', dto);
    const spots = await this.prisma.spot.findMany({
      where: { eventId: dto.eventId, name: { in: dto.spots } },
    });

    if (spots.length !== dto.spots.length) {
      const foundSpotsName = spots.map((spot) => spot.name);
      const notFoundSpotsName = dto.spots.filter(
        (spotName) => !foundSpotsName.includes(spotName),
      );
      throw new Error(`Spots ${notFoundSpotsName.join(', ')} not found`);
    }

    try {
      const tickets = await this.prisma.$transaction(
        async (transaction) => {
          await transaction.reservationHistory.createMany({
            data: spots.map((spot) => ({
              spotId: spot.id,
              ticketKind: dto.ticket_kind,
              email: dto.email,
              status: TicketStatus.reserved,
            })),
          });

          await transaction.spot.updateMany({
            where: { id: { in: spots.map((spot) => spot.id) } },
            data: { status: SpotStatus.reserved },
          });

          const tickets = await Promise.all(
            spots.map((spot) =>
              transaction.ticket.create({
                data: {
                  spotId: spot.id,
                  ticketKind: dto.ticket_kind,
                  email: dto.email,
                },
              }),
            ),
          );

          return tickets;
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted },
      );

      return tickets;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002': // unique constraint violation
          case 'P2034': // transaction conflict
            throw new Error('Some spots are already reserved');
            break;
        }
      }

      throw e;
    }
  }
}

import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { SpotStatus } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SpotsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSpotDto: CreateSpotDto & { eventId: string }) {
    const event = await this.prisma.event.findFirst({
      where: { id: createSpotDto.eventId },
    });

    if (!event) {
      throw new Error('Event not found');
    }

    return this.prisma.spot.create({
      data: { ...createSpotDto, status: SpotStatus.available },
    });
  }

  findAll(eventId: string) {
    return this.prisma.spot.findMany({ where: { eventId } });
  }

  findOne(eventId: string, spotId: string) {
    return this.prisma.spot.findFirst({ where: { id: spotId, eventId } });
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prisma.spot.update({
      where: { id: spotId, eventId },
      data: updateSpotDto,
    });
  }

  remove(eventId: string, spotId: string) {
    return this.prisma.spot.delete({
      where: { id: spotId, eventId },
    });
  }
}

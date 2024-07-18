import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { CreateEventRequest } from './request/create-event.request';
import { UpdateEventRequest } from './request/update-event.request';
import { ReserveSpotRequest } from './request/reser.spot.request';
import { EventsService } from '@app/core/events/events.service';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() createEventRquest: CreateEventRequest) {
    return this.eventsService.create(createEventRquest);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventRequest) {
    return this.eventsService.update(id, updateEventDto);
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @UseGuards(AuthGuard)
  @Post(':id/reserve')
  reserveSpots(
    @Body() reserveRequest: ReserveSpotRequest,
    @Param('id') eventId: string,
  ) {
    return this.eventsService.reserveSpot({ ...reserveRequest, eventId });
  }
}

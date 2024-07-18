import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { CriaEventoRequest } from './request/cria-evento.request';
import { AtualizarEventoRequest } from './request/atualizar-event.request';
import { ReservarLugarRequest } from './request/reservar.lugar.request';
import { EventsService } from '@app/core/events/events.service';

@Controller('eventos')
export class EventosController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  create(@Body() criaEventosRequest: CriaEventoRequest) {
    return this.eventsService.create({
      name: criaEventosRequest.nome,
      description: criaEventosRequest.descricao,
      price: criaEventosRequest.preco,
      date: criaEventosRequest.data,
    });
  }

  @Get()
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() atualizaEventoDto: AtualizarEventoRequest,
  ) {
    return this.eventsService.update(id, {
      name: atualizaEventoDto.nome,
      description: atualizaEventoDto.descricao,
      price: atualizaEventoDto.preco,
      date: atualizaEventoDto.data,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }

  @Post(':id/reservar')
  reserveSpots(
    @Body() reservaLugarRequest: ReservarLugarRequest,
    @Param('id') eventId: string,
  ) {
    return this.eventsService.reserveSpot({
      email: reservaLugarRequest.email,
      spots: reservaLugarRequest.lugares,
      ticket_kind: reservaLugarRequest.tipo_ingresso,

      eventId,
    });
  }
}

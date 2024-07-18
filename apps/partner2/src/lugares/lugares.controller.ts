import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SpotsService } from '@app/core';
import { CriaLugarRequest } from './request/cria-lugar.request';
import { AtualizaLugarRequest } from './request/atualiza-lugar.request';

@Controller('eventos/:eventoId/lugares')
export class LugarController {
  constructor(private readonly spotsService: SpotsService) {}

  @Post()
  create(
    @Body() criaLugarRequest: CriaLugarRequest,
    @Param('eventoId') eventoId: string,
  ) {
    return this.spotsService.create({
      name: criaLugarRequest.nome,
      eventId: eventoId,
    });
  }

  @Get()
  findAll(@Param('eventoId') eventoId: string) {
    return this.spotsService.findAll(eventoId);
  }

  @Get(':spotId')
  findOne(
    @Param('spotId') lugarId: string,
    @Param('eventoId') eventoId: string,
  ) {
    return this.spotsService.findOne(eventoId, lugarId);
  }

  @Patch(':spotId')
  update(
    @Param('spotId') spotId: string,
    @Param('eventoId') eventoId: string,
    @Body() atualizaLugarRequest: AtualizaLugarRequest,
  ) {
    return this.spotsService.update(eventoId, spotId, {
      name: atualizaLugarRequest.nome,
    });
  }

  @Delete(':spotId')
  remove(@Param('spotId') spotId: string, @Param('eventoId') eventoId: string) {
    return this.spotsService.remove(eventoId, spotId);
  }
}

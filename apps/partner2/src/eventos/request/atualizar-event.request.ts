import { PartialType } from '@nestjs/mapped-types';
import { CriaEventoRequest } from './cria-evento.request';

export class AtualizarEventoRequest extends PartialType(CriaEventoRequest) {}

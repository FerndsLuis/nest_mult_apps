import { PartialType } from '@nestjs/mapped-types';
import { CriaLugarRequest } from './cria-lugar.request';

export class AtualizaLugarRequest extends PartialType(CriaLugarRequest) {}

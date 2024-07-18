import { SpotsCoreModule } from '@app/core';
import { Module } from '@nestjs/common';
import { LugarController } from './lugares.controller';

@Module({
  imports: [SpotsCoreModule],
  controllers: [LugarController],
})
export class LugaresModule {}

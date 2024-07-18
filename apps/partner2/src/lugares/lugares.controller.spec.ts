import { Test, TestingModule } from '@nestjs/testing';
import { LugarController } from './lugares.controller';

describe('SpotsController', () => {
  let controller: LugarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LugarController],
    }).compile();

    controller = module.get<LugarController>(LugarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { RingController } from '../ring.controller';
import { RingService } from '../ring.service';
import { CreateRingDto } from '../models/dto/create-ring.dto';
import { UpdateRingDto } from '../models/dto/update-ring.dto';
import { RingType } from '../enum/ring.enum';

describe('RingController', () => {
  let controller: RingController;
  let service: RingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RingController],
      providers: [
        {
          provide: RingService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RingController>(RingController);
    service = module.get<RingService>(RingService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a ring', async () => {
      const createRingDto: CreateRingDto = {
        name: 'The One Ring',
        power: 'Invisibility',
        ringBearer: 'Frodo',
        forger: 'Sauron',
        type: RingType.SAURON,
        image: 'https://example.com/ring.jpg',
      };
      const result = {
        _id: '1',
        ...createRingDto,
      };

      jest.spyOn(service, 'create').mockResolvedValue(result as any);

      expect(await controller.create(createRingDto)).toEqual(result);
      expect(service.create).toHaveBeenCalledWith(createRingDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of rings', async () => {
      const result = [{ name: 'The One Ring' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result as any);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single ring', async () => {
      const result = { name: 'The One Ring' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await controller.findOne('1')).toEqual(result);
      expect(service.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a ring', async () => {
      const updateRingDto: UpdateRingDto = { name: 'The Updated Ring' };
      const result = { name: 'The Updated Ring' };

      jest.spyOn(service, 'update').mockResolvedValue(result as any);

      expect(await controller.update('1', updateRingDto)).toEqual(result);
      expect(service.update).toHaveBeenCalledWith('1', updateRingDto);
    });
  });

  describe('remove', () => {
    it('should remove a ring', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });
});

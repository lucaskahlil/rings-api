import { Test, TestingModule } from '@nestjs/testing';
import { RingService } from '../ring.service';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { CreateRingDto } from '../models/dto/create-ring.dto';
import { UpdateRingDto } from '../models/dto/update-ring.dto';
import { RingType } from '../enum/ring.enum';
import { RingRepository } from '../repository/ring.repository';

describe('RingService', () => {
  let service: RingService;
  let repository: RingRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RingService,
        {
          provide: RingRepository,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RingService>(RingService);
    repository = module.get<RingRepository>(RingRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      jest.spyOn(repository, 'create').mockResolvedValue(result as any);
      jest.spyOn(repository, 'findAll').mockResolvedValue([]);

      expect(await service.create(createRingDto)).toEqual(result);
    });

    it('should throw conflict exception if ring already exists', async () => {
      const createRingDto: CreateRingDto = {
        name: 'The One Ring',
        power: 'Invisibility',
        ringBearer: 'Frodo',
        forger: 'Sauron',
        type: RingType.SAURON,
        image: 'https://example.com/ring.jpg',
      };
      jest.spyOn(repository, 'findAll').mockResolvedValue([createRingDto]);

      await expect(service.create(createRingDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of rings', async () => {
      const result = [{ name: 'The One Ring' }];
      jest.spyOn(repository, 'findAll').mockResolvedValue(result as any);

      expect(await service.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a single ring', async () => {
      const result = { name: 'The One Ring' };
      jest.spyOn(repository, 'findById').mockResolvedValue(result as any);

      expect(await service.findOne('1')).toEqual(result);
    });

    it('should throw NotFoundException if ring not found', async () => {
      jest.spyOn(repository, 'findById').mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a ring', async () => {
      const updateRingDto: UpdateRingDto = { name: 'The Updated Ring' };
      const result = { name: 'The Updated Ring' };

      jest.spyOn(repository, 'update').mockResolvedValue(result as any);
      jest.spyOn(service, 'findOne').mockResolvedValue(result as any);

      expect(await service.update('1', updateRingDto)).toEqual(result);
    });
  });

  describe('remove', () => {
    it('should remove a ring', async () => {
      jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
      jest.spyOn(service, 'findOne').mockResolvedValue({ name: 'Ring' } as any);

      expect(await service.remove('1')).toBeUndefined();
    });
  });
});

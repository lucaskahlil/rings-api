import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RingService } from './ring.service';
import { CreateRingDto } from './models/dto/create-ring.dto';
import { UpdateRingDto } from './models/dto/update-ring.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Rings')
@Controller('ring')
export class RingController {
  constructor(private readonly ringService: RingService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Ring created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request. Validation failed' })
  @ApiResponse({
    status: 409,
    description: 'Conflict. Ring with this name already exists',
  })
  create(@Body() createRingDto: CreateRingDto) {
    return this.ringService.create(createRingDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'All rings returned successfully' })
  findAll() {
    return this.ringService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ring found' })
  @ApiResponse({ status: 404, description: 'Ring not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Invalid ID format' })
  findOne(@Param('id') id: string) {
    return this.ringService.findOne(id);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Ring updated successfully' })
  @ApiResponse({ status: 404, description: 'Ring not found' })
  @ApiResponse({ status: 400, description: 'Bad request. Validation failed' })
  update(@Param('id') id: string, @Body() updateRingDto: UpdateRingDto) {
    return this.ringService.update(id, updateRingDto);
  }

  @Delete(':id')
  @ApiResponse({ status: 204, description: 'Ring removed successfully' })
  @ApiResponse({ status: 404, description: 'Ring not found' })
  remove(@Param('id') id: string) {
    return this.ringService.remove(id);
  }
}

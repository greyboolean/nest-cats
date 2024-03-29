import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(Cat) private catRepository: Repository<Cat>) {}

  create(createCatDto: CreateCatDto) {
    const cat = this.catRepository.create(createCatDto);
    return this.catRepository.save(cat);
  }

  findAll() {
    return this.catRepository.find();
  }

  async findOne(id: number) {
    const cat = await this.catRepository.findOneBy({ id });
    if (!cat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return cat;
  }

  async update(id: number, updateCatDto: UpdateCatDto) {
    const cat = await this.findOne(id);
    if (!cat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return this.catRepository.save({ ...cat, ...updateCatDto });
  }

  async remove(id: number) {
    const cat = await this.findOne(id);
    if (!cat) {
      throw new NotFoundException(`Cat #${id} not found`);
    }
    return this.catRepository.remove(cat);
  }
}

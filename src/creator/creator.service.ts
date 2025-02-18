import { Injectable } from '@nestjs/common';
import { CreateCreatorDto } from './dto/create-creator.dto';
import { UpdateCreatorDto } from './dto/update-creator.dto';

@Injectable()
export class CreatorService {
  create(createCreatorDto: CreateCreatorDto) {
    return 'This action adds a new creator';
  }

  findAll() {
    return {status:true,
            creator:{
      fecha:"2025-02",
      nameCreator:"Ivan Darío Solarte (isacaz)"

    }};
  }

  findOne(id: number) {
    return `This action returns a #${id} creator`;
  }

  update(id: number, updateCreatorDto: UpdateCreatorDto) {
    return `This action updates a #${id} creator`;
  }

  remove(id: number) {
    return `This action removes a #${id} creator`;
  }
}

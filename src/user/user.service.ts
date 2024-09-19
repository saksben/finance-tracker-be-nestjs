import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async getUser(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    console.log('Received createUserDto:', createUserDto);
    try {
      return await this.prisma.user.create({
        data: createUserDto,
      });
    } catch (error) {
      console.error('Error in createUser service:', error.message);
      throw new BadRequestException({
        message: 'Error creating user',
        details: error.message.includes('unique constraint')
          ? ['User with this name already exists']
          : [error.message],
      });
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id: Number(id) },
        data: updateUserDto,
      });
      return updatedUser;
    } catch (error) {
      console.error('Error in updateUser service:', error.message);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  async deleteUser(id: number) {
    await this.prisma.user.delete({ where: { id } });
  }
}

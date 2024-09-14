import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserModel[]> {
    console.log('GET worked');
    return this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<UserModel> {
    const user = await this.userService.getUser(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    console.log('POST worked');
    return this.userService.createUser(createUserDto);
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserModel> {
    try {
      console.log('Updating user:', id, updateUserDto);
      const updatedUser = await this.userService.updateUser(id, updateUserDto);
      console.log('User updated:', updatedUser);
      return updatedUser;
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw new InternalServerErrorException('Error updating user');
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    await this.userService.deleteUser(+id);
    return { message: `User with ID ${id} deleted successfully` };
  }
}

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Makes all CreateUserDto fields optional so that only the relevant fields being updated are used
export class UpdateUserDto extends PartialType(CreateUserDto) {}

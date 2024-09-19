import {
  IsArray,
  IsBoolean,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  name: string;
  @IsNumber()
  @Min(0)
  estimatedRevenue: number;
  @IsArray()
  @IsObject({ each: true })
  users: { id: number; estimate: number }[];
  @IsArray()
  @IsObject({ each: true })
  categories: { id: number; estimate: number }[];
  @IsBoolean()
  alertOverbudget: boolean;
  @IsBoolean()
  alertOverAmount: boolean;
  @IsOptional()
  @IsNumber()
  @Min(0)
  alertAmount?: number;
  @IsOptional()
  @IsBoolean()
  overbudget: boolean;
}

import {
  ArrayMaxSize,
  ArrayMinSize,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @Length(1, 120)
  name: string;

  @IsNotEmpty()
  desc: string;

  @IsString()
  @IsOptional()
  sizeChart?: string;

  @ArrayMinSize(3)
  @ArrayMaxSize(3)
  @IsInt({ each: true })
  @Min(1, { each: true })
  categoryIds: [number, number, number];

  @IsOptional()
  @IsIn(['Active', 'Draft'])
  status?: 'Active' | 'Draft';
}

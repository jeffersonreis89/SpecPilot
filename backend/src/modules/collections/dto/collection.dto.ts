import { Transform } from 'class-transformer';
import { IsString, IsUrl, IsOptional } from 'class-validator';

export class CreateCollectionDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  baseUrl?: string;

  postmanData: any; // Postman collection JSON
}

export class UpdateCollectionDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsUrl()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? undefined : value))
  baseUrl?: string;
}

export class CollectionResponseDto {
  id: string;
  name: string;
  description?: string;
  baseUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

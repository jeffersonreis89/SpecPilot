import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateDemoItemDto {
  @ApiProperty({
    example: 'Cadastrar cliente de teste',
    description: 'Titulo simples do item de exemplo.',
  })
  @IsString()
  title: string;

  @ApiPropertyOptional({
    example: 'Usado para demonstrar um POST no Swagger.',
    description: 'Descricao opcional do item.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Indica se o item foi concluido.',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}

export class UpdateDemoItemDto extends PartialType(CreateDemoItemDto) {}

export class DemoItemResponseDto {
  @ApiProperty({
    example: '8c0483b7-33f0-49ef-b3b0-c3d9f887ac10',
  })
  id: string;

  @ApiProperty({
    example: 'Cadastrar cliente de teste',
  })
  title: string;

  @ApiPropertyOptional({
    example: 'Usado para demonstrar um POST no Swagger.',
  })
  description?: string;

  @ApiProperty({
    example: false,
  })
  completed: boolean;

  @ApiProperty({
    example: '2026-04-22T15:10:00.000Z',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2026-04-22T15:10:00.000Z',
  })
  updatedAt: Date;
}

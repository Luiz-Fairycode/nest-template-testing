/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, Length } from 'class-validator';

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty({message: 'Nome obrigatório'})
    @Length(10, 50, {message: "Mínimo 10, Máximo"})
    public name: string;
    @ApiProperty()
    @IsInt({message: 'Idade deve ser um inteiro'})
    public age: number;
    @ApiProperty()
    @IsNotEmpty({message: 'Url da foto é obrigatório'})
    public urlPhoto: string;
}
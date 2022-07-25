/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';

export class ReadUserDto {
    @ApiProperty()
    public name: string;
    @ApiProperty()
    public photos?: PhotoDto[];
    @ApiProperty()
    public creationDate: Date;
    @ApiProperty()
    public creationProgram: string;
}

export class PhotoDto{
    @ApiProperty()
    public url: string;
}
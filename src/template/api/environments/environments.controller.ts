import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/guards/firebase/public.decorator';

@ApiTags('Environments')
@Controller({ path: 'environments', version: '1' })
export class EnvironmentsController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Public()
  @Get()
  @ApiOperation({
    summary: 'Retorna o ambiente que está sendo trabalhado',
  })
  async getEnvironment() {
    return process.env.NODE_ENV;
  }
}

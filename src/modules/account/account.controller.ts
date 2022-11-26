import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { CreateAccountDto } from './dtos/request/create-account.dto';
import { AccountService } from './account.service';
import { ApiTags } from '@nestjs/swagger';
import { AccountDto } from './dtos/response/account.dto';
import { UpdateAccountDto } from './dtos/request/update-account.dto';
import { PageAccountDto } from './dtos/response/page-account.dto';
import { PageRequestDto } from '../shared/dtos/page-request.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Post('create-one')
  createOne(
    @Req() request,
    @Body() dto: CreateAccountDto,
  ): Promise<AccountDto> {
    return this.service.createAccount(dto);
  }

  @Get('get-many')
  getMany(@Query() query: PageRequestDto): Promise<PageAccountDto> {
    return this.service.getAccounts(query);
  }

  @Get('get-one/:id')
  getOne(@Param('id') id: string): Promise<AccountDto> {
    return this.service.getAccountById(id);
  }

  @Patch('update-one/:id')
  updateOne(
    @Param('id') id: string,
    @Body() dto: UpdateAccountDto,
  ): Promise<AccountDto> {
    return this.service.updateAccount(id, dto);
  }

  @Delete('delete-one/:id')
  softDeleteOne(@Param('id') id: string): Promise<boolean> {
    return this.service.deleteAccount(id);
  }
}

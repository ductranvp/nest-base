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
import { AccountCreateDto } from '../dtos/request/account.create.dto';
import { AccountService } from '../services/account.service';
import { ApiTags } from '@nestjs/swagger';
import { AccountDto } from '../dtos/response/account.dto';
import { AccountUpdateDto } from '../dtos/request/account.update.dto';
import { AccountPageDto } from '../dtos/response/account.page.dto';
import { PageRequestDto } from '../../shared/dtos/page-request.dto';

@ApiTags('account')
@Controller('account')
export class AccountController {
  constructor(private readonly service: AccountService) {}

  @Post('create-one')
  createAccount(
    @Req() request,
    @Body() dto: AccountCreateDto,
  ): Promise<AccountDto> {
    return this.service.createAccount(dto);
  }

  @Get('get-many')
  getAccounts(@Query() query: PageRequestDto): Promise<AccountPageDto> {
    return this.service.getAccounts(query);
  }

  @Get('get-one/:id')
  getAccountById(@Param('id') id: string): Promise<AccountDto> {
    return this.service.getAccountById(id);
  }

  @Patch('update-one/:id')
  updateAccount(
    @Param('id') id: string,
    @Body() dto: AccountUpdateDto,
  ): Promise<AccountDto> {
    return this.service.updateAccount(id, dto);
  }

  @Delete('delete-one/:id')
  deleteAccount(@Param('id') id: string): Promise<AccountDto> {
    return this.service.deleteAccount(id);
  }

  @Patch('recover-one/:id')
  recoverOne(@Param('id') id: string): Promise<AccountDto> {
    return this.service.recoverAccount(id);
  }
}
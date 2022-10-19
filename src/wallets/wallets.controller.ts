import { Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateWalletResponse, WalletBalanceResponse } from './types';
import { WalletsService } from './wallets.service';

@ApiTags('wallets')
@Controller('/api/v1/wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @Post()
  @ApiOperation({ description: 'Создание нового кошелька' })
  @ApiCreatedResponse({
    description: 'Новый кошелек успешно создан',
    type: CreateWalletResponse,
  })
  public async createWallet(): Promise<CreateWalletResponse> {
    return this.walletsService.createWallet();
  }

  @Get('/balance')
  @ApiOperation({ description: 'Получение информации о балансе кошелька' })
  @ApiOkResponse({ type: WalletBalanceResponse })
  public async getWalletBalance(
    @Query('address') address: string,
  ): Promise<WalletBalanceResponse> {
    return this.walletsService.getWalletBalance(address);
  }
}

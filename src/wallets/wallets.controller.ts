import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {ApiAcceptedResponse, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags,} from '@nestjs/swagger';
import {
  CreateWalletResponse,
  DeployWalletRequest,
  StateResponse,
  TransferRequest,
  WalletBalanceResponse
} from './types';
import {WalletsService} from './wallets.service';

@ApiTags('wallets')
@Controller('/api/v1/wallets')
export class WalletsController {
  constructor(private walletsService: WalletsService) {}

  @Post()
  @ApiOperation({ description: 'Создание нового кошелька' })
  @ApiCreatedResponse({description: 'Новый кошелек успешно создан', type: CreateWalletResponse})
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

  @Post("/transfer")
  @ApiOperation({description: 'Отправка ТОНОВ между кошельками'})
  @ApiAcceptedResponse({description: 'Запрос на отправку принят'})
  public async transfer(@Body() data: TransferRequest): Promise<any> {
    await this.walletsService.transfer(data.sourceWallet, data.mnemonic, data.destWallet, data.amount, data.comment);
  }

  @Post('/deploy')
  @ApiOperation({description: 'Деплой кошелькау'})
  @ApiAcceptedResponse({description: 'Запрос принят'})
  public async deploy(@Body() data: DeployWalletRequest): Promise<void> {
    await this.walletsService.deploy(data.wallet, data.mnemonic);
  }

  @Get('/state')
  @ApiOperation({description: 'Получение состояния кошелька'})
  @ApiOkResponse({description: 'Состояние кошелька', type: StateResponse})
  async getState(@Query('address') address: string) {
    return await this.walletsService.getState(address);
  }

}

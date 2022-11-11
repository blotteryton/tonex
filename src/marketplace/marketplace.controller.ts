import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMarketplaceDto } from './dto/CreateMarketplaceDto';
import { CreateMarketplaceResponseDto } from './dto/CreateMarketplaceResponseDto';
import { DeployMarketplaceDto } from './dto/DeployMarketplace.dto';
import { DeployMartketplaceResponseDto } from './dto/DeployMarketplaceResponse.dto';
import { MarketplaceService } from './marketplace.service';

@Controller('/api/v1/marketplace')
@ApiTags('Marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Post('/createMarketplace')
  @ApiOperation({ description: 'Создание NFT-маркетплейса' })
  @ApiCreatedResponse({
    description: 'Успешное создание NFT-маркетплейса',
    type: CreateMarketplaceResponseDto,
  })
  public async createMarketplace(
    @Body() data: CreateMarketplaceDto,
  ): Promise<CreateMarketplaceResponseDto> {
    console.log('POST /api/v1/marketplace/createMarketplace');

    return await this.marketplaceService.createMarketplace(data.ownerAddress);
  }

  @Post('/deployMarketplace')
  @ApiOperation({ description: 'Деплой NFT-маркетплейса' })
  @ApiCreatedResponse({
    description: 'Запрос на деплой выполнен',
    type: DeployMartketplaceResponseDto,
  })
  public async deployMarketplace(@Body() data: DeployMarketplaceDto) {
    console.log('POST /api/v1/marketplace/deployMarketplace');

    return await this.marketplaceService.deployMarketplace(
      data.mnemonic,
      data.address,
      data.amount,
    );
  }
}

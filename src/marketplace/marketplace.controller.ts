import { Body, Controller, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateMarketplaceDto } from './dto/CreateMarketplaceDto';
import { CreateMarketplaceResponseDto } from './dto/CreateMarketplaceResponseDto';
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
    return await this.marketplaceService.createMarketplace(data.ownerAddress);
  }
}

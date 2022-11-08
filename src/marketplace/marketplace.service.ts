import { Injectable } from '@nestjs/common';
import { TonService } from 'src/ton/ton.service';
import { CreateMarketplaceResponseDto } from './dto/CreateMarketplaceResponseDto';

const TonWeb = require('tonweb');

const { NftCollection, NftItem, NftMarketplace, NftSale } = TonWeb.token.nft;

@Injectable()
export class MarketplaceService {
  constructor(private readonly tonService: TonService) {}

  public async createMarketplace(
    address: string,
  ): Promise<CreateMarketplaceResponseDto> {
    const ownerAddress = new TonWeb.Address(address);

    const marketplace = new NftMarketplace(this.tonService.getTonWeb, {
      ownerAddress: ownerAddress,
    });

    return {
      address: (await marketplace.getAddress()).toString(
        true,
        true,
        true,
        this.tonService.isTest(),
      ),
      isTest: this.tonService.isTest(),
    };
  }
}

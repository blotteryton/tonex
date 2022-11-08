import { Injectable } from '@nestjs/common';
import { TonService } from 'src/ton/ton.service';
import { mnemonicToKeyPair } from 'tonweb-mnemonic';
import { CreateMarketplaceResponseDto } from './dto/CreateMarketplaceResponseDto';
import { DeployMartketplaceResponseDto } from './dto/DeployMarketplaceResponse.dto';

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

  public async deployMarketplace(
    mnemonic: string[],
    marketAddress: string,
    amount: number,
  ): Promise<DeployMartketplaceResponseDto> {
    const keyPair = await mnemonicToKeyPair(mnemonic);
    const ownerWallet = this.tonService.getTonWeb().wallet.create({
      publicKey: keyPair.publicKey,
      wc: 0,
    });

    const seqno = (await ownerWallet.methods.seqno().call()) || 0;
    console.log({ seqno });

    const marketplaceAddress = new TonWeb.Address(marketAddress);
    const marketplace = new NftMarketplace(this.tonService.getTonWeb, {
      ownerAddress: await ownerWallet.getAddress(),
    });

    const result = await ownerWallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: marketplaceAddress.toString(true, true, false), // non-bounceable
        amount: TonWeb.utils.toNano(amount.toString()),
        seqno: seqno,
        payload: null, // body
        sendMode: 3,
        stateInit: (await marketplace.createStateInit()).stateInit,
      })
      .send();
    console.log(result);
    return result;
  }
}

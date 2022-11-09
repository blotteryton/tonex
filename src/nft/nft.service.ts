import { TonService } from '../ton/ton.service';
import { Injectable } from '@nestjs/common';
import { CollectionData, NftItemData } from 'tonweb';
import { CreateCollection, CreateNft, CreateNftResponse } from './types';
import { mnemonicToKeyPair } from 'tonweb-mnemonic';

const TonWeb = require('tonweb');

const { NftCollection, NftItem, NftMarketplace, NftSale } = TonWeb.token.nft;

@Injectable()
export class NftService {
  constructor(private tonService: TonService) {}

  public async getNftCollectionData(address: string): Promise<CollectionData> {
    const collection = new NftCollection(this.tonService.getTonProvider(), {
      address: new TonWeb.Address(address),
    });
    const collectionData: CollectionData = await collection.getCollectionData(
      address,
    );
    return collectionData;
  }

  public async getNftData(address: string): Promise<NftItemData> {
    const nftItem = new NftItem(this.tonService.getTonProvider(), {
      address: new TonWeb.Address(address),
    });
    const nftItemData = await nftItem.getData();
    return nftItemData;
  }

  async createCollection(data: CreateCollection): Promise<string> {
    const royaltyAddr = new TonWeb.Address(data.royaltyAddress);

    const keyPair = await mnemonicToKeyPair(data.mnemonic);
    const ownerWallet = this.tonService.getTonWeb().wallet.create({
      publicKey: keyPair.publicKey,
      wc: 0,
    });

    const nftCollection = new NftCollection(this.tonService.getTonProvider(), {
      ownerAddress: await ownerWallet.getAddress(),
      nftItemCodeHex: NftItem.codeHex,
      royalty: data.royalty,
      royaltyAddress: royaltyAddr,
      collectionContentUri: data.collectionContentUri,
      nftItemContentBaseUri: data.nftItemContentBaseUri,
    });
    const stateInit = (await nftCollection.createStateInit()).stateInit;

    const nftCollectionAddress = await nftCollection.getAddress();

    const seqno = (await ownerWallet.methods.seqno().call()) || 0;

    const transfer = await ownerWallet.methods.transfer({
      secretKey: keyPair.secretKey,
      toAddress: nftCollectionAddress.toString(true, true, true),
      amount: TonWeb.utils.toNano(data.amount),
      seqno: seqno,
      stateInit: stateInit,
      wc: 0,
    });
    const transfer_result = await transfer.send();
    console.log(transfer_result);
    return nftCollectionAddress.toString(true, true, true, false);
  }

  async createNft(data: CreateNft): Promise<CreateNftResponse> {
    const keyPair = await mnemonicToKeyPair(data.mnemonic);
    const ownerWallet = this.tonService.getTonWeb().wallet.create({
      publicKey: keyPair.publicKey,
      wc: 0,
    });

    const nftCollection = new NftCollection(this.tonService.getTonProvider(), {
      ownerAddress: await ownerWallet.getAddress(),
      address: new TonWeb.Address(data.collectionAddress),
    });

    console.log(nftCollection);

    const collectionAddr = await nftCollection.getAddress();
    const collectionAddress = collectionAddr.toString(true, true, true, false);

    console.log(
      `Create NFT ${data.amount}, ${collectionAddress}, ${data.nftItemContentUri}`,
    );

    const nanoAmount = TonWeb.utils.toNano(data.amount.toString());

    const collectionData = await nftCollection.getCollectionData();

    const newItemIndex = collectionData.nextItemIndex;

    const body = await nftCollection.createMintBody({
      amount: nanoAmount,
      itemIndex: newItemIndex,
      itemOwnerAddress: ownerWallet.address,
      itemContentUri: data.nftItemContentUri,
    });

    let seqno = await ownerWallet.methods.seqno().call();
    console.log(`SeqNo: ${seqno}`);

    const res = await ownerWallet.methods.transfer({
      secretKey: keyPair.secretKey,
      toAddress: collectionAddr.toString(true, true, false),
      amount: nanoAmount,
      payload: body,
      seqno: seqno,
    });

    const deploy_result = await res.send();
    console.log(deploy_result);
    return {
      index: newItemIndex,
      address: (
        await nftCollection.getNftItemAddressByIndex(newItemIndex)
      ).toString(true, true, true, this.tonService.isTest()),
    };
  }

  public async transferCollection(
    mnemonic: string[],
    collectionAddress: string,
    newOwnerAddress: string,
  ) {
    const keyPair = await mnemonicToKeyPair(mnemonic);
    const ownerWallet = this.tonService.getTonWeb().wallet.create({
      publicKey: keyPair.publicKey,
      wc: 0,
    });

    const seqno = (await ownerWallet.methods.seqno().call()) || 0;
    const amount = TonWeb.utils.toNano('0.05');

    const nftCollectionAddress = new TonWeb.Address(collectionAddress);

    const nftCollection = new NftCollection(this.tonService.getTonProvider(), {
      ownerAddress: await ownerWallet.getAddress(),
      address: nftCollectionAddress,
    });

    return await ownerWallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: nftCollectionAddress.toString(true, true, true),
        amount: amount,
        seqno: seqno,
        payload: await nftCollection.createChangeOwnerBody({
          newOwnerAddress: new TonWeb.utils.Address(newOwnerAddress),
        }),
        sendMode: 3,
      })
      .send();
  }

  public async sale(
    marketplaceAddress: string,
    nftAddress: string,
    fullPrice: number,
    marketplaceFee: number,
    collectionAddress: string,
    royaltyAmount: number,
  ): Promise<string> {
    const marketAddress = new TonWeb.Address(marketplaceAddress);
    const nftItemAddress = new TonWeb.Address(nftAddress);
    const nftCollectionAddress = new TonWeb.Address(collectionAddress);

    const nftSale = new NftSale(this.tonService.getTonProvider(), {
      marketplaceAddress: marketAddress,
      nftAddress: nftItemAddress,
      fullPrice: TonWeb.utils.toNano(fullPrice.toString()),
      marketplaceFee: TonWeb.utils.toNano(marketplaceFee.toString()),
      royaltyAddress: nftCollectionAddress,
      royaltyAmount: TonWeb.utils.toNano(royaltyAmount.toString()),
    });
    const saleAddress = await nftSale.getAddress();
    return saleAddress.toString(true, true, true, this.tonService.isTest());
  }

  public async deploySale(
    mnemonic: string[],
    nftSaleAddress: string,
    marketAddress: string,
  ) {
    const keyPair = await mnemonicToKeyPair(mnemonic);
    const marketWallet = this.tonService.getTonWeb().wallet.create({
      publicKey: keyPair.publicKey,
      wc: 0,
    });

    const seqno = (await marketWallet.methods.seqno().call()) || 0;
    console.log({ seqno });

    const amount = TonWeb.utils.toNano('0.05');

    const nftSale = new NftSale(this.tonService.getTonProvider(), {
      address: new TonWeb.Address(nftSaleAddress),
    });

    const body = new TonWeb.boc.Cell();
    body.bits.writeUint(1, 32); // OP deploy new auction
    body.bits.writeCoins(amount);
    body.refs.push((await nftSale.createStateInit()).stateInit);
    body.refs.push(new TonWeb.boc.Cell());

    return await marketWallet.methods
      .transfer({
        secretKey: keyPair.secretKey,
        toAddress: new TonWeb.Address(marketAddress),
        amount: amount,
        seqno: seqno,
        payload: body,
        sendMode: 3,
      })
      .send();
  }
}

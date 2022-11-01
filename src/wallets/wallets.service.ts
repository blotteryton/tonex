import {Injectable} from '@nestjs/common';
import {generateMnemonic, mnemonicToKeyPair} from 'tonweb-mnemonic';
import {CreateWalletResponse, StateResponse, WalletBalanceResponse} from './types';
import {TonService} from "../ton/ton.service";

@Injectable()
export class WalletsService {

  constructor(private tonService: TonService) {
  }

  public async createWallet(): Promise<CreateWalletResponse> {
    const mnemonic = await generateMnemonic();
    const keyPair = await mnemonicToKeyPair(mnemonic);
    const wallet = this.tonService.getTonWeb().wallet.create({
      publicKey: keyPair.publicKey,
      wc: 0,
    });
    const address  = await wallet.getAddress();

    return {
      publicKey: this.tonService.getTonWeb().utils.bytesToHex(keyPair.publicKey),
      secretKey: this.tonService.getTonWeb().utils.bytesToHex(keyPair.secretKey),
      mnemonic: mnemonic,
      address: address.toString(true, true, true, this.tonService.isTest()),
      isTest: this.tonService.isTest()
    };
  }

  public async getWalletBalance(address: string): Promise<WalletBalanceResponse> {
    const balance = this.tonService.getTonWeb().utils.fromNano(await this.tonService.getTonWeb().getBalance(address));

    return { balance: parseFloat(balance) };
  }

  public async transfer(sourceWalletAddress: string, mnemonic: string[], destinationWalletAddress: string, amount: number, comment?: string): Promise<any>  {
    const keyPair = await mnemonicToKeyPair(mnemonic);

    const destWallet = this.tonService.getTonWeb().wallet.create({ address: destinationWalletAddress, wc: 0 });
    const addr = await destWallet.getAddress();

    const normalizedDestAddress = addr.toString(true, true, false, false);

    const wallet = this.tonService.getTonWeb().wallet.create({
      publicKey: keyPair.publicKey,
      address: sourceWalletAddress,
      wc: 0
    });

    const seqno = await wallet.methods.seqno().call();

    const transfer = await wallet.methods.transfer({
      secretKey: keyPair.secretKey,
      toAddress: normalizedDestAddress,
      amount: this.tonService.getTonWeb().utils.toNano(amount.toString()),
      seqno: seqno,
      payload: comment || '',
      sendMode: 3,
    });
    const transfer_result = await transfer.send();
    console.log(`transfer result: ${transfer_result}`)
    return transfer_result
  }

  public async deploy(address: string, mnemonic: string[]) {
    const keyPair = await mnemonicToKeyPair(mnemonic);
    const wallet = this.tonService.getTonWeb().wallet.create({
      publicKey: keyPair.publicKey,
      address: address,
      wc: 0
    });

    const dep = await wallet.deploy(keyPair.secretKey);
    await dep.send();
  }

  public async getState(address: string): Promise<StateResponse> {
    const state = await this.tonService.getTonProvider().getAddressInfo(address)
    return {result: state.state}
  }
}

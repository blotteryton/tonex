import {Injectable} from '@nestjs/common';
import {generateMnemonic, mnemonicToKeyPair} from 'tonweb-mnemonic';
import {tonProvider, tonWeb} from '../ton';
import {CreateWalletResponse, StateResponse, WalletBalanceResponse} from './types';

@Injectable()
export class WalletsService {
  public async createWallet(): Promise<CreateWalletResponse> {
    const mnemonic = await generateMnemonic();
    const keyPair = await mnemonicToKeyPair(mnemonic);
    const wallet = tonWeb.wallet.create({
      publicKey: keyPair.publicKey,
      wc: 0,
    });
    const address = await wallet.getAddress();

    return {
      publicKey: tonWeb.utils.bytesToHex(keyPair.publicKey),
      secretKey: tonWeb.utils.bytesToHex(keyPair.secretKey),
      mnemonic: mnemonic,
      address: address.toString(true, true, true, false),
    };
  }

  public async getWalletBalance(address: string): Promise<WalletBalanceResponse> {
    const balance = tonWeb.utils.fromNano(await tonWeb.getBalance(address));

    return { balance: parseFloat(balance) };
  }

  public async transfer(sourceWalletAddress: string, mnemonic: string[], destinationWalletAddress: string, amount: number, comment?: string): Promise<any>  {
    const keyPair = await mnemonicToKeyPair(mnemonic);

    const destWallet = tonWeb.wallet.create({ address: destinationWalletAddress, wc: 0 });
    const addr = await destWallet.getAddress();

    const normalizedDestAddress = addr.toString(true, true, false, false);

    const wallet = tonWeb.wallet.create({
      publicKey: keyPair.publicKey,
      address: sourceWalletAddress,
      wc: 0
    });

    const seqno = await wallet.methods.seqno().call();

    const transfer = await wallet.methods.transfer({
      secretKey: keyPair.secretKey,
      toAddress: normalizedDestAddress,
      amount: tonWeb.utils.toNano(amount.toString()),
      seqno: seqno,
      payload: comment || '',
      sendMode: 3,
    });
    const transfer_result = await transfer.send();
    console.log('transfer result:')
    return transfer_result
  }

  public async deploy(address: string, mnemonic: string[]) {
    const keyPair = await mnemonicToKeyPair(mnemonic);
    const wallet = tonWeb.wallet.create({
      publicKey: keyPair.publicKey,
      address: address,
      wc: 0
    });

    const dep = await wallet.deploy(keyPair.secretKey);
    await dep.send();
  }

  public async getState(address: string): Promise<StateResponse> {
    console.log(tonProvider)
    const state = await tonProvider.getAddressInfo(address)
    console.log(state)
    return {result: state.state}
  }
}

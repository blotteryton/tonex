import {Injectable} from '@nestjs/common';
import {generateMnemonic, mnemonicToKeyPair} from 'tonweb-mnemonic';
import {tonWeb} from '../ton';
import {CreateWalletResponse, WalletBalanceResponse} from './types';

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

  public async transfer(sourceWalletAddress: string, secretKey: string, destinationWalletAddress: string, amount: number, comment?: string): Promise<void>  {
    const destWallet = tonWeb.wallet.create({ address: destinationWalletAddress, wc: 0 });
    const addr = await destWallet.getAddress();

    const normalizedDestAddress = addr.toString(true, true, false, false);

    const wallet = tonWeb.wallet.create({
      address: sourceWalletAddress,
      wc: 0
    });

    const seqno = await wallet.methods.seqno().call();

    const transfer = await wallet.methods.transfer({
      secretKey: secretKey,
      toAddress: normalizedDestAddress,
      amount: tonWeb.utils.toNano(amount.toString()),
      seqno: seqno,
      payload: comment || '',
      sendMode: 3,
    });
    const transfer_result = await transfer.send();
    console.log('transfer result:')
    console.log(transfer_result)
  }
}

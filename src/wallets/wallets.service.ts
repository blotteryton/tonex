import { Injectable } from '@nestjs/common';
import TonWeb from 'tonweb';
import { generateMnemonic, mnemonicToKeyPair } from 'tonweb-mnemonic';
import { tonWeb } from '../ton';
import { CreateWalletResponse, WalletBalanceResponse } from './types';

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
}

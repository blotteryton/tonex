import { ApiProperty } from '@nestjs/swagger';

export class CreateWalletResponse {
  @ApiProperty({ description: 'Публичный ключ кошелька' })
  publicKey: string;
  @ApiProperty({ description: 'Секретный ключ кошелька' })
  secretKey: string;
  @ApiProperty({ description: 'Мнемоники кошелька' })
  mnemonic: string[];
  @ApiProperty({ description: 'Non-bounce адрес кошелька' })
  address: string;
}

export class WalletBalanceResponse {
  @ApiProperty({ description: 'Баланс' })
  balance: number;
}

export class TransferRequest {
  @ApiProperty({description: 'Адрес кошелька отправителя'})
  sourceWallet: string

  @ApiProperty({description: 'Секретный ключ кошелька отправителя'})
  secretKey: string

  @ApiProperty({description: 'Адрес кошелька получателя'})
  destWallet: string

  @ApiProperty({description: 'Сумма перевода', example: '1.25'})
  amount: number

  @ApiProperty({description: 'Комментарий к транзакции', example: 'Gift for you', required: false})
  comment?: string
}

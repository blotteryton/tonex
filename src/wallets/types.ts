import {ApiProperty} from "@nestjs/swagger";

export class CreateWalletResponse {
    @ApiProperty({description: 'Публичный ключ кошелька'})
    publicKey: string
    @ApiProperty({description: 'Секретный ключ кошелька'})
    secretKey: string
    @ApiProperty({description: 'Мнемоники кошелька'})
    mnemonic: string[]
    @ApiProperty({description: 'Non-bounce адрес кошелька'})
    address: string
}

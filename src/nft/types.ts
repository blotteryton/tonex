import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class NFTCollectionData {
  @ApiProperty({
    description: "Следующий индекс NFT-item'а в коллекции",
    type: Number,
  })
  nextItemIndex: number;

  @ApiProperty({
    description: 'Адрес кошелька владельца коллекции',
    type: String,
  })
  ownerAddress: string;

  @ApiProperty({
    description: 'URL на контент коллекции',
    type: String,
    required: false,
    nullable: true,
  })
  collectionContentUri?: string;
}

export class CreateCollection {
  @ApiProperty({ description: 'mnemonic-фраза кошелька', type: [String] })
  mnemonic: string[];

  @ApiProperty({
    description:
      'Сумма в TONах, перечисляемая с кошелька в коллекцию. Будет использована при создании NFT-токена',
    type: Number,
  })
  amount: number;

  @ApiProperty({
    description: 'URL на содержимое NFT-коллекции',
    required: true,
  })
  collectionContentUri: string;

  @ApiProperty({ description: "Базовый URL для NFT-item'ов коллекции" })
  nftItemContentBaseUri: string;

  @ApiProperty({ description: 'Размер роялти', required: true })
  royalty: string;

  @ApiProperty({
    description: 'Адрес кошелька для зачисления royalty',
    required: true,
    type: String,
  })
  royaltyAddress: string;
}

export class CreateCollectionResponse {
  @ApiModelProperty({
    description: 'Адрес NFT-коллекции',
    type: String,
    example: 'asdjfasdwqw3weca',
  })
  address: string;
}

export class CreateNft {
  @ApiProperty({
    description: 'Адрес NFT-коллекции',
    required: true,
    type: String,
  })
  collectionAddress: string;

  @ApiProperty({
    description: "Стоимость NFT-item'а. Списывается с баланса коллекции",
    required: true,
    type: Number,
  })
  amount: number;

  @ApiProperty({ description: 'mnemonic-фраза кошелька', type: [String] })
  mnemonic: string[];

  @ApiProperty({ description: "Базовый URL для NFT-item'ов коллекции" })
  nftItemContentBaseUri: string;

  @ApiProperty({ description: "Ссылка на содержимое контента NFT-item'а" })
  nftItemContentUri: string;
}

export class CreateNftResponse {
  @ApiProperty({ description: 'Индекс NFT-токена в коллекции' })
  index: number;

  @ApiProperty({ description: 'Адрес NFT-токена в коллекции' })
  address: string;
}

export class TransferCollectionRequestDto {
  @ApiProperty({
    description: 'mnemonic-фраза кошелька владельца',
    type: [String],
    required: true,
  })
  mnemonic: string[];

  @ApiProperty({
    description: 'Адрес передаваемой коллекции',
    type: String,
    required: true,
  })
  collectionAddress: string;

  @ApiProperty({
    description: 'Адрес кошелька нового владельца',
    type: String,
    required: true,
  })
  newOwnerAddress: string;
}

export class SaleRequestDto {
  @ApiProperty({
    description: 'Адрес маркетплейса',
    required: true,
  })
  marketplaceAddress: string;

  @ApiProperty({
    description: 'Адрес NFT-токена',
    required: true,
  })
  nftAddress: string;

  @ApiProperty({
    description: 'Полная цена продажи в ТОНах',
    required: true,
    example: 1.1,
  })
  fullPrice: number;

  @ApiProperty({
    description: 'Комиссия маркетплейса в ТОНах',
    required: true,
    example: 0.2,
  })
  marketplaceFee: number;

  @ApiProperty({
    description: 'Адрес NFT-коллекции',
    required: true,
  })
  collectionAddress: string;

  @ApiProperty({
    description: 'Комиссия продавцу в ТОНах',
    required: true,
    example: 0.1,
  })
  royaltyAmount: number;
}

export class SaleResponseDto {
  @ApiProperty({
    description: 'Адрес продажи NFT-токена',
  })
  address: string;
}

export class SaleDeployDto {
  @ApiProperty({
    description: 'mnemonic-фраза кошелька владельца маркетплейса',
    type: [String],
    required: true,
  })
  mnemonic: string[];

  @ApiProperty({
    description: 'Адрес NFT-продажи',
    type: String,
    required: true,
  })
  nftSaleAddress: string;

  @ApiProperty({
    description:
      'Адрес NFT-маркетплейса, куда будет размещаться продаваемый токен',
  })
  marketAddress: string;
}

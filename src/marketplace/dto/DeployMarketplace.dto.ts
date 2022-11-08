import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class DeployMarketplaceDto {
  @ApiModelProperty({
    description: 'Mnemonic кошелька владельца',
    type: [String],
    required: true,
    example: '["some", "good", "number", "list"]',
  })
  mnemonic: string[];

  @ApiModelProperty({
    description: 'Адрес NFT-маркетплейса',
    type: String,
    required: true,
    example: 'EQBmaDcZLICTMp4GcMk7tBXd9cXQf6Fs6WtJK5fDZn69pvWr',
  })
  address: string;

  @ApiModelProperty({
    description:
      'Кол-во токенов, зачисляемых на баланс маркетплейса (для последующих операций с комиссиями)',
    type: Number,
    required: true,
    example: '0.5',
  })
  amount: number;
}

import { ApiParam } from '@nestjs/swagger';
import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateMarketplaceDto {
  @ApiModelProperty({
    description: 'Адрес кошелька создателя NFT-маркетплейса',
    type: String,
    required: true,
  })
  ownerAddress: string;
}

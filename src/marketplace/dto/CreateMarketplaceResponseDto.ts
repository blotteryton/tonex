import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class CreateMarketplaceResponseDto {
  @ApiModelProperty({
    description: 'Адрес маркетплейса',
    type: String,
    required: true,
  })
  address: string;
  @ApiModelProperty({
    description: 'Признак тестового БЧ',
    type: Boolean,
    required: true,
  })
  isTest: boolean;
}

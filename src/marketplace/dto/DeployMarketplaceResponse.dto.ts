import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class DeployMartketplaceResponseDto {
  @ApiModelProperty({
    description: 'Результат запроса к блокчейну ТОН (ok - БЧ запрос принял)',
    type: String,
    example: 'ok',
  })
  type: string;
  @ApiModelProperty({
    description: 'Служебная информация из БЧ',
    type: String,
    example: '1667929309.2963536:10:0.7008384765060379',
  })
  extra: string;
}

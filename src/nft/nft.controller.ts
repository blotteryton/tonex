import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { NftService } from './nft.service';
import {
  CreateCollection,
  CreateCollectionResponse,
  CreateNft,
  CreateNftResponse,
  NFTCollectionData,
  SaleDeployDto,
  SaleRequestDto,
  SaleResponseDto,
  TransferCollectionRequestDto,
} from './types';

@Controller('/api/v1/nft')
@ApiTags('nft')
export class NftController {
  constructor(private nftService: NftService) {}

  @Get('/getCollectionData')
  @ApiOperation({ description: 'Получение данных NFT-коллекции' })
  @ApiResponse({ status: HttpStatus.OK, type: NFTCollectionData })
  public async getCollectionData(
    @Query('address') address: string,
  ): Promise<NFTCollectionData> {
    const data = await this.nftService.getNftCollectionData(address);
    let promise = Promise.resolve({
      nextItemIndex: data.nextItemIndex,
      ownerAddress: data.ownerAddress.toString(true, true, true, false),
      collectionContentUri: data.collectionContentUri,
    });
    return promise;
  }

  @Post('/createCollection')
  @ApiOperation({ description: 'Создание NFT-коллекции' })
  @ApiCreatedResponse({
    description: 'Результат создания NFT-коллекции',
    type: CreateCollectionResponse,
  })
  public async createNftCollection(
    @Body() data: CreateCollection,
  ): Promise<CreateCollectionResponse> {
    const address = await this.nftService.createCollection(data);
    return { address };
  }

  @Post('/createNft')
  @ApiOperation({ description: "Создание NFT-item'а" })
  @ApiCreatedResponse({
    description: 'Результат создания',
    type: CreateNftResponse,
  })
  public async createNft(@Body() data: CreateNft): Promise<CreateNftResponse> {
    return await this.nftService.createNft(data);
  }

  @Post('/transferCollection')
  @ApiOperation({ description: 'Отправка (смена владельца) коллекции' })
  public async transferCollection(@Body() data: TransferCollectionRequestDto) {
    return await this.nftService.transferCollection(
      data.mnemonic,
      data.collectionAddress,
      data.newOwnerAddress,
    );
  }

  @Post('/sale')
  @ApiOperation({ description: 'Получение адреса для продажи NFT-токена' })
  @ApiCreatedResponse({
    description: 'Успешное создание заявки на продажу',
    type: SaleResponseDto,
  })
  public async sale(@Body() data: SaleRequestDto): Promise<SaleResponseDto> {
    const saleAddress = await this.nftService.sale(
      data.marketplaceAddress,
      data.nftAddress,
      data.fullPrice,
      data.marketplaceFee,
      data.collectionAddress,
      data.royaltyAmount,
    );
    return {
      address: saleAddress,
    };
  }

  @Post('/deploySale')
  @ApiOperation({
    description: 'Деплой заявки на продажу NFT-токена в БЧ',
  })
  @ApiCreatedResponse({ description: 'Успешный деплой' })
  public async deploySale(@Body() data: SaleDeployDto) {
    return await this.nftService.deploySale(
      data.mnemonic,
      data.nftSaleAddress,
      data.marketAddress,
    );
  }
}

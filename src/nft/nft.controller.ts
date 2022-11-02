import {Body, Controller, Get, HttpStatus, Post, Query} from '@nestjs/common';
import {ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {NftService} from "./nft.service";
import {CreateCollection, CreateCollectionResponse, CreateNft, NFTCollectionData} from "./types";

@Controller("/api/v1/nft")
@ApiTags("nft")
export class NftController {

    constructor(private nftService: NftService) {
    }

    @Get("/getCollectionData")
    @ApiOperation({description: 'Получение данных NFT-коллекции'})
    @ApiResponse({status: HttpStatus.OK, type: NFTCollectionData})
    public async getCollectionData(@Query('address') address: string): Promise<NFTCollectionData> {
        const data = await this.nftService.getNftCollectionData(address);
        let promise = Promise.resolve({
            nextItemIndex: data.nextItemIndex,
            ownerAddress: data.ownerAddress.toString(true, true, true, false),
            collectionContentUri: data.collectionContentUri
        });
        return promise;
    }

    @Post("/createCollection")
    @ApiOperation({description: 'Создание NFT-коллекции'})
    @ApiCreatedResponse({description: 'Результат создания NFT-коллекции', type: CreateCollectionResponse})
    public async createNftCollection(@Body() data: CreateCollection): Promise<CreateCollectionResponse> {
        const address = await this.nftService.createCollection(data);
        return {address}
    }

    @Post("/createNft")
    @ApiOperation({description: 'Создание NFT-item\'а'})
    @ApiCreatedResponse({description: 'Результат создания', type: CreateCollectionResponse})
    public async createNft(@Body() data: CreateNft): Promise<CreateCollectionResponse> {
        return await this.nftService.createNft(data);
    }

}

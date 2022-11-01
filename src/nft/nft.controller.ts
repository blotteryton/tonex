import {Body, Controller, Get, Post, Query} from '@nestjs/common';
import {ApiTags} from "@nestjs/swagger";
import {NftService} from "./nft.service";
import {CreateCollection, CreateCollectionResponse, CreateNft, NFTCollectionData} from "./types";

@Controller("/api/v1/nft")
@ApiTags("nft")
export class NftController {

    constructor(private nftService: NftService) {
    }

    @Get("/getCollectionData")
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
    public async createNftCollection(@Body() data: CreateCollection): Promise<CreateCollectionResponse> {
        const address = await this.nftService.createCollection(data);
        return {address}
    }

    @Post("/createNft")
    public async createNft(@Body() data: CreateNft): Promise<CreateCollectionResponse> {
        return await this.nftService.createNft(data);
    }

}

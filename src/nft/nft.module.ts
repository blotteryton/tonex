import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import {TonModule} from "../ton/ton.module";

@Module({
  controllers: [NftController],
  providers: [NftService],
  imports: [TonModule]
})
export class NftModule {}

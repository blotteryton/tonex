import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WalletsModule } from './wallets/wallets.module';
import { NftModule } from './nft/nft.module';
import { TonModule } from './ton/ton.module';
import { MarketplaceModule } from './marketplace/marketplace.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    WalletsModule,
    NftModule,
    TonModule,
    MarketplaceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

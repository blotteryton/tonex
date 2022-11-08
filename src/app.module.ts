import {Module} from '@nestjs/common';
import {WalletsModule} from "./wallets/wallets.module";
import { NftModule } from './nft/nft.module';
import { TonModule } from './ton/ton.module';
import { MarketplaceModule } from './marketplace/marketplace.module';

@Module({
  imports: [
      WalletsModule,
      NftModule,
      TonModule,
      MarketplaceModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

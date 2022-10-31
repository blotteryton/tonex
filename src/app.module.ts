import {Module} from '@nestjs/common';
import {WalletsModule} from "./wallets/wallets.module";
import { NftModule } from './nft/nft.module';
import { TonModule } from './ton/ton.module';

@Module({
  imports: [
      WalletsModule,
      NftModule,
      TonModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

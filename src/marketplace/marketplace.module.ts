import { Module } from '@nestjs/common';
import { MarketplaceService } from './marketplace.service';
import { MarketplaceController } from './marketplace.controller';
import { TonModule } from 'src/ton/ton.module';

@Module({
  controllers: [MarketplaceController],
  providers: [MarketplaceService],
  imports: [TonModule],
})
export class MarketplaceModule {}

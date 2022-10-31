import {Module} from "@nestjs/common";
import {WalletsController} from "./wallets.controller";
import {WalletsService} from "./wallets.service";
import {TonModule} from "../ton/ton.module";

@Module({
    controllers: [WalletsController],
    providers: [WalletsService],
    imports: [TonModule],
    exports: []
})
export class WalletsModule {}

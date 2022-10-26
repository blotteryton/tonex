import {Module} from "@nestjs/common";
import {WalletsController} from "./wallets.controller";
import {WalletsService} from "./wallets.service";

@Module({
    controllers: [WalletsController],
    providers: [WalletsService],
    imports: [],
    exports: []
})
export class WalletsModule {}

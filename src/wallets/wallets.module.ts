import {Module} from "@nestjs/common";
import {WalletsController} from "./wallets.controller";
import {WalletsService} from "./wallets.service";

@Module({
    controllers: [WalletsController],
    imports: [],
    exports: [],
    providers: [WalletsService]
})
export class WalletsModule {}

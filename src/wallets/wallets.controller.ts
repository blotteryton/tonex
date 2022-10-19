import {Controller, Post} from "@nestjs/common";
import {ApiCreatedResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath} from "@nestjs/swagger";
import {CreateWalletResponse} from "./types";
import {WalletsService} from "./wallets.service";

@ApiTags("wallets")
@Controller('/api/v1/wallets')
export class WalletsController {

    constructor(private walletsService: WalletsService) {
    }

    @Post()
    @ApiOperation({description: 'Создание нового кошелька'})
    @ApiCreatedResponse({description: 'Новый кошелек успешно создан', type: CreateWalletResponse})
    public async createWallet(): Promise<CreateWalletResponse> {
        return this.walletsService.createWallet();
    }
}

import {Injectable} from '@nestjs/common';

const TonWeb = require('tonweb');

@Injectable()
export class TonService {
    private readonly tonProvider;
    private readonly tonWeb;

    constructor() {
        this.tonProvider = new TonWeb.HttpProvider(
            this.getJsonRPCUrl(),
            {apiKey: this.getAPIKey() },
        );

        this.tonWeb = new TonWeb(this.tonProvider)
        console.log(`Initialize TON PROVIDER. RPC: ${this.getJsonRPCUrl()}, API_KEY: ${this.getAPIKey()}`)
    }

    private isTest(): boolean {
        return process.env.production == 'false'
    }

    private getJsonRPCUrl(): string {
        if (this.isTest()) {
            return 'https://testnet.toncenter.com/api/v2/jsonRPC'
        } else {
            return 'https://toncenter.com/api/v2/jsonRPC';
        }
    }

    private getAPIKey(): string {
        if (this.isTest()) {
            return process.env.TESTAPI_KEY
        } else {
            return process.env.API_KEY
        }

    }


    public getTonProvider() {
        return this.tonProvider;
    }

    public getTonWeb() {
        return this.tonWeb;
    }
}

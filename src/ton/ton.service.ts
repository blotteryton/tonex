import {Injectable} from '@nestjs/common';

const TonWeb = require('tonweb');

@Injectable()
export class TonService {
    private readonly tonProvider;
    private readonly tonWeb;

    constructor() {
        this.tonProvider = new TonWeb.HttpProvider(
            'https://toncenter.com/api/v2/jsonRPC',
            {apiKey: process.env.API_KEY},
        );

        this.tonWeb = new TonWeb(this.tonProvider)
    }

    public getTonProvider() {
        return this.tonProvider;
    }

    public getTonWeb() {
        return this.tonWeb;
    }
}

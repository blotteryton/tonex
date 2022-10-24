import { ConsoleLogger } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

const TonWeb = require('tonweb');
export const { NftCollection, NftItem, NftMarketplace, NftSale } =
  TonWeb.token.nft;

export const tonProvider = new TonWeb.HttpProvider(
  'https://toncenter.com/api/v2/jsonRPC',
  { apiKey: process.env.API_KEY },
);

export const tonWeb = new TonWeb(tonProvider);

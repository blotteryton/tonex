export class NFTCollectionData {
    nextItemIndex: number;
    ownerAddress: string;
    collectionContentUri?: string;
}


export class CreateCollection {
    mnemonic: string;
    amount: string;
    collectionContentUri: string;
    nftItemContentBaseUri: string;
    royalty: string;
    royaltyAddress: string;
}


export class CreateCollectionResponse {
    address: string;
}

export class CreateNft {
    collectionAddress: string;
    amount: string;
    mnemonic: string;
    nftItemContentBaseUri: string;
    nftItemContentUri: string;
}

import HDKey from 'hdkey';
import {KeyChain as AVMKeyChain, KeyPair as AVMKeyPair, UTXOSet, UTXO} from "avalanche/dist/apis/avm";
import {ITransaction} from "@/components/wallet/transfer/types";
import {BN} from "avalanche";

export type wallet_type = "hd" | "singleton";

export interface IIndexKeyCache{
    [index:number]: AVMKeyPair
}

// Every AVA Wallet must implement this.
export interface AvaWalletCore {
    // type: wallet_type;
    chainId: string;
    utxoset: UTXOSet;
    stakeAmount: BN;

    getCurrentAddress(): string;
    getChangeAddress(): string;
    getDerivedAddresses(): string[];
    onnetworkchange(): void;
    getUTXOs(): Promise<UTXOSet>;
    getUTXOSet(): UTXOSet;
    getStake(): Promise<BN>;
    getPlatformRewardAddress(): string;
    validate(nodeID: string, amt: BN, start: Date, end: Date, delegationFee:number, rewardAddress?: string): Promise<string>;
    delegate(nodeID: string, amt: BN, start: Date, end: Date, rewardAddress?: string): Promise<string>
    chainTransfer(amt: BN, sourceChain: string): Promise<string>;
    importToPlatformChain(): Promise<string>;
    importToXChain(): Promise<string>;
    issueBatchTx(orders: (UTXO|ITransaction)[], addr: string): Promise<string>;
}

export interface IAvaHdWallet extends AvaWalletCore{
    seed: string;
    hdKey: HDKey;
    getMnemonic(): string;
    getCurrentKey(): AVMKeyPair;
    getKeyChain(): AVMKeyChain;
}


export interface IAvaSingletonWallet extends AvaWalletCore{
    masterKey: AVMKeyPair
}




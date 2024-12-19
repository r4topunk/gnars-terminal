import { useState, useEffect } from "react";

export interface Token {
    token: {
        address: string;
        network: string;
        label: string;
        name: string;
        symbol: string;
        decimals: string;
        verified: boolean;
        price: string;
        balance: number;
        balanceUSD: number;
        balanceRaw: string;
    };
}

export interface NFT {
    balance: string;
    token: {
        collection: {
            address: string;
            floorPriceEth: string;
            logoImageUrl: string;
            name: string;
            network: string;
            nftStandard: string;
            openseaId: string;
            type: string;
        };
        estimatedValueEth: string;
        lastSaleEth: string | null;
        medias: {
            type: string;
            originalUrl: string;
            fileSize: string;
            mimeType: string;
            blurhash: string;
            height: number;
            width: number;
        }[];
        rarityRank: string | null;
        tokenId: string;
    };
}

const useTreasure = (treasuryAddress: string) => {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalNetWorth, setTotalNetWorth] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [nfts, setNfts] = useState<NFT[]>([]);

    useEffect(() => {
        const fetchTreasure = async () => {
            try {
                console.log("Fetching treasure data...");
                const apiUrl = `https://pioneers.dev/api/v1/portfolio/${treasuryAddress}`;
                console.log("API URL:", apiUrl);

                const res = await fetch(apiUrl);
                console.log("Treasure data fetched:", res);
                if (!res.ok) {
                    throw new Error(`Error: ${res.status} ${res.statusText}`);
                }
                const data = await res.json();
                console.log("Treasure data fetched:", data);
                setTokens(data.tokens);
                setTotalBalance(data.totalBalanceUsdTokens);
                setTotalNetWorth(data.totalNetWorth);
                setNfts(data.nfts);
            } catch (err) {
                console.error("Error fetching treasure data:", err);
                setError("Error loading treasure data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTreasure();
    }, [treasuryAddress]);

    return { tokens, totalBalance, totalNetWorth, isLoading, error, nfts };
};

export default useTreasure;

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

const useTreasure = (treasuryAddress: string) => {
    const [tokens, setTokens] = useState<Token[]>([]);
    const [totalBalance, setTotalBalance] = useState(0);
    const [totalNetWorth, setTotalNetWorth] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
            } catch (err) {
                console.error("Error fetching treasure data:", err);
                setError("Error loading treasure data");
            } finally {
                setIsLoading(false);
            }
        };

        fetchTreasure();
    }, [treasuryAddress]);

    return { tokens, totalBalance, totalNetWorth, isLoading, error };
};

export default useTreasure;

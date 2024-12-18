'use client';
import useTreasure from "../../hooks/useTreasure";
import styles from './TreasurePage.module.css';

const TreasurePage = () => {
    const treasuryAddress = process.env.NEXT_PUBLIC_TREASURY!;
    const { tokens, totalBalance, totalNetWorth, isLoading, error } = useTreasure(treasuryAddress);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Treasure</h1>
            <div className={styles.summary}>
                <p>Total Balance: ${totalBalance}</p>
                <p>Total Networth: ${totalNetWorth}</p>
            </div>
            <ul className={styles.tokenList}>
                {tokens.map((token) => (
                    <li key={token.token.address} className={styles.tokenItem}>
                        <p><strong>Symbol:</strong> {token.token.symbol}</p>
                        <p><strong>Balance:</strong> {token.token.balance}</p>
                        <p><strong>Balance (USD):</strong> ${token.token.balanceUSD}</p>
                        <p><strong>Price:</strong> ${token.token.price}</p>
                        <p><strong>Decimals:</strong> {token.token.decimals}</p>
                        <p><strong>Verified:</strong> {token.token.verified ? "Yes" : "No"}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TreasurePage;

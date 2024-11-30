'use client';

import { useAuction } from '@/hooks/auction';
import {
  useReadAuctionAuction,
  useWriteAuctionCreateBid,
  useWriteAuctionSettleCurrentAndCreateNewAuction,
} from '@/hooks/wagmiGenerated';
import { DAO_ADDRESSES } from '@/utils/constants';
import { toObject } from '@/utils/helpers';
import { useCallback, useState } from 'react';
import { parseEther } from 'viem';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

function AuctionPage() {
  const account = useAccount();
  const { connectors, connect, status, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: manualAuction } = useAuction();
  const { data: wagmiAuction, isPending: wagmiAuctionIsPending } =
    useReadAuctionAuction();
  const [bidValue, setBidValue] = useState('0.1');

  const tokenId = wagmiAuction ? wagmiAuction[0] : 0n;

  const { writeContractAsync: writeBid } = useWriteAuctionCreateBid();
  const onClickBid = useCallback(async () => {
    try {
      const res = await writeBid({
        args: [tokenId],
        value: parseEther(bidValue),
      });
      console.log(res);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        window.alert(`Error creating bid: ${error.message}`);
      } else {
        window.alert('Error creating bid');
      }
    }
  }, [writeBid, bidValue]);

  const { writeContractAsync: writeSettle } =
    useWriteAuctionSettleCurrentAndCreateNewAuction();
  const onClickSettle = useCallback(async () => {
    try {
      const res = await writeSettle({
      });
      console.log(res);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        window.alert(`Error settling auction: ${error.message}`);
      } else {
        window.alert('Error settling auction');
      }
    }
  }, [writeSettle]);

  return (
    <>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type='button' onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div>
        <h2>Connect</h2>
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect({ connector })}
            type='button'
          >
            {connector.name}
          </button>
        ))}
        <div>{status}</div>
        <div>{connectError?.message}</div>
      </div>

      <div>
        <h2>DAO Addresses</h2>
        <pre>{JSON.stringify(DAO_ADDRESSES, null, 2)}</pre>
      </div>

      <div>
        <h2>Manual Auction Data</h2>
        {manualAuction === null ? (
          <div>Loading...</div>
        ) : (
          <div>
            <pre>{JSON.stringify(toObject(manualAuction), null, 2)}</pre>
          </div>
        )}
      </div>

      <div>
        <h2>Wagmi Auction Data</h2>
        {wagmiAuctionIsPending ? (
          <div>Loading...</div>
        ) : (
          <div>
            <pre>{JSON.stringify(toObject(wagmiAuction), null, 2)}</pre>
          </div>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          alignItems: 'self-start',
        }}
      >
        <h2>Wagmi Auction Write</h2>
        <input
          type='text'
          value={bidValue}
          onChange={(e) => setBidValue(e.target.value)}
          placeholder='Enter bid value in ETH'
        />
        <button type='button' onClick={onClickBid}>
          Create Bid
        </button>
        <button type='button' onClick={onClickSettle}>
          Settle Current and Create New Auction
        </button>
      </div>
    </>
  );
}

export default AuctionPage;

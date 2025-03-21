// import '@rainbow-me/rainbowkit/styles.css';
import type { Metadata } from 'next';
import ClientPage from './client-page';
import { fetchAuction } from '@/services/auction';
import { DAO_ADDRESSES } from '@/utils/constants';

const appUrl = process.env.NEXT_PUBLIC_URL;

const frame = {
  version: 'next',
  imageUrl: `${appUrl}/frames/auction/opengraph-image`,
  button: {
    title: 'Gnars Auction',
    action: {
      type: 'launch_frame',
      name: 'Gnars Auction',
      url: `${appUrl}/frames/auction/`,
      splashImageUrl: `${appUrl}/images/loading.gif`,
      splashBackgroundColor: '#f7f7f7',
    },
  },
};

export const metadata: Metadata = {
  title: 'Gnars Dao',
  description: 'Gnarly Ecosystem',
  other: {
    'fc:frame': JSON.stringify(frame),
  },
};

export default async function Page() {
  const auctions = await fetchAuction(
    DAO_ADDRESSES.token,
    'endTime',
    'desc',
    1
  );
  const activeAuction = auctions[0];

  return <ClientPage auction={activeAuction} />;
}

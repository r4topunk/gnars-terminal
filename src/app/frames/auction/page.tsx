// import '@rainbow-me/rainbowkit/styles.css';
import ClientPage from './client-page';
import { fetchAuction } from '@/services/auction';
import { DAO_ADDRESSES } from '@/utils/constants';

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

import { ImageResponse } from 'next/og';
import { fetchAuction } from '@/services/auction';
import { DAO_ADDRESSES } from '@/utils/constants';

// export const alt = 'Gnars Frame V2';
export const size = {
  width: 600,
  height: 400,
};

// export const contentType = 'image/png';

export default async function Image() {
  try {
    const auctions = await fetchAuction(
      DAO_ADDRESSES.token,
      'endTime',
      'desc',
      1
    );

    if (!auctions?.[0]) {
      throw new Error('No auction data available');
    }

    const activeAuction = auctions[0];
    // console.dir(activeAuction);
    
    if (!activeAuction?.token?.image) {
      throw new Error('No image URL available');
    }

    const encodedUrl = encodeURIComponent(activeAuction.token.image);
    const imageResponse = process.env.NEXT_PUBLIC_URL + `/_next/image?w=640&q=75&url=${encodedUrl}`;
    const imageForegroundUrl = imageResponse;
    
    // Format the end time
    const endTimeDate = new Date(parseInt(activeAuction.endTime) * 1000);
    const now = new Date();
    const timeRemaining = endTimeDate.getTime() - now.getTime();
    
    // Convert to readable format
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
    
    const remainingTime = timeRemaining > 0 
      ? `${days}d ${hours}h ${minutes}m ${seconds}s`
      : 'Auction ended';


    // Bid Count
    const bidMessage = activeAuction.bidCount > 0 ? `Bids: ${activeAuction.bidCount}` : 'Be the first to bid';


    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            backgroundColor: '#1a1a1a',
            padding: '20px',
          }}
        >
          <div style={{
            width: '30%',
            height: '80%',
            position: 'relative',
            marginRight: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            {imageForegroundUrl && (
              <img
                src={imageForegroundUrl}
                width='200'
                height='200'
              />
            )}
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
          }}>
            <h1 style={{
              color: '#FFD700',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              margin: 0,
              fontSize: '48px',
              fontWeight: 'bold',
              display: 'flex',
            }}>
              Gnars Auction
            </h1>
            <p style={{
              color: '#ffffff',
              fontSize: '24px',
              margin: 0,
              opacity: 0.8,
              display: 'flex',
            }}>
              #{activeAuction.token.tokenId}
            </p>
            <p style={{
              color: '#ffffff',
              fontSize: '24px',
              margin: 0,
              opacity: 0.8,
              display: 'flex',
            }}>
              Ending: {remainingTime}
            </p>
            <p style={{
              color: '#ffffff',
              fontSize: '24px',
              margin: 0,
              opacity: 0.8,
              display: 'flex',
            }}>
              {bidMessage}
            </p>
          </div>
        </div>
      ),
      {
        ...size,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  } catch (error) {
    // Fallback response if something goes wrong
    return new ImageResponse(
      (
        <div style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#1a1a1a',
        }}>
          <h1 style={{ color: '#FFD700' }}>Gnars Auction</h1>
        </div>
      ),
      {
        ...size,
        headers: {
          'Cache-Control': 'no-store',
        },
      }
    );
  }
}

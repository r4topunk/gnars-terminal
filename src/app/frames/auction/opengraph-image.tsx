import { ImageResponse } from 'next/og';
import { fetchAuction } from '@/services/auction';
import { DAO_ADDRESSES } from '@/utils/constants';

// export const revalidate = 1;
export const alt = 'Gnars Frame V2';
export const size = {
  width: 600,
  height: 400,
};

export const contentType = 'image/png';

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
    console.dir(activeAuction);
    
    if (!activeAuction?.token?.image) {
      throw new Error('No image URL available');
    }

    // const imageResponse = activeAuction.token.image;
    const encodedUrl = encodeURIComponent(activeAuction.token.image);
    const imageResponse = process.env.NEXT_PUBLIC_URL + `/_next/image?url=${encodedUrl}&w=600&q=75`;
    const imageForegroundUrl = imageResponse;

    // const imageResponse = await fetch(activeAuction.token.image);
    
    // if (!imageResponse.ok) {
    //   throw new Error('Failed to fetch image');
    // }

    // const imageBuffer = await imageResponse.arrayBuffer();
    // const base64Image = Buffer.from(imageBuffer).toString('base64');
    // const imageForegroundUrl = `data:image/svg+xml;base64,${base64Image}`;

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
                // alt={`Auction token id ${activeAuction.token.tokenId}`}
                width='600'
                height='600'
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

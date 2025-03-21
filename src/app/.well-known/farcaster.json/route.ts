export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        'eyJmaWQiOjE5NjMyOCwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDMwM0JlMDNiMkExQjVlMkViQjQzZEQ0NkEyYWFDZjk1YzJhQTVBODQifQ',
      payload: 'eyJkb21haW4iOiJ3d3cuZ25hcnMuY29tIn0',
      signature:
        'MHgwMmM0OWIzNzA5NzJkNGU5MmUyYmE5NTMzZmM0Yjc3NmVkOTU5NDdhM2ExNWIzNWQ1MDk4MjJkMzdkZTVjN2E2NDU1YjIyYTMxNTg2NzIwNTA5MDVkMzgxZmVmODIxOTIxOTcwYjU0ODMxYzIzZDE0MjllNDNjYzg2Yzc3NmEwNzFi',
    },
    frame: {
      version: '1',
      name: 'Gnars Auction',
      iconUrl: `${appUrl}/images/gnars.webp`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/frames/auction/opengraph-image`,
      buttonTitle: 'Launch App',
      splashImageUrl: `${appUrl}/images/gnars.webp`,
      splashBackgroundColor: '#1C1C1C',
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}

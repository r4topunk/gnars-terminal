import { PinataSDK } from 'pinata-web3';

const pinata = new PinataSDK({
  pinataGateway: 'gateway.pinata.cloud',
  pinataJwt: undefined,
});

export function formatIpfsUrl(url?: string) {
  if (!url) return '';

  if (url.startsWith('ipfs')) {
    return `https://gateway.pinata.cloud/ipfs/${url.split('://')[1]}`;
  }
  return url;
}

interface ipfsData extends JSON {
  name?: string;
  description?: string;
  image?: string;
  content?: Content;
}

export interface Content {
  mime: string;
  uri: string;
}

export async function getZoraIpfsData(ipfsUrl: string) {
  const ipfsRes = await pinata.gateways.get(ipfsUrl);
  if (ipfsRes.contentType === 'application/json') {
    const ipfsData = ipfsRes?.data as ipfsData;
    if (ipfsData && ipfsData.content) {
      return ipfsData;
    }
  }
  return null;
}

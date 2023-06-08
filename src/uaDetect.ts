import { UAParser } from 'ua-parser-js';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function detectBrowser() {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  const visitorsId = result.visitorId;
  console.log('eaaadf29a3dc98bc33f0522b21d09b79' === visitorsId);
  const parser = new UAParser(window.navigator.userAgent);
  console.log(parser.getResult());
  console.log(await fp.get());
}

export async function fingerprintUsingCanvas() {
  const canvas = document.createElement('canvas') as HTMLCanvasElement;
  const context = canvas.getContext('2d');
  if (context) {
    context.font = 'Arial';
    context.fillRect(0, 0, 20, 20);
    context.fillText(
      '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~',
      0,
      0
    );
    const result = await hash(canvas.toDataURL());
    return result;
  } else {
    throw Error('Enable to create a 2D context for canvas');
  }
}

async function hash(s: string) {
  const utf8 = new TextEncoder().encode(s);
  const hashBuffer = await crypto.subtle.digest('SHA-256', utf8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((bytes) => bytes.toString(16).padStart(2, '0'))
    .join('');
  return hashHex;
}

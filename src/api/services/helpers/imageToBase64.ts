import https from 'https';

// TODO This might be useful, Use if images often cause problems.
const PROXY_URL = 'https://proxy.duckduckgo.com/iu/?u=';

export default function imageToBase64(imageUrl: string | null) {
  return new Promise<string>((resolve, reject) => {
    // Basic validation so this function can be called with any image value in the system.
    if (!imageUrl || imageUrl.includes('base64,')) {
      return resolve(imageUrl);
    }

    https.get(imageUrl, function (response) {
      const imageType = response.headers['content-type']; // TODO support svg ?
      let image: string = 'data:' + imageType + ';base64,';

      response.on('data', (data) => {
        image += data.toString('base64');
      });

      response.on('end', () => resolve(image));
      response.on('error', () => resolve(imageUrl)); // TODO Perhaps do some logging here for failures
    });
  });
}

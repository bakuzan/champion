import http from 'http';

// TODO This might be useful, Use if images often cause problems.
const PROXY_URL = 'https://proxy.duckduckgo.com/iu/?u=';

export default function imageToBase64(imageUrl: string) {
  return new Promise<string>((resolve, reject) => {
    // Basic validation so this function can be called with any image value in the system.
    if (!imageUrl || imageUrl.includes('base64,')) {
      return resolve(imageUrl);
    }

    http.get(imageUrl, function (response) {
      response.setEncoding('base64');

      const imageType = response.headers['content-type'];
      let image: string = 'data:' + imageType + ';base64,';

      response.on('data', (data) => {
        image += data;
      });

      response.on('end', () => resolve(image));
      response.on('error', () => reject(imageUrl));
    });
  });
}

import https from 'https';

const PROXY_URL = 'https://proxy.duckduckgo.com/iu/?u=';

export default function imageToBase64(imageUrl: string | null) {
  return new Promise<string>((resolve) => {
    // Basic validation so this function can be called with any image value in the system.
    if (!imageUrl || imageUrl.includes('base64,')) {
      return resolve(imageUrl);
    }

    https.get(PROXY_URL + imageUrl, function (response) {
      const imageType = response.headers['content-type']; // TODO Support svg?
      let image = 'data:' + imageType + ';base64,';
      let imageData = new Uint8Array([]);

      response.on('data', (data) => {
        imageData = new Uint8Array([...imageData, ...data]);
      });

      response.on('end', () => {
        console.info(
          `%c Image Download End`,
          `color:forestgreen;font-size:18px;font-weight:bold;`,
          imageUrl
        );

        image += Buffer.from(imageData).toString('base64');
        resolve(image);
      });

      response.on('error', () => {
        // TODO Perhaps do some real logging here for failures
        console.error(
          `%c Image Download Error`,
          `color:firebrick;font-size:18px;font-weight:bold;`
        );

        resolve(imageUrl);
      });
    });
  });
}

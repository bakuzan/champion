export default function isDevelopment() {
  const nodeEnv = process.env.NODE_ENV;
  return nodeEnv && nodeEnv.toUpperCase() === 'DEVELOPMENT';
}

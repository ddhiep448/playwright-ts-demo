import 'dotenv/config';
import * as dotenv from 'dotenv';

export default async function globalSetup() {
  dotenv.config({ override: true });
  const requiredEnv = [
    'ENV_NAME',
    'BASE_URL',
    'ADMIN_USERNAME',
    'ADMIN_PASSWORD',
  ];

  for (const key of requiredEnv) {
    if (!process.env[key]) {
      throw new Error(`❌ Missing required env var: ${key}`);
    }
  }
  console.info(`✅ Running environment: '${process.env.ENV_NAME}'`);
}

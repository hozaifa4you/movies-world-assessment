import { registerAs } from '@nestjs/config';
import path from 'path';

export default registerAs('storage.config', () => ({
   gcpProjectId: process.env.GCP_PROJECT_ID,
   gcpBucket: process.env.GCP_BUCKET,
   gcpKeyFile: path.resolve(
      process.cwd(),
      process.env.GCP_KEYFILE ?? 'gcp-storage.config.json',
   ),
}));

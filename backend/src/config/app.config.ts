import { registerAs } from '@nestjs/config';

export default registerAs('app.config', () => ({
   appEnv:
      process.env.NODE_ENV ??
      ('development' as 'production' | 'development' | 'test'),
   appName: process.env.APP_NAME || 'Movies World',
   port: parseInt(process.env.PORT ?? '3000', 10),
   appUrl: process.env.APP_URL || 'http://localhost:3000',
   apiUrl: process.env.API_URL || 'http://localhost:3333',
}));

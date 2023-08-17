import { ConfigService } from '@nestjs/config';
import { Redis } from 'ioredis';
const configService = new ConfigService();

export const redisProvider = [
  {
    // redis 모듈 버전
    // provide: 'REDIS_CLIENT',
    // useFactory: async () => {
    //   const client = createClient({
    //     socket: {
    //       host: configService.get<string>('REDIS_HOST'),
    //       port: configService.get<number>('REDIS_PORT'),
    //     },
    //     password: configService.get<string>('REDIS_PASSWORD'),
    //   });
    //   await client.connect().then(() => console.log('Redis Connected!'));
    //   return client;
    // },
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
      const redis = new Redis({
        host: configService.get<string>('REDIS_HOST'),
        port: configService.get<number>('REDIS_PORT'),
        password: configService.get<string>('REDIS_PASSWORD'),
      });
      const connect = await redis.ping();
      if (connect === 'PONG') console.log('REDIS Connect!');
      return redis;
    },
  },
];

import { Redis } from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { SetDto } from './dto/set.dto';

@Injectable()
export class BookingService {
  // RedisModule을 사용하기 위해 Inject에 Token 투입
  // 이를 통해 Redis를 연결하여 사용이 가능하다
  constructor(@Inject('REDIS_CLIENT') private redis: Redis) {}

  async get(key: string): Promise<string> {
    const answer = await this.redis.get(key);
    return answer;
  }

  async set(data: SetDto) {
    await this.redis.set(data.key, data.value);
    return { success: true };
  }
  async publish(data: BookingDto) {
    // 채널 설정
    const channel = 'Ticket';

    // publish로 채널에 메세지 전달
    await this.redis.publish(channel, JSON.stringify(data));

    return { success: true };
  }
}

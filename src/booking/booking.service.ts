import { Redis } from 'ioredis';
import { Inject, Injectable } from '@nestjs/common';
import { BookingDto } from './dto/booking.dto';
import { SetDto } from './dto/set.dto';

@Injectable()
export class BookingService {
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
    const channel = 'Ticket';

    await this.redis.publish(channel, JSON.stringify(data));

    return { success: true };
  }
}

import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingDto } from './dto/booking.dto';
import { SetDto } from './dto/set.dto';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post('get')
  async get(@Body() data) {
    const answer = await this.bookingService.get(data.key);
    return answer;
  }

  @Post('set')
  set(@Body() data: SetDto) {
    const set = this.bookingService.set(data);
    return set;
  }

  @Post('publish')
  publish(@Body(new ValidationPipe()) data: BookingDto) {
    this.bookingService.publish(data);
    return { message: 'publish 성공' };
  }
}

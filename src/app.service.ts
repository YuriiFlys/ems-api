import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): { status: string } {
    return { status: 'OK - EMS API is up and running' };
  }
}

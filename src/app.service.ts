import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'MFES Tools API - Running on Clean Architecture';
  }
}

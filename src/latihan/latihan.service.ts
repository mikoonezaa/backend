import { Injectable } from '@nestjs/common';

@Injectable()
export class LatihanService {
  hello() {
    return 'hello world';
  }
}

@Injectable()
export class LatihanService2 {
  hello() {
    return 'halo dunia';
  }
}

import { NotFoundException } from '@nestjs/common';

export class ResourceAlreadyExistException extends NotFoundException {
  constructor(private body: string = 'Update already executed') {
    super(body);
  }
}

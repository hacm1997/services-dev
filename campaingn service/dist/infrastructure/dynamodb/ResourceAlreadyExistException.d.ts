import { NotFoundException } from '@nestjs/common';
export declare class ResourceAlreadyExistException extends NotFoundException {
    private body;
    constructor(body?: string);
}

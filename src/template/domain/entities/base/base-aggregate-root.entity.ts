import { AggregateRoot } from '@nestjs/cqrs';
import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntityAggregateRoot extends AggregateRoot {
  @PrimaryGeneratedColumn('uuid')
  protected readonly id: string;
}

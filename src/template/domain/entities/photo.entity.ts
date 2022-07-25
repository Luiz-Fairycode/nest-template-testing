import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from './base/base.entity';
import { TemplateEntitySchema } from './schema/entity-schema';
import { User } from './user.entity';

@Entity({ schema: TemplateEntitySchema })
export class Photo extends BaseEntity {
  constructor(url: string) {
    super();
    this.url = url;
  }

  @Column({ type: 'varchar', length: 300 })
  private url: string;

  @ManyToOne((type) => User, (user) => user.photos)
  public readonly user: User;

  getUrl(): string {
    return this.url;
  }
}

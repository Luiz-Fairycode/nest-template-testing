import { ICreation } from 'src/core/domainObjects/creation.entity.interface';
import { IUpdate } from 'src/core/domainObjects/update.entity.interface';
import { Column, Entity, EntitySchema, OneToMany } from 'typeorm';
import { UserCreatedEvent } from '../events/email/user-created.event';
import { BaseEntityAggregateRoot } from './base/base-aggregate-root.entity';
import { Photo } from './photo.entity';
import { TemplateEntitySchema } from './schema/entity-schema';

// https://orkhan.gitbook.io/typeorm/docs/decorator-reference#column
@Entity({ schema: TemplateEntitySchema })
export class User
  extends BaseEntityAggregateRoot
  implements ICreation, IUpdate
{
  @Column({ type: 'varchar', length: 100 })
  private readonly name: string;
  @Column({ type: 'int' })
  private readonly age: number;
  // Coordinated Universal Time (UTC) - Será necessário tratar na tela de acordo com o fuso que deseja exibir
  @Column({ type: 'timestamptz' })
  private creationDateTime: Date;
  @Column({ type: 'varchar', length: 100 })
  private creationProgram: string;
  // Coordinated Universal Time (UTC) - Será necessário tratar na tela de acordo com o fuso que deseja exibir
  @Column({ type: 'timestamptz', nullable: true })
  private updateDateTime?: Date;
  @Column({ type: 'varchar', length: 100, nullable: true })
  private updateProgram?: string;
  @OneToMany(() => Photo, (photo) => photo.user, {
    cascade: true,
  })
  public photos: Photo[];

  constructor(name: string, age: number) {
    super();
    this.name = name;
    this.age = age;

    this.creationAudit();
    // ARMAZENA O EVENTO DE CRIACAO
    this.apply(new UserCreatedEvent(this.id));
  }
  private creationAudit(): void {
    this.creationDateTime = new Date();
    this.creationProgram = this.creationAudit.name;
  }

  private updateAudit(): void {
    this.updateDateTime = new Date();
    this.updateProgram = this.updateAudit.name;
  }

  getCreationUserId(): number {
    throw new Error('Method not implemented.');
  }
  getCreationProgram(): string {
    return this.creationProgram;
  }
  getCreationDateTime(): Date {
    return this.creationDateTime;
  }

  getUpdateDateTime(): Date {
    throw new Error('Method not implemented.');
  }
  getUpdateUserId(): number {
    throw new Error('Method not implemented.');
  }
  getUpdateProgram(): string {
    throw new Error('Method not implemented.');
  }

  getId(): string {
    return this.id;
  }

  getName(): string {
    return this.name;
  }

  getAge(): number {
    return this.age;
  }

  getPhotos(): Photo[] {
    return this.photos;
  }

  addPhoto(photo: Photo) {
    if (this.photos == null) {
      this.photos = new Array<Photo>();
    }

    this.photos.push(photo);
  }
}

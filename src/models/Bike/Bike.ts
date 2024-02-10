import { BikeType } from "../enums";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Profile, Component } from "..";

@Entity()
class Bike {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("text")
  name: string;

  @Column("text")
  make: string;

  @Column("text")
  model: string;

  @Column("integer")
  year: number;

  @Column("text")
  type: BikeType;

  @ManyToOne(() => Profile, (profile: Profile) => profile.bikes)
  profile: Profile;

  @OneToMany(() => Component, (component: Component) => component.bike)
  components: Component[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}

interface BikeDto {
  id?: number;
  name?: string;
  profile?: Profile;
  components?: Component[];
  make?: string;
  model?: string;
  year?: number;
  type?: BikeType;
}

export { Bike, BikeDto };

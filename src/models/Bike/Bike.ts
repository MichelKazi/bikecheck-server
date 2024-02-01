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

  constructor(bikeDto: BikeDto) {
    this.id = bikeDto?.id;
    this.profile = bikeDto.profile;
    this.make = bikeDto.make;
    this.model = bikeDto.model;
    this.year = bikeDto.year;
    this.type = bikeDto.type;
  }
}

interface BikeDto {
  id: number;
  profile: Profile;
  make: string;
  model: string;
  year: number;
  type: BikeType;
}

export { Bike, BikeDto };

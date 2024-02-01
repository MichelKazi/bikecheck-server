import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from "typeorm";
import { Bike } from "../Bike/Bike";

enum Role {
  Admin = "ADMIN",
  Standard = "STANDARD",
}

@Entity()
class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  username: string;

  @Column("text")
  email: string;

  @Column("text")
  role: Role;

  @Column("text")
  passwordHash: string;

  @OneToMany(() => Bike, (bike: Bike) => bike.profile)
  bikes: Bike[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  constructor(profileDto: ProfileDto) {
    this.id = profileDto?.id;
    this.username = profileDto.username;
    this.email = profileDto.email;
    this.passwordHash = profileDto.passwordHash;
    this.role = profileDto.role;
  }
}

interface ProfileDto {
  id: number;
  username: string;
  email: string;
  role: Role;
  passwordHash: string;
  bikes: Bike[];
}

export { Profile, ProfileDto };

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

const nullableOpt = {
  nullable: true,
};

@Entity()
class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 100,
  })
  username: string;

  @Column("text")
  first_name: string;

  @Column("text", nullableOpt)
  email: string;

  @Column("text", { default: Role.Standard })
  role: Role;

  @Column("text", nullableOpt)
  avatar: string;

  @Column("text", nullableOpt)
  passwordHash: string;

  @OneToMany(() => Bike, (bike: Bike) => bike.profile)
  bikes: Bike[];

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updatedAt: Date;

  @Column("text", nullableOpt)
  strava_username: string;

  @Column("bigint", nullableOpt)
  strava_athlete_id: number;

  @Column("bigint", nullableOpt)
  strava_auth_expires_at: number;

  @Column("text", nullableOpt)
  strava_access_token: string;

  @Column("text", nullableOpt)
  strava_refresh_token: string;

  toDto = (): ProfileDto => {
    const dto: ProfileDto = {
      ...this,
    };
    return dto;
  };
}

interface ProfileDto {
  id?: number;
  username?: string;
  email?: string;
  role?: Role;
  password_hash?: string;
  bikes?: Bike[];
  avatar?: string;
  first_name?: string;
  strava_username?: string;
  strava_athlete_id?: number;
  strava_auth_expires_at?: number;
  strava_access_token?: string;
  strava_refresh_token?: string;
}

export { Profile, ProfileDto };

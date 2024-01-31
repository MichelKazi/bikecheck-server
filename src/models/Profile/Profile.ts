import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

enum Role {
  Admin = "ADMIN",
  Standard = "STANDARD",
}

@Entity()
class Profile {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({
    length: 100,
  })
  private username: string;

  @Column("text")
  private email: string;

  @Column("text")
  private role: Role;

  @Column("text")
  private passwordHash: string;

  @CreateDateColumn({ type: "timestamp" })
  private createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  private updatedAt: Date;

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
}

const dto: ProfileDto = {
  id: 1,
  username: "foo",
  email: "foo",
  role: Role.Admin,
  passwordHash: "foo",
};

export { Profile, ProfileDto };

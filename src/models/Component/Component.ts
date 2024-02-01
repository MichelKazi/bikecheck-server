import { ComponentType } from "../enums";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Bike } from "..";

@Entity()
class Component {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Bike, (bike: Bike) => bike.components)
  bike: Bike;

  @Column("text")
  type: ComponentType;

  @Column("double")
  status: number; // Status as a number from 1 to 10

  @Column("text")
  brand: string;

  @Column("text")
  model: string;

  @Column("integer")
  mileage: number;

  @Column("integer")
  battery: number;

  @Column("date")
  lastServiced: Date;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  constructor(componentDto: ComponentDto) {
    this.id = componentDto.id;
    this.bike = componentDto.bike;
    this.type = componentDto.type;
    this.status = componentDto.status;
    this.lastServiced = componentDto.lastServiced;
    this.brand = componentDto.brand;
    this.model = componentDto.model;
    this.mileage = componentDto.mileage;
    this.battery = componentDto.battery;
  }
}

interface ComponentDto {
  id: number;
  bike: Bike;
  type: ComponentType;
  status: number; // Status as a number from 1 to 10
  lastServiced: Date;
  brand: string;
  model: string;
  mileage: number;
  battery: number;
}

export { Component, ComponentDto };

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("artwork")
export class Artwork {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", length: 99 })
	title: string;

	@Column({ type: "varchar", length: 50 })
	artist: string;

    @Column({ type: "varchar", length: 50 })
    type: string

    @Column({ type: "decimal", precision: 14, scale: 2})
    price: number;

    @Column({ type: 'boolean', default: true })
    availability: boolean;
}

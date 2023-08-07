import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class Adzan {

    @PrimaryGeneratedColumn()
    id?: number

    @Column()
    kota?: string

    @Column()
    tanggal?: string

    @Column()
    imsyak?: string

    @Column()
    subuh?: string

    @Column()
    dzuhur?: string

    @Column()
    ashar?: string

    @Column()
    maghrib?: string

    @Column()
    isya?: string

}

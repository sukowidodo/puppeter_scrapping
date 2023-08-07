import { Adzan } from "src/models/Adzan"
import { AppDataSource } from "../data-source"
import { Repository } from "typeorm"

class AdzanRepo implements IAdzanRepo{
    repository = AppDataSource.getRepository(Adzan)

    saveAll = async (adzans :Adzan[]) => {
        try {
            console.log("Inserting into the database...")
            this.repository.save(adzans)
        } catch(err){
            console.log(err)
        }
    }

    getData = async (kota:string, tanggal:string) => {
        const data = await this.repository
        .createQueryBuilder("adzan")
        .where("kota = :kota",{ kota : kota })
        .andWhere("tanggal like :tanggal",{ tanggal : "%"+tanggal+"%"})
        .getMany()
        console.log("All : ", data)
        return data
    }
}

interface IAdzanRepo {
    repository: Repository<Adzan>
    saveAll(adzans :Adzan[]):Promise<void>
    getData(kota:string, tanggal:string):Promise<Adzan[]>
}

export let repos:IAdzanRepo = new AdzanRepo()


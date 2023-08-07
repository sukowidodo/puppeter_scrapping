import { Adzan } from '../models/Adzan';
import {repos} from '../repos/AdzanRepo'

function saveAll(data:Adzan[]): Promise<void> {
    console.log({data})
    return repos.saveAll(data);
}
  
function getData(kota:string, tanggal:string): Promise<Adzan[]> {
    console.log({kota:kota,tanggal:tanggal})
    return repos.getData(kota,tanggal);
}

export default {
    saveAll,
    getData
} as const;
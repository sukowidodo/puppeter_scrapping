
import { IReq, IRes } from './types/express/misc';
import AdzanService from '../services/AdzanService';
import puppeteer from "puppeteer";
import { Adzan } from '../models/Adzan';

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
]

async function getAll(req: IReq, res: IRes) {
  try {
    const { city } = req.query
    var tanggal = new Date()
    let datum = await AdzanService.getData(
      city as string,
      months[tanggal.getMonth()]+" "+tanggal.getFullYear()
    )
    if(datum.length <= 0){
      let data = await crawl(city as string)
      res.json(data);
    } else {
      res.json(datum);
    }
  } catch(error){
    console.log(error);
  }
}

async function crawl(city: string) {
  console.log("Opening the browser......");
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox'],
      defaultViewport: null,
    });
  const page = await browser.newPage();
  
  await page.goto("https://www.umroh.com/jadwal-sholat/${city}", {
    waitUntil: "domcontentloaded",
  });

  const data = await page.evaluate(() => {
    const trs = Array.from(document.querySelectorAll('tbody tr td'))
    return trs.map(tr => {
      return tr.innerHTML.trim();
    })
  });

  var datum: Adzan[] = [];
  var temp: string[] = []
  for(var i = 0; i < data.length-1;i++){
    if(temp.length < 7){
      temp.push(data[i])
    } else {
      let adzan = new Adzan()
      if(temp.length == 7){
        adzan.kota = city as string;
        adzan.tanggal = temp[0];
        adzan.imsyak = temp[1]
        adzan.subuh = temp[2]
        adzan.dzuhur = temp[3]
        adzan.ashar = temp[4]
        adzan.maghrib = temp[5]
        adzan.isya = temp[6]
        datum.push(adzan)
      }
      temp = [];
      temp.push(data[i])
    }
  }

  AdzanService.saveAll(datum)

  // Close the browser
  await browser.close();
  return datum
}


// **** Export default **** //

export default {
  getAll
} as const;

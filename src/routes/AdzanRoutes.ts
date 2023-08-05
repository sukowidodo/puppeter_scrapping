
import { IReq, IRes } from './types/express/misc';
import puppeteer from "puppeteer";


async function getAll(req: IReq, res: IRes) {
  try {
    console.log("Opening the browser......");
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
    });

    // Open a new page
    const page = await browser.newPage();

    await page.goto("https://www.umroh.com/jadwal-sholat/${req.city}", {
      waitUntil: "domcontentloaded",
    });

    const data = await page.evaluate(() => {
      const trs = Array.from(document.querySelectorAll('tbody tr td'))
      return trs.map(tr => {
        return tr.innerHTML.trim();
      })
    });

    var datum = [];
    var temp: string[] = []
    for(var i = 0; i < data.length-1;i++){
      if(temp.length < 7){
        temp.push(data[i])
      } else {
        datum.push(temp)
        temp = [];
        temp.push(data[i])
      }
    }

    // Close the browser
    await browser.close();
    return res.json(datum);
  } catch(e){
    console.log(e.message);
  }
}


// **** Export default **** //

export default {
  getAll
} as const;

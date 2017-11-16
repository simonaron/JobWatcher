
import * as Express from 'express';
import { HttpHelper } from './helpers/HttpHelper';
let config = require('../../config/user-config.json');
// let App = Express();

// App.get("/valami/:id", (req: Express.Request, res: Express.Response) => {
//     console.log("alma")
//     res.send('Szia!' + req.params.id);
// });

// App.listen(3000, () => {
//     console.log("listening on port 3000")
// });
async function main() {
// let kiscica = await HttpHelper.get(
//     'https://tcc-titansim.rnd.ki.sw.ericsson.se/job/SYSF_SFTF_DEV/api/json?tree=lastSuccessfulBuild[number]')
let kiscica = await HttpHelper.get(
    config.urls.openalm + 'trackers/30453/artifacts?limit=2&order=asc')

console.log(kiscica);
}

main();

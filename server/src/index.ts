
import * as Express from 'express';
import { HttpHelper } from './helpers/HttpHelper';
import { JenkinsHelper } from './helpers/JenkinsHelper';
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

let kiscica1 = await HttpHelper.get(
     config.urls.jenkins + 'job/SYSF_SFTF_DEV/api/json?tree=lastSuccessfulBuild[number]');
let kiscica2 = await HttpHelper.get(
    config.urls.openalm + 'trackers/30453/artifacts?limit=2&order=asc');
let builds = await JenkinsHelper.getBuildsForJob("ETC_TRAFF_IMS_GCHAT_CF_LOBBY");
let build2 = await JenkinsHelper.getChangesForBuild("ETC_TRAFF_IMS_GCHAT_CF_LOBBY", 42);
let decoratedbuild = await JenkinsHelper.addCommitsForBuild("ETC_TRAFF_IMS_GCHAT_CF_LOBBY", 42, builds);
console.log(decoratedbuild["ETC_TRAFF_IMS_GCHAT_CF_LOBBY"][42].commits);

}



//d();
main();

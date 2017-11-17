import * as Express from 'express';
import { HttpHelper } from './helpers/HttpHelper';
import { JenkinsHelper } from './helpers/JenkinsHelper';
import { OpenAlmHelper } from './helpers/OpenAlmHelper';
import { IBuild, IAuthor, IChange, IIncident, IJob} from '../../common/Interfaces';
let config = require('../../config/user-config.json');

let App = Express();

// class Author implements IAuthor {
//     name : string;
//     email : string;

//     constructor (name : string, email : string) {
//         this.name = name;
//         this.email = email;
//     }
// }



/*class Job implements IJob {
    constructor(name: string) {
        name = name;
        //this.url = "will do later";
    }

    name : string;
    url : string;

    builds : JSON[] = new Array();
    changes : JSON[];
    incidents : JSON[];

    async GetBuilds() {
        let data = await JenkinsHelper.getBuildsForJob(this.name);
        let parsedData = Object.keys(data[this.name]).map((key)=>{return {number: key, status: data[this.name][key].result}});
        
        var jsonData = JSON.stringify(parsedData);
        this.builds.push(JSON.parse(jsonData));

        console.log(this.builds);
        return data;
    }

    async GetChanges() {
        let build : any = this.builds;
        console.log(build[0][1]);
        
        //let data = await JenkinsHelper.getBuildsForJob(this.name);
    }*/


// }

App.get("/jobs/:titles", async (req: Express.Request, res: Express.Response) => {
    let titles = req.params.titles.split(',');

    
    let jobs = await titles.map((title: string) => {
                return {
                    name: title,
                    builds: new Array(),
                    url: ""
                }
            });

    for(let job of jobs) {
        let data = await JenkinsHelper.getBuildsForJob(job.name);
        job.builds = Object.keys(data[job.name]).map(
            (key)=>{
                return {
                    number: Number.parseInt(key), 
                    status: data[job.name][key].result,
                    incidents: [],
                    changes: [],
                    url: ""
                }
            }
        ).reverse().slice(0,5);
        
        for(let build of job.builds) {
            //console.log(await OpenAlmHelper.GetJobArtifacts(job.name))

            build.incidents = (await OpenAlmHelper.GetJobArtifacts(job.name)).filter((incident) => {
                console.log(incident);
                return (incident.buildNumbers.find((buildNumber: string) => { return buildNumber==build.number}) !== undefined)
            });

            //console.log(build);
        }
    }
    //console.log(jobs);
    res.send(JSON.stringify(jobs));
});

App.listen(3000, () => {
    console.log("listening on port 3000")
});

async function main() {

/*let kiscica1 = await HttpHelper.get(
     config.urls.jenkins + 'job/SYSF_SFTF_DEV/api/json?tree=lastSuccessfulBuild[number]');
let kiscica2 = await HttpHelper.get(
    config.urls.openalm + 'trackers/30453/artifacts?limit=2&order=asc');
let builds = await JenkinsHelper.getBuildsForJob("ETC_TRAFF_IMS_GCHAT_CF_LOBBY");
let build2 = await JenkinsHelper.getChangesForBuild("ETC_TRAFF_IMS_GCHAT_CF_LOBBY", 42);
let decoratedbuild = await JenkinsHelper.addCommitsForBuild("ETC_TRAFF_IMS_GCHAT_CF_LOBBY", 42, builds);
console.log(decoratedbuild["ETC_TRAFF_IMS_GCHAT_CF_LOBBY"][42].commits);*/

}



//d();
//main();

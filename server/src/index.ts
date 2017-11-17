import * as Express from 'express';
import { HttpHelper } from './helpers/HttpHelper';
import { JenkinsHelper } from './helpers/JenkinsHelper';
import { OpenAlmHelper } from './helpers/OpenAlmHelper';
import { IBuild, IAuthor, IChange, IIncident, IJob} from '../../common/Interfaces';
let config = require('../../config/user-config.json');
var cors = require('cors');

let App = Express();

App.use(cors())
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
        
        var start = new Date().getTime();
        let incidents = await OpenAlmHelper.GetJobArtifacts(job.name);
        // Remember when we finished
        var end = new Date().getTime();

        // Now calculate and output the difference    
        console.log(end - start);

        for(let build of job.builds) {
            //console.log(await OpenAlmHelper.GetJobArtifacts(job.name))
            build.incidents = incidents.filter((incident) => {
                //console.log(incident);
                return (incident.buildNumbers.find((buildNumber: string) => { return buildNumber==build.number}) !== undefined)
            });

            //console.log(build);
        }
    }
    //console.log(jobs);
    res.send(JSON.stringify(jobs));
});

App.listen(3001, () => {
    console.log("listening on port 3001")
});


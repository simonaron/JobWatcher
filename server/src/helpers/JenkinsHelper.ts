import { HttpHelper } from './HttpHelper';
let config = require('../../../config/user-config.json');


export class JenkinsHelper {

    static async getBuildsForJob (jobname : string) : Promise<any> {
    // returns build numbers and results for jobname
        let data : any  = {};
        let builddata : any = {};
        let b = await HttpHelper.get(
            config.urls.jenkins + 'job/' + jobname + '/api/json?tree=builds[number,result]');
        for (let elem in b.builds){
            builddata[b.builds[elem].number] = { "result": b.builds[elem].result };
        }
        data[jobname] = builddata;
        return data;
    }

    static async getChangesForBuild(jobname: string, buildnumber : number ): Promise<any> {
    // returns commits for job and buildnumber
        let data : any = {};
        let b = await HttpHelper.get(
            config.urls.jenkins + 'job/' + jobname + "/" + buildnumber + '/api/json');
        let commits = [];
        for (let elem in b.changeSet.items){
            let commit = {"comment": b.changeSet.items[elem].comment,
                          "hash" :   b.changeSet.items[elem].id,
                          "author" : b.changeSet.items[elem].author.fullName,
                          "email" : b.changeSet.items[elem].authorEmail
            };
            this.parseCommitForOpenalm(b.changeSet.items[elem].comment);
            commits.push(commit);
        }
        data.commits = commits;
                 
        return data;
    } 

    static parseCommitForOpenalm (commit : string) : string {
        var re = /^\[.+(#|-)(\d{3,})\]/;
        let retvalue = re.exec(commit)[2] || "";
        return retvalue ;
    }

    static async addCommitsForBuild(jobname: string, buildnumber : number, builddata : any = {} ): Promise<any> {
    // returns the dictionary builddata with the commits for job and buildnumber
        let data : any = builddata;
        let b = await HttpHelper.get(
            config.urls.jenkins + 'job/' + jobname + "/" + buildnumber + '/api/json');
        let commits = [];
        for (let elem in b.changeSet.items){
            let commit = {"comment": b.changeSet.items[elem].comment,
                          "hash" :   b.changeSet.items[elem].id,
                          "author" : b.changeSet.items[elem].author.fullName,
                          "email" : b.changeSet.items[elem].authorEmail,
                          "openalm" : this.parseCommitForOpenalm(b.changeSet.items[elem].comment)
            };
       
            commits.push(commit);
        }
        data[jobname][buildnumber]["commits"] = commits;
                 
        return data;
    } 
}
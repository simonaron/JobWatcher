import { HttpHelper } from './HttpHelper';
let config = require('../../../config/user-config.json');


export class JenkinsHelper {

    static async getBuildsForJob (jobname : string) : Promise<any> {
        let data : any  = {};
        let builddata : any = {};
        let b = await HttpHelper.get(
            config.urls.jenkins + 'job/' + jobname + '/api/json?tree=builds[number,result,number]');
        for (let elem in b.builds){
            builddata[b.builds[elem].number] = { "result": b.builds[elem].result };
        }
        data[jobname] = builddata;
        return data;
    }

    static async getChangesForBuild(jobname: string, buildnumber : number ): Promise<any> {
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
            commits.push(commit);
        }
            // console.log(b.changeSet.items[elem].comment);
            // console.log(b.changeSet.items[elem].id);
            // console.log(b.changeSet.items[elem].author.fullName);
            // console.log(b.changeSet.items[elem].authorEmail);
        data.commits = commits;
                 
        return data;
    } 

    static parseCommitForOpenalm (commit : string) : string {
        let retvalue : string = "";
        return 
    }

    static async addCommitsForBuild(jobname: string, buildnumber : number, builddata : any = {} ): Promise<any> {
        let data : any = builddata;
        let b = await HttpHelper.get(
            config.urls.jenkins + 'job/' + jobname + "/" + buildnumber + '/api/json');
        let commits = [];
        for (let elem in b.changeSet.items){
            let commit = {"comment": b.changeSet.items[elem].comment,
                          "hash" :   b.changeSet.items[elem].id,
                          "author" : b.changeSet.items[elem].author.fullName,
                          "email" : b.changeSet.items[elem].authorEmail
            };
            commits.push(commit);
        }
            // console.log(b.changeSet.items[elem].comment);
            // console.log(b.changeSet.items[elem].id);
            // console.log(b.changeSet.items[elem].author.fullName);
            // console.log(b.changeSet.items[elem].authorEmail);
        data[jobname][buildnumber]["commits"] = commits;
                 
        return data;
    } 
}
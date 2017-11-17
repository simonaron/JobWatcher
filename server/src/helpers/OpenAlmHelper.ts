import * as request from 'request';
import { HttpHelper } from '../helpers/HttpHelper';

let config = require('../../../config/user-config.json');

let incidentTrackerId : number = 30453;
let incidentVolume : number = 100;

export class OpenAlmHelper {
    

    /*static async GetTrackerDefinition(id : number) {
        let result = await HttpHelper.get(
            config.urls.openalm + 'trackers/' + id);
        return result;
    }*/

    static async GetJobArtifacts(jobName : string) : Promise<any[]>
    {
        var artifactData : any[] = new Array();

        let result = await HttpHelper.get(
            config.urls.openalm + 'trackers/' +incidentTrackerId + '/artifacts?limit=' + incidentVolume + '&offset=0&order=desc');

        //console.log(result[0]);
        
        var currentTitle : string;

        for (var _i = 0; _i < result.length; _i++) 
        {
            currentTitle = result[_i].title;

            if (currentTitle.indexOf(jobName) >= 0)
            {
                artifactData.push(OpenAlmHelper.ProcessArtifact(result[_i]));
                //console.log(OpenAlmHelper.ProcessArtifact(result[_i]));
            }
        }

        return artifactData;
    }

    static async GetTrackerArtifacts(id : number, limit : number = 100, offset : number = 0, query : string = "") 
    {
        let result = await HttpHelper.get(
            config.urls.openalm + 'trackers/' + id + '/artifacts?limit=' + limit + '&offset=' + offset + '&order=desc');
        return result;
    }

    static async GetArtifactData(id : number)
    {
        let result = await HttpHelper.get(
            config.urls.openalm + 'artifacts/' + id);
        
        console.log (result);

        return OpenAlmHelper.ProcessArtifact(result);
    }

    static ProcessArtifact(data : any) 
    {
        var artifactData : any = {};

        artifactData.title = data.title;
        artifactData.status = data.status;
        artifactData.submitted_on = data.submitted_on;
        artifactData.submitter= data.submitted_by_user.real_name;
        artifactData.buildNumbers = OpenAlmHelper.GetBuildNumbers(artifactData.title);
        artifactData.url = 'https://openalm.lmera.ericsson.se/plugins/tracker/?aid=' + data.id;

        return artifactData;
    }

    static GetBuildNumbers (title : string) 
    {
        var isBuildNumber : boolean = false;
        var buildNumbers : string = "";

        for (var i = 0; i < title.length; i++)
        {
            if (!isBuildNumber && (title[i] == '/' || title[i] == '#')) 
            {
                isBuildNumber = true;
            }
            else if (isBuildNumber)
            {
                //console.log(title[i]);
                if (OpenAlmHelper.IsNumber(title[i]) == 1) 
                {
                    console.log(title[i]);
                    buildNumbers += title[i];
                }
                else 
                {
                    if (title[i] == '/' || title[i] == '#' || title[i] == "-")
                        buildNumbers += "||";
                    else
                        isBuildNumber = false;
                }
            }
        }

        var numbers = buildNumbers.split("||");
        var numbers2 : number[] = new Array();

        if (numbers.length == 2)
        {
            var num1 : number = parseInt(numbers[0]);
            var num2 : number = parseInt(numbers[1]);

            for (var i : number = num1; i <= num2; i++)
            {
                numbers2.push(i);
            }

            return numbers2;
        } else {
            return numbers;
        }
    }

    static IsNumber (character : string) 
    {
        var res = parseInt(character, 10);
        return isNaN(res) ? null : 1;
    }
}

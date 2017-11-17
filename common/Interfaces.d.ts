export interface IJob {
    name: string;
    builds: IBuild[];
    url: string;
}

export interface IBuild {
    number: number;
    status: string;
    incidents: IIncident[];
    changes: IChange[];
    url: string;
}

export interface IIncident {
    title: string;
    artifactId: number;
    url: string;
    author: IAuthor;
}

export interface IChange{
    commitMessage: string;
    id : number;
    author: string;
    email: IAuthor;
}

export interface IAuthor{
    name: string;
    email: string;
}
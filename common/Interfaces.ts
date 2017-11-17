interface IJob {
    name: string;
    builds: IBuild[];
    url: string;
}

interface IBuild {
    number: number;
    status: string;
    incidents: IIncident[];
    changes: IChange[];
    url: string;
}

interface IIncident {
    title: string;
    artifactId: number;
    url: string;
    author: IAuthor;
}

interface IChange{
    commitMessage: string;
    url: string;
    author: IAuthor;
}

interface IAuthor{
    name: string;
    email: string;
}
import * as Express from 'express'

let App = Express();

App.get("/valami/:id", (req: Express.Request, res: Express.Response) => {
    console.log("alma")
    res.send('Szia!' + req.params.id);
});

App.listen(3000, () => {
    console.log("listening on port 3000")
});


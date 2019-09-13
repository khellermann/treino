import {Router} from 'express';
const routes = new Router();

routes.get("/teste", (req,res)=>{
    return res.json({msg: "Apneas um teste"})
})

export default routes;
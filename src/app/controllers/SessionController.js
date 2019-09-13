import User from '../models/User';
import jwt from 'jsonwebtoken';
import authConfig from '../../config/auth';

class SessionController{
    async store(req, res){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.status(401).json({error: "Usuário não existe"})
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({error: "Senha incorreta"})
        }
            const {id, name, email:userEmail} = user;
        try{
            return res.json({
                user:{
                    id, name, email
                }, token: jwt.sign({id}, authConfig.secret, {expiresIn: authConfig.expiresIn} )
            })
        }catch(err){
            return res.status(401).json({error: "Não foi possivel gerar o token"})
        }

    }


}
export default new SessionController();
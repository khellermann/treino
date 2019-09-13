import User from '../models/User';
import * as Yup from 'yup';
class UserController{
    async store(req, res){

        const schema = Yup.object().shape({
            name:Yup.string().required(),
            email:Yup.string().email().required(),
            password:Yup.string().required().min(6) 
        });

        if(!(await schema.isValid(req.body))){
            return res.status(401).json({error: "Favor conferir as informações"});            
        }
        const user = await User.findOne({where: {email:req.body.email}});
        if(user){
            return res.status(401).json({error: "Usuário já cadastrado"});
        }
        const {name, email} = await User.create(req.body);

            return res.json({msg: "Cadastrado com sucesso", email})

    }

    async update(req, res){
        const {oldPassword, email} = req.body;
        
        const user = await User.findByPk(req.userId);
        if(!user){
            return res.status(401).json({error: "Usuário sem permissão"});
        }

        if(email && email !== user.email){
            const userExist = await User.findOne({where:{email}})
            if(userExist){
                return res.status(401).json({error: "E-mail já cadastrado"});
            }
            
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({ error: 'Senha incorreta' });
        }

        const {id, name, email:userEmail} = await user.update(req.body);


        return res.json({ id, name, email:userEmail})
    }
    
}

export default new UserController();
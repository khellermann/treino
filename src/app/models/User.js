import Sequelize, {Model} from 'sequelize'
import bcryptjs from 'bcryptjs';
class User extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            provider: Sequelize.BOOLEAN
        },{
            sequelize
        })

        this.addHook("beforeSave", async user=>{
            user.password_hash = await bcryptjs.hash(user.password, 8); 
        });
    }

    checkPassword(password){
        if(password){
            return bcryptjs.compare(password, this.password_hash);
        }
    }


}

export default User;
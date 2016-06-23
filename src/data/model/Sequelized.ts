import Sequelize = require("sequelize");
// let config = require('../config.json');
// import * as config from "../config.json";
/*interface dbConfig {
	username: string,
    password: string,
    database: string,
    option: {
        storage?: string,
        logging?: boolean,
        dialect?: string,
        pool?: {
			 min?: number, 
			 max?: number 
		}
    }
}*/
export default class Sequelized{
	private static _instance:Sequelized = new Sequelized();
	sequelize:Sequelize.Sequelize;
	dataTypes:Sequelize.DataTypes;
	constructor() {
        if(Sequelized._instance){
            console.log("Sequelize实例已存在");
        }else{
			this.sequelize = new Sequelize("test", "", "", {
				storage: "./test.db",
				// logging: true,
				dialect: "sqlite"
			});
			this.sequelize.query('select * from sqlite_master').spread(function(r:any,m:any){
				console.log(r);console.log(m);
			});
			console.log();
			Sequelized._instance = this;
			console.log("Sequelize实例已创建");
		}
    }
	static getIntance():Sequelized{
		return Sequelized._instance;
	}
}

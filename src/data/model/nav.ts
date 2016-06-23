// import Sequelized from './Sequelized';
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
// let sequelize=new Sequlize(''cfg.database'',cfg.username,cfg.password,cfg.option);
// var db=global.sequelize;
// var Role = require('./role');
import Sequelize = require("sequelize");
var sequelize = new Sequelize("test", "", "", {
				storage: "./test.db",
				logging: false,
				dialect: "sqlite"
});
var _sequelize = sequelize.define('nav', {
	code: { type: Sequelize.STRING, primaryKey: true, field: 'fcode' },
	/* nav的名称 */
	name: { type: Sequelize.STRING, allowNull: false, field: 'fname' },
	/* nav对应的url路径 */
	url: { type: Sequelize.STRING, field: 'furl' },
	/*在导航中的显示顺序*/
	showOrder: { type: Sequelize.INTEGER, field: 'fshoworder' },
	/*上级导航编码*/
	parent: { type: Sequelize.STRING, field: 'fpath' }
}, {
		// tableName:sysConfig.db.table_prefix+'_navs',
		/* 自动生成的createdAt使用下划线连接created_at,因为postgresql不支持字段名大写 */
		underscored: true
	});
sequelize.sync();
export default _sequelize;

import Nav from '../model/nav';

export class NavsService {
	/*
	 * 获得所有导航节点
	 */
	findAll(srcOptions?: any): Promise<any[]>{
		var _default = {
			// include: [{ model: Nav, as: 'father' }, { model: Nav, as: 'childs' }]
		};
		var options = Object.assign(_default, srcOptions);
		return Nav.findAll(options).then(navs=>navs).catch(err=>err);
	}
}
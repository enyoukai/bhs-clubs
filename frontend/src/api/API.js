import REST from './REST';

class API 
{
	static async getClubs() {
		return REST.GET(`/clubs/`);
	}
	
	static async searchClubs(search) {
		return REST.GET(`/clubs/?name=${search}`);
	}
}

export default API;
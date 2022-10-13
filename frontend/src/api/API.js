import REST from './REST';

class API 
{
	static async getClubs() {
		return REST.GET(`/clubs/`);
	}
	
	static async searchClubs(search) {
		return REST.GET(`/clubs/?name=${search}`);
	}

	static async login(email, password)
	{
		return REST.POST('/auth/login', {email: email, password: password});
	}

	static async register(email, password)
	{
		console.log('here');
		return REST.POST('/auth/register', {email: email, password: password});
	}
}

export default API;
import REST from './REST';

class API 
{
	static async getClubs() {
		return REST.GET(`/clubs/`);
	}
	
	static async searchClubs(search) {
		return REST.GET(`/clubs/?name=${search}`);
	}
	
	static async createClub(club)
	{
		return REST.POST('/clubs', {name: club.name, description: club.description, location: club.location, date: club.date, time: club.time, advisor: club.advisor});
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

class Club
{
	constructor(name, description, location, date, time, advisor)
	{
		this.name = name;
		this.description = description;
		this.location = location;
		this.date = date;
		this.time = time;
		this.advisor = advisor;
	}
}

export { Club };
export default API;
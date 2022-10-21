import REST from './REST';
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'

class API 
{
	static getClubs() {
		return REST.GET(`/clubs/`);
	}
	
	static searchClubs(search) {
		return REST.GET(`/clubs/?name=${search}`);
	}
	
	static async createClub(club)
	{
		const token = await auth.currentUser.getIdToken()
		return REST.POST('/clubs', {name: club.name, description: club.description, location: club.location, date: club.date, time: club.time, advisor: club.advisor}, token);
	}

	static login(email, password)
	{
		return signInWithEmailAndPassword(auth, email, password);
	}

	static register(email, password)
	{
		return createUserWithEmailAndPassword(auth, email, password);
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
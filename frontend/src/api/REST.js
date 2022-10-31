class REST {
	static GET(endpoint)
	{
  		return fetch(endpoint).then(res => res.json());
	}

	static POST(endpoint, body, token)
	{
		return fetch(endpoint, {method: 'POST', headers: {'Content-Type': 'application/json', 'authorization': `Bearer ${token}`}, body: JSON.stringify(body)}).then(res => res.json());
	}

	static PUT(endpoint, body, token)
	{
		return fetch(endpoint, {method: 'PUT', headers: {'Content-Type': 'application/json', 'authorization': `Bearer ${token}`}, body: JSON.stringify(body)});
	}
}

export default REST;
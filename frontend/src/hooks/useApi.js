import axios from 'axios';
import { useState, useEffect } from 'react';

const methods = {GET: 'GET', POST: 'POST', PUT: 'PUT', PATCH: 'PATCH', DELETE: 'DELETE'};

export default function useApi(endpoint, method=methods.GET, token=null)
{	
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);

	const config = token ? {headers: {Authorization: `Bearer ${token}`}} : {};

	useEffect(() => {
		setLoading(true);

		switch(method) {
			case methods.GET:
				axios.get(endpoint, config).then(res => setData(res.data)).then(setLoading(false));
				break;
			case methods.POST:
				axios.post(endpoint, config).then(res => setData(res.data)).then(setLoading(false));
				break;
			case methods.PUT:
				axios.put(endpoint, config).then(res => setData(res.data)).then(setLoading(false));
				break;
			case methods.PATCH:
				axios.patch(endpoint, config).then(res => setData(res.data)).then(setLoading(false));
				break;
			case methods.DELETE:
				axios.delete(endpoint, config).then(res => setData(res.data)).then(setLoading(false));
				break;
		}

	}, [endpoint, token, method])

	return {data, loading};
}

export {methods};
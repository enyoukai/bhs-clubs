import axios from 'axios';
import { useState, useEffect } from 'react';

const methods = {GET: 'get', POST: 'post', PUT: 'put', PATCH: 'patch', DELETE: 'delete'};

export default function useApi(endpoint, method=methods.GET, token=null)
{	
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [onComplete, setOnComplete] = useState(0);

	const config = token ? {headers: {Authorization: `Bearer ${token}`}} : {};

	async function dispatch({populate, body={}, params=''})
	{
		setLoading(true);
		try
		{
			const res = await axios({url: endpoint + params, method: method, data: body, ...config});
			
			if (populate)
			{
				populate(res.data);
			}
			setOnComplete(prev => prev + 1);
			setLoading(false);
		}
		catch (error) {
			setError(error);
		}

	}
	
	return {loading, error, onComplete, dispatch};
}

export {methods};
import axios from 'axios';
import { useState, useEffect } from 'react';

const methods = {GET: 'get', POST: 'post', PUT: 'put', PATCH: 'patch', DELETE: 'delete'};

export default function useApi(endpoint, method=methods.GET, token=null)
{	
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [onComplete, setOnComplete] = useState(0);
	const [data, setData] = useState();

	// const config = token ? {Authorization: `Bearer ${token}`} : {};

	async function dispatch({populate=null, body={}, params='', headers=null})
	{
		const mergedHeaders = token ? {...headers, Authorization: `Bearer ${token}`} : headers;
		setLoading(true);
		try
		{
			const res = await axios({url: endpoint + params, method: method, data: body, headers: mergedHeaders});
			
			if (populate)
			{
				populate(res.data);
				setData(res.data);
				setError(null);
			}
		}
		catch (error) {
			setError(error);
		}
		setLoading(false);
		setOnComplete(prev => prev + 1);
		
		return data;
	}
	
	return {loading, error, onComplete, dispatch};
}

export {methods};
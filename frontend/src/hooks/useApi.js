import axios from 'axios';
import { useState, useEffect } from 'react';

const methods = {GET: 'get', POST: 'post', PUT: 'put', PATCH: 'patch', DELETE: 'delete'};

export default function useApi()
{	
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();

	const config = token ? {headers: {Authorization: `Bearer ${token}`}} : {};

	async function invoke(endpoint, method=methods.GET, token=null, body)
	{
		setLoading(true);
		try
		{
			const res = await axios({url: endpoint, method: method, ...body, ...config});
			setData(res.data);
			setLoading(false);
		}
		catch (error) {
			setError(error);
		}

	}
	// useEffect(() => {
	// 	const fetchAxios = async () => {
	// 		setLoading(true);
	// 		try
	// 		{
	// 			const res = await axios({url: endpoint, method: method, ...body, ...config});
	// 			setData(res.data);
	// 			setLoading(false);
	// 		}
	// 		catch (error) {
	// 			setError(error);
	// 		}

	// 	}
	// 	fetchAxios();
	// }
	// , [endpoint, token, method]);

	return {data, loading, error, invoke};
}

export {methods};
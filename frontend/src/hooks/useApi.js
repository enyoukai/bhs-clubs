import axios from 'axios';
import { useState, useEffect } from 'react';

const methods = {GET: 'get', POST: 'post', PUT: 'put', PATCH: 'patch', DELETE: 'delete'};

export default function useApi(endpoint, method=methods.GET, token=null)
{	
	const [data, setData] = useState();
	const [loading, setLoading] = useState(true);

	const config = token ? {headers: {Authorization: `Bearer ${token}`}} : {};

	useEffect(() => {
		const fetchAxios = async () => {
			setLoading(true);
			const res = await axios({url: endpoint, method: method, ...config});
			setData(res.data);
			setLoading(false);
		}
		fetchAxios();
	}
	, [endpoint, token, method]);

	return [data, loading];
}

export {methods};
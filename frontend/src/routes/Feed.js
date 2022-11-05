import React, {useState, useEffect} from 'react';
import useApi from '../hooks/useApi';
import {useAuth} from '../contexts/AuthContext';

export default function Feed()
{
	const getFeed = useApi('/feed');
	const [feed, setFeed] = useState();

	useEffect(() => {getFeed.dispatch({populate: setFeed})}, []);

	return (
		<div>
			<div>Recent Club Activities...</div>
			{!getFeed.loading && feed.map(post => <Post post={post}/>)}
		</div>
	)
}

function Post(props)
{
	console.log(props);
	return (
		<div>
			<div>{props.post.title} made by {props.post.author}</div>
			<div>{props.post.body}</div>
		</div>
	)
}
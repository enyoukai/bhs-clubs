import React, {useState, useEffect} from 'react';
import useApi from '../hooks/useApi';
import {useAuth} from '../contexts/AuthContext';

import './Feed.scss'
export default function Feed()
{
	const getFeed = useApi('/feed');
	const [feed, setFeed] = useState();

	useEffect(() => {getFeed.dispatch({populate: setFeed})}, []);

	return (
		<div className="feed">
			<div className="feed__title">Recent Club Activities...</div>
			{!getFeed.loading && feed.map(post => <Post post={post}/>)}
		</div>
	)
}

function Post(props)
{
	return (
		<div className="feed__post">
			<div><b>{props.post.title}</b> made by <b>{props.post.author}</b></div>
			<div>{props.post.body}</div>
		</div>
	)
}
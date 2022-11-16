import React, {useState, useEffect} from 'react';
import useApi from '../../hooks/useApi';
import {Link} from 'react-router-dom';

import './Feed.scss'
export default function Feed()
{
	const getFeed = useApi('/feed');
	const [feed, setFeed] = useState();

	useEffect(() => {getFeed.dispatch({populate: setFeed})}, []);

	return (
		<div className="feed">
			<div className="feed__title">Recent Club Activities...</div>
			<Link to='newpost'>Add new post</Link>
			{!getFeed.loading && feed.map(post => <Post key={post.id} post={post}/>)}
		</div>
	)
}

function Post(props)
{
	const post = props.post;
	console.log(post);
	return (
		<div className="feed__post">
			<div><b>{post.title}</b> made by <b>{post.author}</b> for club <b>{post.club ? post.club.name : "DELETED CLUB"}</b></div>
			{post.file && <img src={`/images/${post.file}`}/>}
			<div>{props.post.body}</div>
		</div>
	)
}
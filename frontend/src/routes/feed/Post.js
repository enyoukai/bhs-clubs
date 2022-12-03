import axios from 'axios';
import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';

export default function PostPage()
{
	const postId = useParams().id;
	const [post, setPost] = useState();
	const [postLoading, setPostLoading] = useState(true);

	useEffect(() => {
		axios.get(`/feed/${postId}`).then(res => setPost(res.data)).then(() => setPostLoading(false));
	}, [postId]);

	return (
		<div className='p-10'>
		{!postLoading &&
			<div>
				<div className='text-4xl text-center'>{post.title}</div>
				<div className='mt-10 text-2xl'>{post.body}</div>
				{post.file && <img width={'300rem'} src={`/images/${post.file}`}/>}
			</div>
		}
		</div>
	)
}

import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
	const postId = useParams().id;
	const [post, setPost] = useState();
	const [postLoading, setPostLoading] = useState(true);

	useEffect(() => {
		axios.get(`/feed/${postId}`).then(res => setPost(res.data)).then(() => setPostLoading(false));
	}, [postId]);

	return (
		<div className='py-10 px-24'>
			{!postLoading &&
				<div>
					<div className='text-4xl text-center mb-10'>{post.title} by {post.club.name}</div>
					<div className='mt-10 text-2xl mb-10'>{post.body}</div>
					{post.file && <img className='mb-10 mx-auto' width={'300rem'} alt="post" src={`/images/${post.file}`} />}
				</div>
			}
		</div>
	)
}

import axios from "axios";
import { useState, useEffect } from "react"
import {useAuth} from 'contexts/AuthContext';
import Loading from "components/Loading";

export default function NotificationsPage() {
	const {user, authLoading} = useAuth();
	const [notifications, setNotifications] = useState();
	const [notifsLoading, setNotifsLoading] = useState(true);

	axios.get(`/account/${user.id}/unreadCount`).then(res => console.log(res.data));

	useEffect(() => {
		axios.get(`/account/${user.uid}/unreadPosts`)
			.then(res => setNotifications(res.data))
			.then(() => setNotifsLoading(false))
			.then(() => axios.delete(`/account/${user.uid}/unreadPosts`));
	}, [user.uid]);

	return (
		<div>
			<div>Unread</div>
			{!notifsLoading ? <NotificationsList notifications={notifications}/>
				: <Loading/>
			}
		</div>
	)
}

function NotificationsList(props) {
	if (props.notifications.length === 0) {
		return (
			<div>All up to date</div>
		)
	}

	return (
		<ul>
			{props.notifications.map((post, idx) => <li key={idx}>{post.title} - {post.body}</li>)}
		</ul>
	)

}
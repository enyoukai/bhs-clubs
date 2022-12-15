import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Calendar() {
	return (
		<div className="p-10 text-center">
			<h1 className="text-4xl">Calendar</h1>
			<CalendarUI />
		</div>
	)
}

function CalendarUI() {
	return (
		<table className="mt-10 border w-full table-fixed">
			<thead>
				<tr>
					<th>Sunday</th>
					<th>Monday</th>
					<th>Tuesday</th>
					<th>Wednesday</th>
					<th>Thursday</th>
					<th>Friday</th>
					<th>Saturday</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<CalendarColumns />
				</tr>
			</tbody>
		</table>
	)
}

function CalendarColumns() {
	const [dayMap, setDayMap] = useState();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetch() {
			const res = await axios.get('/clubs');
			const clubs = res.data;

			const dayMapNext = Array.apply(null, Array(7)).map(() => []);

			clubs.forEach((club) => {
				club.dates.forEach(date => {
					dayMapNext[date].push(club);
				})
			});

			setDayMap(dayMapNext);
			setLoading(false);
		}
		fetch();
	}, []);

	return (
		<>
			{
				!loading && dayMap.map((dayCol, idx) => <DayColumn key={idx} clubs={dayCol} />)
			}

		</>
	)
}

function DayColumn(props) {
	// FIX THIS MAKE THIS A LEGIT THING LATER PLEASE!!!!!
	const sortedClubs = useMemo(() =>
		props.clubs.sort((clubA, clubB) => clubA.time.localeCompare(clubB.time)),
		[props.clubs]);

	return (
		<td className="align-baseline">
			<ul>
				{
					sortedClubs.map((club) => <ClubTime key={club.id} club={club} />)
				}
			</ul>
		</td>
	)
}

function ClubTime(props) {
	return (
		<li>
			<Link to={`/club/${props.club.id}`}>
				<div className='border'>
					<div>{props.club.time}</div>
					<div>{props.club.name}</div>
				</div>
			</Link>
		</li>
	)
}
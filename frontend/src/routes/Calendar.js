export default function Calendar()
{
	var date = new Date();
	console.log(date.getDate());
	console.log(date.getDay());
	console.log(new Date(date.getFullYear(), date.getMonth(), 1));
	return (
		<div className="p-10 text-center">
			<h1 className="text-4xl">Calendar</h1>
			<CalendarUI/>
		</div>
	)
}

function CalendarUI()
{
	return (
		<table className="mt-10 py-10 border w-full mb-0">
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
					<DayColumn clubs={['a', 'b']}/>
					<DayColumn clubs={['a', 'b']}/>
					<DayColumn clubs={['a', 'b']}/>
					<DayColumn clubs={['a', 'b']}/>
					<DayColumn clubs={['a', 'b']}/>
				</tr>
			</tbody>
		</table>
	)
}

function DayColumn(props)
{
	console.log(props.clubs);
	return (
		<td>
			<ul>
				{
					props.clubs.map((club) => <li>{club}</li>)
				}	
			</ul>
		</td>
	)

}
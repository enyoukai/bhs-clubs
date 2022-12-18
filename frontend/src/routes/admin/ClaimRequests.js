import axios from "axios";
import { useState, useEffect, useMemo } from "react";

export default function ClaimRequestsPage() {
	const [clubs, setClubs] = useState();
	const [clubsLoading, setClubsLoading] = useState(true);

	useEffect(() => {
		axios.get('/admin/clubs').then(res => setClubs(res.data)).then(() => setClubsLoading(false));
	}, []);

	const claims = useMemo(() => {
		if (clubsLoading) return;

		return clubs.filter((club) => club.claimRequests.length > 0);
	}, [clubs]);

	console.log(claims);

	return (
		<>
			{!clubsLoading && 
			<div>
				{claims.map((claim) => {
					return (
						<div>
							<div>{claim.name}</div>
							{claim.claimRequests.map((request) => <div>
								<div>{request.user}</div>
								<img className='w-40' src={'/images/' + request.verification}/>
							</div>)}
						</div>
					)
				})}
			</div>
			}
		</>
	)
}
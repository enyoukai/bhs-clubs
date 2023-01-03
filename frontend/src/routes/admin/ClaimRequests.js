import axios from "axios";
import { useState, useEffect, useMemo } from "react";

export default function ClaimRequestsPage() {
	const [claims, setClaims] = useState();
	const [claimsLoading, setClaimsLoading] = useState(true);

	useEffect(() => {
		axios.get('/admin/claims').then(res => setClaims(res.data)).then(() => setClaimsLoading(false));
	}, []);

	console.log(claims);

	return (
		<>
			{!claimsLoading &&
				<div>
					{
						claims.map((claim) => <div>{claim.club}</div>)
					}
				</div>
			}
		</>
	)
}
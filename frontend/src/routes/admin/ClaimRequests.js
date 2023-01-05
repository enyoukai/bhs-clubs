import axios from "axios";
import { useState, useEffect, useMemo } from "react";

export default function ClaimRequestsPage() {
	const [claims, setClaims] = useState();
	const [claimsLoading, setClaimsLoading] = useState(true);

	useEffect(() => {
		axios.get('/admin/claims').then(res => setClaims(res.data)).then(() => setClaimsLoading(false));
	}, []);

	function approveClaim(claimId)
	{
		return () => axios.put('/admin/claims/' + claimId, {approved: true});
	}

	function denyClaim(claimId)
	{
		return () => axios.put('/admin/claims/' + claimId, {approved: false});
	}

	return (
		<>
			{!claimsLoading &&
				<div>
					{
						claims.map((claim) => 
						<div key={claim.id}>
							<div>Claim for: {claim.club.name}</div>
							<div>Clame made by: {claim.author.username}</div>
							<img width={"300rem"} src={"/images/" + claim.verificationURL}/>
							<button onClick={approveClaim(claim.id)}>Approve Claim</button>
							<button onClick={denyClaim(claim.id)}>Deny Claim</button>
						</div>)
					}
				</div>
			}
		</>
	)
}
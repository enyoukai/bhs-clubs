import axios from "axios";
import { useState, useEffect, useMemo } from "react";

export default function ClaimRequestsPage() {
	const [claims, setClaims] = useState();
	const [claimsLoading, setClaimsLoading] = useState(true);

	useEffect(() => {
		axios.get('/admin/claims').then(res => setClaims(res.data)).then(() => setClaimsLoading(false));
	}, []);

	function removeClaim(claimId) {
		setClaims(prevClaims => {
			return prevClaims.filter(claim => claim.id !== claimId)
		});
	}

	function approveClaim(claimId) {
		return () => axios.put('/admin/claims/' + claimId, { approved: true }).then(removeClaim(claimId));
	}

	function denyClaim(claimId) {
		return () => axios.put('/admin/claims/' + claimId, { approved: false }).then(removeClaim(claimId));
	}

	return (
		<>
			{!claimsLoading &&
				<div>
					{
						claims.length > 0 ? claims.map((claim) =>
							<div key={claim.id}>
								<div>Claim for: {claim.club.name}</div>
								<div>Clame made by: {claim.author.username}</div>
								<img width={"300rem"} src={"/images/" + claim.verificationURL} />
								<button className="block text-green-500" onClick={approveClaim(claim.id)}>Approve Claim</button>
								<button className="block text-red-500" onClick={denyClaim(claim.id)}>Deny Claim</button>
							</div>) : <div>No Claims Currently</div>
					}
				</div>
			}
		</>
	)
}
import axios from "axios";
import { useState, useEffect } from "react";

export default function ClaimRequestsPage() {
	const [claims, setClaims] = useState();
	const [claimsLoading, setClaimsLoading] = useState(true);

	useEffect(() => {
		axios.get('/admin/claims').then(res => setClaims(res.data));
	}, []);

	
}
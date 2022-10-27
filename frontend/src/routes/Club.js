import API from "../api/API";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import './Club.scss';

export default function Club()
{
    // make a hook later
    const clubId = useParams().id;
	const [club, setClub] = useState(null);

	useEffect(() => {
		async function getClub() {
			setClub(await API.getClubById(clubId));
		}

		getClub();
	}, [clubId]);

    return (
        <div>
            { club ? <ClubInfo club={club}/> : <Loading/>}
        </div>
    )
}

function ClubInfo(props)
{
	const club = props.club;

    return (
		<div className="club-info">
			<div>{club.name}</div>
			<div>{club.description}</div>
			<div>{club.location}</div>
			<div>{club.date}</div>
			<div>{club.time}</div>
			<div>{club.advisor}</div>

			<div></div>
		</div>
    )
}

function Loading()
{
	return (
		<div>
			Fetching from server...
		</div>
	)
}
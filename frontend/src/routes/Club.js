import useApi from "../hooks/useApi";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

import Loading from '../components/Loading';
import './Club.scss';

export default function Club()
{
    const clubID = useParams().id;
	const [club, setClub] = useState();
	const getClub = useApi('/clubs');

	useEffect(() => {
		getClub.dispatch({params: `/${clubID}`, populate: setClub});
	}, [clubID]);

    return (
		<>
            {getClub.loading ? <Loading/> :<ClubInfo club={club}/>}
		</>
	)
}

function ClubInfo(props)
{
	const club = props.club;

    return (
		<div className="clubInfo">
			<div className="clubInfo__text clubInfo__text--large">{club.name}</div>
			<div>{club.description}</div>
			<div>{club.location}</div>
			<div>{club.date}</div>
			<div>{club.time}</div>
			<div>{club.advisor}</div>
			<div></div>
		</div>
    )
}
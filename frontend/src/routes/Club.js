import useApi from "../hooks/useApi";
import React, { useState, useEffect } from 'react';
import {Buffer} from 'buffer';
import { useParams } from "react-router-dom";

import Loading from '../components/Loading';
import './Club.scss';
import axios from 'axios';

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
			{club.infoPage ? <Info club={club}/> : <InfoFallback club={club}/>}

		</div>
    )
}

function Info(props)
{
	const club = props.club;
	const [image, setImage] = useState();
	useEffect(() =>
	{
		async function fetchImage()
		{
			const res = await axios.get(`/images/${club.img}`, {responseType: 'arraybuffer'});
			setImage(Buffer.from(res.data, 'binary').toString('base64'));
		}
		fetchImage();
	}, []);
	return (
		<div>
			<div>{club.infoPage}</div>
			<img src={`data:image/jpeg;charset=utf-8;base64,${image}`}/>
		</div>
	)

}

function InfoFallback(props)
{
	const club = props.club;
	return (
		<div>
			<div>{club.description}</div>
			<div>{club.location}</div>
			<div>{club.date}</div>
			<div>{club.time}</div>
			<div>{club.advisor}</div>
		</div>
	)
}
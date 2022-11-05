import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from '../hooks/useApi';

import { useAuth } from '../contexts/AuthContext'

import Loading from "../components/Loading";

export default function ModifyClub() {
    const {user, token} = useAuth();

    const clubId = useParams().id;
    const [club, setClub] = useState({});
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [advisor, setAdvisor] = useState('');

    const getClub = useApi('/clubs');
    const putClub = useApi('/clubs', 'put', token);

    const navigate = useNavigate();

    useEffect(() => {
            getClub.dispatch({populate: setClub, params: `/${clubId}`});
        }
    , []);

    useEffect(() => {
        if (!getClub.loading)
        {
            if (club.uid != user.uid) 
            {
                navigate('/');
            }

            setDescription(club.description);
            setLocation(club.location);
            setDate(club.date);
            setTime(club.time);
            setAdvisor(club.advisor);
        }
    }, [getClub.loading])

    console.log(description);

    async function submitChange()
    {
        const body = {name: club.name, description: description, location: location, date: date, time: time, advisor: advisor};
        putClub.dispatch({body: body, params: `/${club.id}`});
        navigate('/');
    }

    return (
        <>
            {getClub.loading ? <Loading/> :         
                <div className="modify">
                <header>Modifying {club.name}</header>
                <div className="modify__form">
                    <div>Description</div>
                    <textarea value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <div>Location</div>
                    <input value={location} onChange={e => setLocation(e.target.value)}></input>
                    <div >Day</div>
                    <input value={date} onChange={e => setDate(e.target.value)}></input>
                    <div>Time</div>
                    <input value={time} onChange={e => setTime(e.target.value)}></input>
                    <div>Advisor</div>
                    <input value={advisor} onChange={e => setAdvisor(e.target.value)}></input>
                    <button onClick={submitChange}>submit</button>
                </div>
            </div>}
        </>

    )
}
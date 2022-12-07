import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from '../hooks/useApi';

import { useAuth } from '../contexts/AuthContext'

import Loading from "../components/Loading";

import axios from 'axios';

// TODO: REAASFKLASJFK;LASDJ REFACTOR ALL THIS WHAT EVEN IS ANY OF THIS
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
            if (!club.officers.includes(user.uid)) 
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

    async function submitChange(e)
    {
        e.preventDefault(); 

        const body = {name: club.name, description: description, location: location, date: date, time: time, advisor: advisor};
        await putClub.dispatch({body: body, params: `/${club.id}`});
        navigate('/');
    }

    return (
        <>
            {getClub.loading ? <Loading/> :         
                <div className="modify">
                <header>Modifying {club.name}</header>
                <form onSubmit={submitChange} className="modify__form ">
                    <p>Description: </p>
                    <textarea className='border' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <p>Location: </p>
                    <input className='border' value={location} onChange={e => setLocation(e.target.value)}></input>
                    <p >Day:  TODO: FIX AND ADD MULTISELECT</p>
                    <p>Time: </p>
                    <input className='border' value={time} onChange={e => setTime(e.target.value)}></input>
                    <p>Advisor: </p>
                    <input className='border' value={advisor} onChange={e => setAdvisor(e.target.value)}></input>
                    <br/>
                    <label>Officers</label>
                    {club.officers.map(officer => <div>{officer}</div>)}
                    <br/>
                    <button className='bg-neutral-800 text-neutral-100' type="submit">submit</button>
                </form>
            </div>}
        </>

    )
}
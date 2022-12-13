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
            <div className="modify p-10">
                <header className='text-4xl text-center mb-10'>Modifying {club.name}</header>
                <form onSubmit={submitChange} className="modify__form text-left ">
                    <p className='text-xl mb-3'>Description: </p>
                    <textarea className='border resize-none mb-5' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <p className='text-xl mb-3'>Location: </p>
                    <input className='border mb-5' value={location} onChange={e => setLocation(e.target.value)}></input>
                    <p className='text-xl mb-3'>Day:  TODO: FIX AND ADD MULTISELECT</p>
                    <p className='text-xl mb-3'>Time: </p>
                    <input className='border mb-5' value={time} onChange={e => setTime(e.target.value)}></input>
                    <p className='text-xl mb-3'>Advisor: </p>
                    <input className='border mb-5' value={advisor} onChange={e => setAdvisor(e.target.value)}></input>
                    <p className='text-xl mb-3'>Officers</p>
                    {club.officers.map(officer => <div>{officer}</div>)}
                    <button className='bg-neutral-900 mt-10 px-20 py-4 rounded-2xl text-neutral-200 text-2xl mx-auto font-medium' type="submit">Submit</button>
                </form>
            </div>}
        </>

    )
}
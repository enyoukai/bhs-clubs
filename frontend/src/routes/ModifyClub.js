import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from '../api/API';

import { useAuth } from '../contexts/AuthContext'

import Loading from "../components/Loading";

export default function ModifyClub() {
    const clubId = useParams().id;
    const [club, setClub] = useState({});
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [date, setDate] = useState('');
	const [time, setTime] = useState('');
	const [advisor, setAdvisor] = useState('');

    const [loading, setLoading] = useState(true);

    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        async function getClub()
        {
            const club = await API.getClubById(clubId);
            if (club.uid != user.uid) 
            {
                navigate('/');
            }

            setLoading(false);

            setClub(club);
            setDescription(club.description);
            setLocation(club.location);
            setDate(club.date);
            setTime(club.time);
            setAdvisor(club.advisor);
        }
        getClub();
    }, []);

    async function submitChange()
    {
        await API.putClub(clubId, club.name, description, location, date, time, advisor, await user.getIdToken());
        navigate('/');
    }

    return (
        <>
            {loading ? <Loading/> :         
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
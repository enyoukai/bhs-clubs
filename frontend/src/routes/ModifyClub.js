import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useApi from '../hooks/useApi';

import { useAuth } from '../contexts/AuthContext'

import Loading from "../components/Loading";

import axios from 'axios';

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
            if (club.uid !== user.uid) 
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
        // let imageForm = new FormData();
        // imageForm.append('clubImage', image);
     
        // await axios.post(`/clubs/${club.id}/upload`, imageForm, {headers: {"Content-Type": "multipart/form-data", "Authorization": `Bearer ${token}`}});
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
                    {/* <input className='border' value={date} onChange={e => setDate(e.target.value)}></input> */}
                    <p>Time: </p>
                    <input className='border' value={time} onChange={e => setTime(e.target.value)}></input>
                    <p>Advisor: </p>
                    <input className='border' value={advisor} onChange={e => setAdvisor(e.target.value)}></input>
                    {/* <p>Info Page</p>
                    <textarea value={infoPage} onChange={e => setInfoPage(e.target.value)}></textarea>
                    <br/>
                    <input type="file" name="clubImage" accept="image/*" onChange={e => setImage(e.target.files[0])}/>
                    <br/>
                    {image && <img width={"100rem"} src={URL.createObjectURL(image)}></img>}
                    <br/> */}
                    <br/>
                    <button className='bg-neutral-800 text-neutral-100' type="submit">submit</button>
                </form>
            </div>}
        </>

    )
}
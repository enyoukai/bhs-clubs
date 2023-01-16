import { useState, useEffect } from "react";
import { useParams, useNavigate, Link} from "react-router-dom";

import DatePicker from "components/DatePicker";

import Loading from "../components/Loading";

import axios from 'axios';

// TODO: REAASFKLASJFK;LASDJ REFACTOR ALL THIS WHAT EVEN IS ANY OF THIS
export default function ModifyClub() {
    const clubId = useParams().id;

    const [clubLoading, setClubLoading] = useState(true);

    const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const [location, setLocation] = useState('');
	const [dates, setDates] = useState('');
	const [time, setTime] = useState('');
	const [advisor, setAdvisor] = useState('');
    const [officers, setOfficers] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        async function fetch()
        {
            const clubData = (await axios.get(`/clubs/${clubId}`)).data;
            
            setName(clubData.name)
            setDescription(clubData.description);
            setLocation(clubData.location)
            setDates(clubData.dates);
            setTime(clubData.time)
            setAdvisor(clubData.advisor);
            setOfficers(clubData.officers);

            setClubLoading(false);
        }

        fetch();
    }
    , []);

    async function submitChange(e)
    {
        e.preventDefault(); 

        console.log(name);
        console.log(description);
        console.log(location);
        console.log(dates);
        console.log(time);
        console.log(advisor);

        const payload = {description: description, location: location, dates: dates, time: time, advisor: advisor};
        await axios.patch(`/clubs/${clubId}`, payload);

        navigate(`/club/${clubId}`);
    }

    return (
        <>
            {clubLoading ? <Loading/> :         
            <div className="modify p-10">
                <header className='text-4xl text-center mb-10'>Modifying {name}</header>
                <form onSubmit={submitChange} className="modify__form text-left w-1/2 mx-auto">
                    <p className='text-2xl mb-3'>Description </p>
                    <textarea className='border border-neutral-600 resize-none mb-5 w-full p-2 rounded-md text-neutral-800' value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <p className='text-2xl mb-3'>Location </p>
                    <input className='border border-neutral-600 mb-5 p-2 w-full rounded-md text-neutral-800' value={location} onChange={e => setLocation(e.target.value)}></input>
                    <p className='text-2xl mb-3'>Dates</p>
                    <DatePicker theme="light" dateHandler={setDates} selectedDates={dates}/>
                    <div className='flex justify-between mt-5'>
                        <div>
                            <p className='text-2xl my-3'>Time </p>
                            <input className='border border-neutral-600 mb-5 p-1 rounded-md text-neutral-800' value={time} onChange={e => setTime(e.target.value)}></input>
                        </div>
                        <div>
                            <p className='text-2xl my-3 text-right'>Advisor</p>
                            <input className='border border-neutral-600 mb-5 p-1 rounded-md text-neutral-800 text-right' value={advisor} onChange={e => setAdvisor(e.target.value)}></input>
                        </div>
                    </div>
                    <p className='text-2xl mb-3'>Officers</p>
                    <ul>
                        {officers.map(officer => <li className="text-xl" key={officer.id}><Link to={`/account/${officer.id}`}><span>{officer.username}</span> <span className="text-purple-500 font-semibold">({officer.email})</span></Link></li>)}
                    </ul>
                    <input className='border border-neutral-600 mb-5 p-1 rounded-md text-neutral-800 mt-5' placeholder="Officer"/>
                    <button type="button" className='ml-3 text-lg font-medium'>Add Officer</button>
                    <div className="flex justify-between">
                        <button type="submit" className='bg-neutral-900 mt-10 px-20 py-4 rounded-2xl text-neutral-200 text-2xl font-medium hover:bg-neutral-700' >Save</button>
                        <button type="button" onClick={() => navigate(`/club/${clubId}`)} className='border border-neutral-600 mt-10 px-16 py-4 rounded-2xl text-neutral-800 text-2xl font-medium hover:bg-neutral-200'>Cancel</button>

                    </div>
                    
                </form>
            </div>}
        </>

    )
}
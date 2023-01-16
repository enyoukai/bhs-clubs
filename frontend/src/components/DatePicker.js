import React, { useState, useEffect } from 'react';

export default function DatePicker(props) {
	const { dateHandler, selectedDates } = props;

	function toggleDate(date) {
		const newDates = Array.from(selectedDates);

		if (newDates.includes(date))
		{
			newDates.splice(selectedDates.indexOf(date), 1);
		}
		else
		{
			newDates.push(date);
		}

		dateHandler(newDates);
	} 
		

	return (
		<div className="grid grid-cols-7 text-center gap-4">
			{
				props.theme === 'light' ? <>
					<button type="button" onClick={() => toggleDate(0)} className={`border border-neutral-600 rounded-md ease-in-out duration-300 ${selectedDates.includes(0) ? 'bg-neutral-800 text-neutral-100 ' : 'text-neutral-800'}`}>S</button>
					<button type="button" onClick={() => toggleDate(1)} className={`border border-neutral-600 rounded-md ease-in-out duration-300 ${selectedDates.includes(1) ? 'bg-neutral-800 text-neutral-100 ' : 'text-neutral-800'}`}>M</button>
					<button type="button" onClick={() => toggleDate(2)} className={`border border-neutral-600 rounded-md ease-in-out duration-300 ${selectedDates.includes(2) ? 'bg-neutral-800 text-neutral-100 ' : 'text-neutral-800'}`}>T</button>
					<button type="button" onClick={() => toggleDate(3)} className={`border border-neutral-600 rounded-md ease-in-out duration-300 ${selectedDates.includes(3) ? 'bg-neutral-800 text-neutral-100 ' : 'text-neutral-800'}`}>W</button>
					<button type="button" onClick={() => toggleDate(4)} className={`border border-neutral-600 rounded-md ease-in-out duration-300 ${selectedDates.includes(4) ? 'bg-neutral-800 text-neutral-100 ' : 'text-neutral-800'}`}>T</button>
					<button type="button" onClick={() => toggleDate(5)} className={`border border-neutral-600 rounded-md ease-in-out duration-300 ${selectedDates.includes(5) ? 'bg-neutral-800 text-neutral-100 ' : 'text-neutral-800'}`}>F</button>
					<button type="button" onClick={() => toggleDate(6)} className={`border border-neutral-600 rounded-md ease-in-out duration-300 ${selectedDates.includes(6) ? 'bg-neutral-800 text-neutral-100 ' : 'text-neutral-800'}`}>S</button>
				</> : 
				<>
					<button type="button" onClick={() => toggleDate(0)} className={`border rounded-md ease-in-out duration-300 ${selectedDates.includes(0) ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>S</button>
					<button type="button" onClick={() => toggleDate(1)} className={`border rounded-md ease-in-out duration-300 ${selectedDates.includes(1) ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>M</button>
					<button type="button" onClick={() => toggleDate(2)} className={`border rounded-md ease-in-out duration-300 ${selectedDates.includes(2) ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>T</button>
					<button type="button" onClick={() => toggleDate(3)} className={`border rounded-md ease-in-out duration-300 ${selectedDates.includes(3) ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>W</button>
					<button type="button" onClick={() => toggleDate(4)} className={`border rounded-md ease-in-out duration-300 ${selectedDates.includes(4) ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>T</button>
					<button type="button" onClick={() => toggleDate(5)} className={`border rounded-md ease-in-out duration-300 ${selectedDates.includes(5) ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>F</button>
					<button type="button" onClick={() => toggleDate(6)} className={`border rounded-md ease-in-out duration-300 ${selectedDates.includes(6) ? 'bg-neutral-100 text-neutral-900 ' : 'bg-neutral-800 text-neutral-100'}`}>S</button>
				</>
			}
		</div>
	)
}
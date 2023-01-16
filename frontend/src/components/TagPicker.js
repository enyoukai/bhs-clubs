import {capitalizeFirstLetter} from 'utils/textUtils';

export default function TagPicker(props) {
	return (
		<div>
			{Object.entries(props.tags).map(([tag, value]) =>
				<button type='button' key={tag} onClick={() => props.handleTagChange(tag)} className={`block border p-5 rounded-md w-full mb-5 text-left ease-in-out duration-300 ${value ? 'bg-neutral-100 text-neutral-900' : 'bg-neutral-800 text-neutral-100'}`}>
					{capitalizeFirstLetter(tag)}
				</button>

			)}
		</div>
	)
}
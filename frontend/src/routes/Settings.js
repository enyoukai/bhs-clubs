import DropZone from 'components/DropZone';

import { useState } from 'react';

export default function Settings() {
	const [profilePicture, setProfilePicture] = useState();

	function onFileUpload(files) {
		setProfilePicture(files[0]);
	}

	return (
		<div>
			<h2>Settings</h2>
			<DropZone currentImg={profilePicture} onDrop={onFileUpload} />
		</div>
	)
}
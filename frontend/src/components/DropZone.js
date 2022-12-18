import { useDropzone } from "react-dropzone";

export default function DropZone(props) {
	const onDrop = props.onDrop;

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

	return (
		<div {...getRootProps({ className: 'text-xl border-dotted border-2 p-5 dropzone text-neutral-100' })}>
			<input {...getInputProps()} />
			{props.currentImg ? <img className='mx-auto' alt='verification' src={URL.createObjectURL(props.currentImg)} /> : <p>Drag file here</p>}
		</div>
	)
}
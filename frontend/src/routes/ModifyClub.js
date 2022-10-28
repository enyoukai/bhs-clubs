import { useParams } from "react-router-dom";

export default function ModifyClub() {
    const id = useParams().id;
    console.log(id);
    return (
        <div>
            Editing... {id}
        </div>
    )
}
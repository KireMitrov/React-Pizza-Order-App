import { useState } from "react";


const TagManagerPage = () => {

    const [tag, setTag] = useState('');

const handleTagChange = (e) => setTag(e.target.value)
const submitTag = () => {
    Api().post('/tags').then(response => {
        console.log(response)
    }).catch(console.error);
}
 return <div className="tag-manager">
     <input onChange={handleTagChange}></input>
     <button onClick={submitTag}></button>
 </div>
}

export default TagManagerPage;
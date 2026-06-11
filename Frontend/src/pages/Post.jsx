import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Loader from "../Components/Loader"

// const API_POST = import.meta.
const Post = () => {

    const navigate = useNavigate()
    const [link, setLink] = useState(false)
    const [caption, setCaption] = useState("")

    const [isLoading, setisLoading] = useState(false)
    const CreatePost = async (e) => {
        e.preventDefault();

        setisLoading(true)
        const formData = new FormData(e.target)
        await axios.post("http://localhost:3000/post", formData).then(()=>{
            setisLoading(false)
            navigate("/")

        }).catch((err)=>{
    
            console.log(err);
            alert("ERRRRRRor")
        })
            
    }
    return (
        <form onSubmit={CreatePost} className="flex flex-col justify-center items-center p-6 gap-6 bg-white rounded-2xl w-[90%] max-w-md">
            <h1 className="text-3xl font-bold">Post</h1>
            {isLoading?<Loader></Loader>:null}
            <div className="w-full h-64 overflow-hidden border-2 border-black bg-gray-100 rounded-lg flex justify-center items-center">
                <img src={link ? link : null} className={`w-full h-full object-cover ${link ? "flex" : "hidden"}`} />
                <input type="file" onChange={(e) => {
                    const file = e.target.files[0]

                    if (file) {
                        setLink(URL.createObjectURL(file))
                    }

                }} accept="image/*" name="image" className={`w-9/10 ${link ? "hidden" : "flex"}`} placeholder="Upload Image" required />

            </div>
            <div className="flex flex-col gap-2 w-full">
                <label className="self-start text-sm font-bold">Caption</label>
                <input type="text" name="caption" value={caption} onChange={(e) => { setCaption(e.target.value) }} className="p-4 rounded-2xl w-full bg-gray-100" required placeholder="What's on your mind?" />
            </div>
            <button type="submit" className="p-4 rounded-2xl bg-violet-600 text-white font-bold text-lg w-full">Create Post</button>
        </form>
    )
}

export default Post
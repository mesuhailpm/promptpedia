'use client'
import { useState, useEffect } from "react"
import Profile from "@components/Profile"
import { useParams } from "next/navigation"
import { useSession } from "next-auth/react"


const SingleProfile = () => {
    const [promptsArray, setPromptsArray] = useState([])
    const [profileUsername, setProfileUsername] = useState('')
    const handleDelete = async() =>{
        
    }
    const {data: session} = useSession()
    const {id}  = useParams(); // returns an object containing the current route's filled in dynamic parameters


    const handleEdit = () =>{}
    const [isLoading, setIsLoading] = useState(true)

    const fetchPosts = async () => {
        setIsLoading(true)
        const response = await fetch(`/api/users/${id}/prompts`)
        const data = await response.json()
        setPromptsArray(data.posts)
        setProfileUsername(data.username)
        console.log(data);
        setIsLoading(false)
    }

    useEffect(() =>{
        fetchPosts()
    },[])

    return (
    <div>
        <Profile
        user={`${session?.user?.id === id ?'My' : profileUsername }`}
        desc = {`${session?.user?.id === id ?'Welcome to your personalized profile page. now you can edit or delete your posts here.' : 'This is '+profileUsername+'s personalized profile page' }`}
        data={promptsArray}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        isLoading={isLoading}
        parentUrl='/profile'
    />
    </div>
  )
}

export default SingleProfile

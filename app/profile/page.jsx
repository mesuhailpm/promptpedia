"use client"
import Profile from '@components/Profile'
import PromptCard from '@components/PromptCard'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const [promptsArray, setPromptsArray] = useState([])


    const {data: session} = useSession()

    


    const handleDelete = async()  => {
    }

    const handleEdit = () => {
    }

    const fetchPrompts = async() => {
        const response = await fetchPrompts(`/api/users/${session?.user?.id}/prompts`)
        const data = await response.json()

        setPromptsArray(data)
        console.log(data)
        
    }
    useEffect(()=>{
        if (session?.user?.id) {
        fetchPrompts() 
        }       

    },[session?.user?.id])

  return (<>
    <Profile 
        user='My'
        desc='Welcome to your personalized profile page. now you can edit your or delete your posts here.'
        data={promptsArray}
        handleDelete={handleDelete}
        handleEdit={handleEdit}    
    />
  </>
  )
}

export default ProfilePage
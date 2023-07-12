"use client"
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const [promptsArray, setPromptsArray] = useState([])
    const [isLoading,setIsLoading] = useState(true)
    const {data: session} = useSession()

    console.log(promptsArray)

    const handleDelete = async()  => {
    }

    const handleEdit = () => {
    }

    const fetchPrompts = async() => {
        setIsLoading(true)
        const response = await fetch(`/api/users/${session?.user?.id}/prompts`)
        console.log(response, ' is response from backened, inside useEffect')
        const data = await response.json()
        
        setPromptsArray(data)
        setIsLoading(false)
        console.log(data, ' is data got from useEffect')

    }
    useEffect(()=>{
        if (session?.user?.id) {
          console.log('starting useEffect')
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
        isLoading={isLoading}
    />
  </>
  )
}

export default ProfilePage

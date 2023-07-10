"use client"
import Profile from '@components/Profile'
import PromptCard from '@components/PromptCard'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

const ProfilePage = () => {
    const [promptsArray, setPromptsArray] = useState([])
    const {data: session} = useSession()

    console.log(promptsArray)

    const handleDelete = async()  => {
    }

    const handleEdit = () => {
    }

    const fetchPrompts = async() => {
        const response = await fetch(`/api/users/${session?.user?.id}/prompts`)
        console.log(response, ' is response from backened, inside useEffect')
        const data = await response.json()

        setPromptsArray(data)
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
    />
  </>
  )
}

export default ProfilePage

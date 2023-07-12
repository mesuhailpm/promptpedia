'use client'
import PromptCard from '@components/PromptCard'
import React, { useEffect, useState } from 'react'

const singlePost = () => {

  const [id,setId] = useState('')
  const [prompt, setPrompt] = useState({})
  const [loading, setLoading] = useState(true)
  const retrieveID = () => {
      const pathSegments = window.location.pathname.split('/');
      const slug =  pathSegments[pathSegments.length - 1]
      setId(slug)
  }


  const fetchPost = async(id)=>{
    try {

      const response = await fetch(`/api/prompt?id=${id}`)
      const data  = await response.json()
      setPrompt(data)
      setLoading(false)
      console.log(data)

    } catch (error) {
      console.log(error)

    }

  }

  useEffect( ()=>{
    retrieveID()
    if(id){
      fetchPost(id)
    }
  },[id])

  if(loading) return null

  return (
    <div>
      <PromptCard
        post={prompt}
        copied=''
        parent='single'
        parentUrl='/profile/'
      />
    </div>
  )
}

export default singlePost

'use client'
import React, { useEffect, useState } from 'react'

const singlePost = () => {

  const [id,setId] = useState(2)  
  const retrieveID = () => {
      const pathSegments = window.location.pathname.split('/');
      const slug =  pathSegments[pathSegments.length - 1]
      setId(slug)
  }

  useEffect( ()=>{
    retrieveID()
  },[])

  const fetchPost = async(id)=>{
    try {

      const response = await fetch('api/prompt') 
      //  fetchPost(`api/prompt/:${id}`)
      // const data = await response.json()

    } catch (error) {
      console.log(error)
      
    }

  }

  useEffect( ()=>{
    if(id){
      console.log('useEffect ran')
      fetchPost(id)
    }
    
  },[id] )
    
  return (
    <div>singlePost id is: {id} not 123</div>
  )
}

export default singlePost
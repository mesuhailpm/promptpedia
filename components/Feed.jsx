'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {

  const [prompts, setPrompts] = useState([])
  const [copied, setcopied] = useState('')
  const handleCopy = async (text) =>{
    navigator.clipboard.writeText(text)
    .then(()=> {
      setcopied(text)
      setTimeout(()=>{
        setcopied('')
      },3000)})
    .catch((error) => console.log(error))

    
  }
  const PromptCardList = ({prompts}) => {
    return (prompts.map((prompt,index)=>(
      <PromptCard
        key={index}
        post={prompt}
        copied={copied}
        handleCopy={handleCopy}
        />
    )))
  }


  

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('api/prompt')
        const data = await response.json();
        setPrompts(data)
        
      } catch (error) {
        console.log('unable to fetch posts error: ', error)
      }

    }

    fetchPosts()

  },[])

    return (
      <div className="feed">
       <PromptCardList 
          prompts = {prompts}
       />
      </div>
    );
  };

export default Feed;

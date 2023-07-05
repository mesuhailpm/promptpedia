'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {

  const [prompts, setPrompts] = useState([])
  const PromptCardList = ({prompts}) => {
    return (prompts.map((prompt,index)=>(
      <PromptCard
        key={index}
        post={prompt}
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
      <div>
       <PromptCardList 
          prompts = {prompts}
       />
      </div>
    );
  };

export default Feed;

'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const Feed = () => {

  const [prompts, setPrompts] = useState([]) // all prompts
  const [filteredPrompts, setFilteredPrompts] = useState ([])
  const [copied, setcopied] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchTimeout, setSearchTimeout] = useState(null)
  const handleCopy = async (text) =>{
    navigator.clipboard.writeText(text)
    .then(()=> {
      setcopied(text)
      setTimeout(()=>{
        setcopied('')
      },5000)})
    .catch((error) => console.log(error))

    
  }

  const filterPrompts = (keyword) => {

    setFilteredPrompts(
      prompts.filter((prompt)=> 
      prompt.creator.username === keyword ||
      prompt.tag === keyword ||
      prompt.prompt == keyword
      ))
  }

  const handleSearch = (e) =>{
    
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);
    
    setSearchTimeout(
      setTimeout(()=>{
        filterPrompts(e.target.value);
    },1000))
  }
  const PromptCardList = ({prompts}) => {
    return (prompts?.map((prompt,index)=>(
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
      <section className="feed">
        <form className="relative w-full flex-center">
          <input type="text" 
            className="search_input peer"
            placeholder="Search for tags, prompts, and users..."
            value={searchText}
            onChange={handleSearch}
            required
          />
        </form>
        {
          searchText 
          ?(
            <PromptCardList
              prompts={filteredPrompts} 
            />
          )
          :
            (<PromptCardList 
              prompts = {prompts}
            />)
        }
        
      </section>
    );
  };

export default Feed;

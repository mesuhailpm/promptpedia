"use client";
import PromptCard from "@components/PromptCard";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const singlePost = () => {
  const [prompt, setPrompt] = useState({});
  const [loading, setLoading] = useState(true);
  const [copied, setcopied] = useState('')
   const handleCopy = async (text) =>{
    navigator.clipboard.writeText(text)
    .then(()=> {
      setcopied(text)
      setTimeout(()=>{
        setcopied('')
      },5000)})
    .catch((error) => console.log(error))
    }
    

  const { id } = useParams();

  const fetchPost = async (id) => {
    try {
      const response = await fetch(`/api/prompt?id=${id}`);
      const data = await response.json();
      setPrompt(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);

  if (loading) return null;

  return (
    <div>
      <PromptCard
        post={prompt}
        parent="single"
        parentUrl="/profile/"
        copied={copied}
        handleCopy={handleCopy}
      />
    </div>
  );
};

export default singlePost;

"use client";
import PromptCard from "@components/PromptCard";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const singlePost = () => {
  const [prompt, setPrompt] = useState({});
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const fetchPost = async (id) => {
    try {
      const response = await fetch(`/api/prompt?id=${id}`);
      const data = await response.json();
      setPrompt(data);
      setLoading(false);
      console.log(data);
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
        copied=""
        parent="single"
        parentUrl="/profile/"
      />
    </div>
  );
};

export default singlePost;

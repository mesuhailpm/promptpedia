const PromptCard = ({post}) => {
  const{creator, prompt, tag} = post
    return (
      <div className="flex">
        <h1>{creator}</h1>
       {prompt}
      </div>
    );
  };

  export default      PromptCard;

import PromptCard from "./PromptCard";

const Profile = (user, desc, data, handleDelete, handleEdit) => {
    return (
      <section className='w-full'>
        <p className='head_text text-left '>
            <span className='blue_gradient'>Profile page</span>
        </p>
        <p className="desc">{desc}</p>

        {/* {data?.length
        ?
          // data.map((prompt,index) => (
          //   <PromptCard 
          //     key={index}
          //     post={prompt}             
          //   />
          // ))
          <>hello</>
        :
          <p>No posts found</p>
        } */}
        
        

    </section>
    );
  };

  export default Profile;

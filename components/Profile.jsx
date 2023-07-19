import PromptCard from "./PromptCard";
import Loading from '@components/Loading';

const Profile = ({user, desc, data, handleDelete, handleEdit, isLoading, parentUrl}) => {

    
    return (
      <section className='w-full'>
        <p className='head_text text-left '>
            <span className='blue_gradient'>{user === 'My'? 'My ' : `${user}'s `}Profile page</span>
        </p>
        <p className="desc">{desc}</p>

        {isLoading &&
        <Loading type='Comment'/>
        }

        { !isLoading && 
        
        (
          <div className="mt-16 prompt_layout">

           {data?.length
            ?
              data.map((prompt,index) => (
                <PromptCard
                  key={index}
                  post={prompt}
                  parentUrl={parentUrl}
                />
              ))
            :
              <p>No posts found</p>}
          </div>
        )

        }



    </section>
    );
  };

  export default Profile;

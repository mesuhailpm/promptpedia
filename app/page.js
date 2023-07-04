import Feed from '@components/Feed'

const Home = () => {
  return (
    <section className='w-full flex-center flex-col '>
      <h1 className='head_text text-center'>
        Discover and share
        <br className='max-md:hidden'/> {/* might be md:hidden */ }
        <span className='orange_gradient text-center'>  AI-Powered prompts</span>
      </h1>
      <p className='desc text-center'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur, nihil doloribus nesciunt excepturi facere necessitatibus, dignissimos libero, fugiat placeat similique asperiores reiciendis id laboriosam magnam sint neque sapiente quo facilis.
      </p>

      <Feed />
    </section>
  )
}

export default Home

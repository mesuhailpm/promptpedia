import Link from "next/link";

const Form = ({type, handleSubmit, form, setForm, submitting}) => {
    return (
      <section className="flex flex-col w-full max-w-full flex-start">
        <h1 className="text-left head_text" >
          <span className="blue_gradient">
            {type} a prompt
          </span>
        </h1>
        <p className="desc text-left max-w-md">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-7 w-full max-w-2xl glassmorphism mt-10"
          >
            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Your AI prompt
              </span>
              <textarea
              value={form.prompt}
              placeholder='Write your AI prompt'
              onChange={(e)=> setForm({...form, prompt: e.target.value})}
              required
              className="form_textarea"

              />
            </label>

            <label>
              <span className="font-satoshi font-semibold text-base text-gray-700">
                Add an associated tag
              </span>
              <br/>
              (#sales, #product, #creativity, #photography)
              <input
                placeholder="#tag"
                value={form.tag}
                onChange={(e)=> setForm({...form, tag:e.target.value})}
                className="form_input"
                required
              />
            </label>

            <div className="self-end">
              <button
                type="submit"
                disabled={submitting}
                className="border-solid border-2 w-half border:none p-2 rounded-lg text-white bg-primary-orange"
                >
                  {type === 'Create' ? 'Insert ':'Update '} idea
              </button>
              <button
                type="reset"
                onClick={()=>setForm({
                  ...form,
                  prompt:'',
                  tag:''
                     })}
                className="border-solid border-2 w-half border:none p-2 rounded-lg text-black bg-blue-200"
              >
                Reset

              </button>
              <Link href='/'
                className="border-solid border-2 w-half border:none p-2 rounded-lg text-blue bg-gray-200 "
              >
                Cancel

              </Link>
            </div>


        </form>
      </section>
    );
  };
  export default Form;

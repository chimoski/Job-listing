
export const JobListItem = ({item,handleStackClick}) => {
  const { company,logo,featured,position,role,level,postedAt,isNew,contract,location,languages,tools} = item;
    const stacks = [...languages, ...tools,role,level]; 
  return (
    <main>
    <div className="w-[80%] bg-[#fff]  lg:items-center
    rounded-md px-5 pb-3 lg:flex lg:py-4 lg:gap-2 lg:justify-between
    shadow-2xl mx-auto border-l-[#5ba4a4] border-l-8 lg:mb-5 mb-12">
      {/* avatar */}
     <div className=' lg:flex lg:gap-4 lg:mr-5rem lg:items-center'>
     <img
      className='rounded-full h-14 w-14 translate-y-[-25px] lg:translate-y-[0]'
      src={logo} alt="logos" />
      {/* description */}
      <div className='flex flex-col gap-3'>
       <div className='flex gap-x-2 items-center'>
       <p className='pr-5 text-[#5ba4a4] font-bold'>{company}</p>
        {isNew &&
         <p className='text-white bg-[#5ba4a4] text-[12px] rounded-full sm:text-sm font-bold px-2 py-1'>
         NEW!
       </p>
        }
       
        {featured && 
        <h2 className='text-white text-[12px] sm:text-sm bg-black font-bold rounded-full px-2 py-1'>
        FEATURED
       </h2>
        }
        
       </div>
       <p
       onClick={()=>handleStackClick(position)}
        className='font-bold hover:text-[#5ba4a4] cursor-pointer'>{position}</p>
       <div className='flex gap-8 text-gray-500 font-semibold'>
        <p className='text-[12px] sm:text-base'>{postedAt}</p>
        <ul className='flex gap-8 list-disc text-[12px] sm:text-base'>
          <li>{contract}</li>
          <li>{location}</li>
        </ul>
       </div>
      </div>
     </div>
      <div className='border-t w-full my-3 lg:hidden'></div>
      {/* courses */}
      <div className='flex gap-x-2 gap-y-2 flex-wrap'>
        {
          stacks ? (
            stacks.map((stack,i)=>(
              <button 
              onClick={()=>handleStackClick(stack)}
                key={i}
               className='courses'>
                {stack}
                </button>
            ))
          ) :''
        }
      </div>
    </div>
  </main>
  )
}

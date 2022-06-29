import { JobListItem } from './components/JobListItem';
import React,{useState,useEffect } from 'react'
import desktopImage from './images/bg-header-desktop.svg'
import mobileImage from './images/bg-header-mobile.svg'

function App() {
  const [filters,  setFilters] = useState([]);
  const [items, setItems] = useState([]);
  useEffect(()=>{
    fetch('/data.json')
    .then(resp=>resp.json())
    .then(data=> setItems(data));
  },[]);
  const filterByStack = ({role,level,languages,tools })=>{
    if(filters.length ===0){
      return true
    }
    const stacks= [role,level, ...languages, ...tools];
    return stacks.find(item=>filters.includes(item))
  }
  const handleStackClick =(item)=>{
    if(filters.includes(item)) return
    setFilters([...filters, item]);
  }
  // fiteration starts here
  const filteredItems = items.filter(filterByStack);
  const handleFilterClick =(filter)=>{
    const filtered = filters.filter(f=> f !== filter);
    setFilters(filtered);
  }
  const handleClear = (e)=>{
    e.preventDefault();
    setFilters([]);
  }
  return (
    <div>
      <header className="">
       <img
       width='100%'
       height="10vw"
       className='hidden md:block'
        src={desktopImage} alt="" />

        <img
       width='100%'
       
       className='md:hidden h-[30vw]'
        src={mobileImage} alt="" />
      </header>
     <div className={`bg-[#effafa] h-[100v%] ${filters.length>0 ? '':'pt-12'}`}>
      {
        filters.length>0 && (
          <div  className=' flex-wrap  
        w-[80%] bg-[#fff] shadow-lg flex justify-between 
         lg:items-center mx-auto p-4 translate-y-[-30px] rounded'>
         <div className='flex gap-2 w-[80%] mr-3 flex-wrap'>
          {
            filters.length>0 && filters.map((filter,i)=>(
         <div 
         key={i}
         className='flex gap-2 bg-[#eef6f6] font-bold items-center rounded'>
          <p className='text-[#5ba4a4] text-sm  px-2'>{filter}</p>
          <p
          onClick={()=>handleFilterClick(filter)}
           className='text-white bg-[#5ba4a4] text-bold px-2 cursor-pointer rounded-r hover:bg-black'>×</p>
          </div>
            ))
          }
         </div>
          <div
           onClick={handleClear}
           className='text-gray-400 font-bold cursor-pointer hover:text-[#5ba4a4] hover:underline'
          >
            Clear
          </div>
      </div>
        )
      }
      {
       filteredItems.map(item=>(
         <JobListItem  
          key={item.id} item={item}
          handleStackClick={handleStackClick}
          />
        )) 
      }
    {/* <JobListItem /> */}
     </div>
    </div>
  );
}
export default App;

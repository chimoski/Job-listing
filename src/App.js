import { JobListItem } from './components/JobListItem';
import React,{useState,useEffect } from 'react';
import desktopImage from './images/bg-header-desktop.svg';
import mobileImage from './images/bg-header-mobile.svg';
import {NoSearch } from './components/NoSearch'
import {AiOutlineSearch} from 'react-icons/ai'

function App() {
  const [filters,  setFilters] = useState([]);
  const [items, setItems] = useState([]);
  const [query,setQuery] = useState('');
 
 

  useEffect(()=>{
    fetch('/data.json')
    .then(resp=>resp.json())
    .then(data=> setItems(data));
  },[]);


  const filterByStack = ({role,level,languages,tools,position })=>{
    const stacks= [role,level, ...languages, ...tools,position];
    if(filters.length ===0){
      return true
    }
   
    // return stacks.find(item=>filters.includes(item))
    return filters.every(filter=>stacks.includes(filter))
    
  }
  const handleStackClick =(item)=>{
   if(filters.includes(item)) return
   setFilters([...filters,item]);
   setQuery('');
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

  useEffect(()=>{
    if(query ==='') return
    else{
      setFilters([]);
    }
  },[query])
  
  const searchFilter =({languages,level,role,tools})=>{
      let stacks =[role,level,...tools,...languages]
      if(query === '') return items
      if(stacks.map(stack=>stack.toLowerCase()).includes(query.toLowerCase())){
      return true
      } else return false
  }
  const searchItems = items.filter(searchFilter);
  const prevent = (e)=>{
    e.preventDefault();
  }
  return (
    
    <div>
      <header className="relative">
       <img
       width='100%'
       height="10vw"
       className='hidden md:block'
        src={desktopImage} alt="" />

        <img
       width='100%'
        
       className='md:hidden h-[30vw]'
        src={mobileImage} alt="" />
       
       <form onSubmit={prevent}>
         <div 
       className='absolute top-[50%] left-[50%] translate-x-[-50%] 
       translate-y-[-50%] bg-[#000] w-[70%] lg:w-[40%] py-2 px-4 rounded-full flex items-center
       '>
        <input
        onChange={(e)=> setQuery(e.target.value)}
        value={query}
        placeholder='Search for a role or stack.....'
        className=' w-[100%] 
        placeholder:text-sm  
        bg-transparent outline-none text-[#5ba4a4] font-bold '
         type="search" />
         <AiOutlineSearch 
          color="#5ba4a4" className='h-6 w-8 pr-2 font-bold cursor-pointer' />
        </div>
      </form>
      </header>

      {/* filter results */}
     <div className={`${filters.length>0 ? '':'pt-12'}`}>
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
       query === '' ?(
        filteredItems.map(item=>(
          <JobListItem  
           key={item.id} item={item}
           handleStackClick={handleStackClick}
           />
         )) 
       ):
       searchItems.map(item=>(
        <JobListItem  
         key={item.id} item={item}
         handleStackClick={handleStackClick}
         />
       )) 

      }

      {
        searchItems.length < 1 && (
          <NoSearch query={query} />
        ) 
      }
  
     </div>
    </div>
  );
}
export default App;

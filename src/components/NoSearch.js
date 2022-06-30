import svg from"../images/not-found.svg"
export const NoSearch = ({query}) => {
  return (
     <div>
      <div className="flex flex-col justify-center items-center">
      <img
       className="h-[300px] mb-14"
        src={svg} alt="" />
        <p>Oops! there is no result for</p>
       <h1 className="text-xl text-bold text-gray-500">"{query}"</h1>
      
       </div>
     </div>
  )
}

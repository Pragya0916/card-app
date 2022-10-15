import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import '../App.css';


function Apps() {
  const [userData,setUserData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextUrl,setNextUrl]=useState();
  const [prevUrl,setPrevUrl]=useState();
  const [infoUser,setInfoUser]=useState();
  


  const allUserData=async()=>{
      setLoading(true)
      const res=await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getUserData(res.data.results)
      // console.log(res.data.results)
      setLoading(false)
  }
  const getUserData=async(res)=>{
     res.map(async(item)=>{
        const result=await axios.get(item.url)
        setUserData(state=>{
            state=[...state,result.data]
            state.sort((a,b)=>a.id>b.id?1:-1)
            return state;
        })
     })   
  }
  useEffect(()=>{
    allUserData()
    },[url])

  return ( 
  <>
        <h1 className='text-center text-white btn-dark'> POKEMON'S </h1>
                    
                     <input type="text" 
                       className="form-control searchInput w-50 m-3 text-center"  
                       placeholder="Enter Pokemon Name..."
                     />
       
                
  
                    <Card loading={loading} userData={userData}setInfoUser={data=>setInfoUser(data)}/>
                    
                    <div className="d-flex justify-content-center">
                        {  prevUrl && <button className="btn btn-outline-dark m-1" onClick={()=>{
                            setUserData([])
                            setUrl(prevUrl) 
                        }}>Previous</button>}

                        { nextUrl && <button className="btn btn-outline-dark m-1" onClick={()=>{
                            setUserData([])
                            setUrl(nextUrl)
                        }}>Next</button>}

                    </div>
            
  </>
  );
}

export default Apps;

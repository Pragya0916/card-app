import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Components/Card";
import './App.css';
import Modal from "./Components/Modal";


function App() {
  const [userData,setUserData]=useState([]);
  const [loading,setLoading]=useState(true);
  const [url,setUrl]=useState("https://pokeapi.co/api/v2/pokemon/")
  const [nextUrl,setNextUrl]=useState();
  const [prevUrl,setPrevUrl]=useState();
  const [infoUser,setInfoUser]=useState();
  const[customShowModal , setCustomShowModal] = useState(true)
  const [inputSearch , setInputSearch] = useState('')
  const [filteredData , setFilteredData] = useState([])
 


  const allUserData=async()=>{
      setLoading(true)
      const res=await axios.get(url);
      setNextUrl(res.data.next);
      setPrevUrl(res.data.previous);
      getUserData(res.data.results)
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
        setFilteredData(state=>{
                    state=[...state,result.data]
                    state.sort((a,b)=>a.id>b.id?1:-1)
                    return state;
                })
     })   
  }

  useEffect(()=>{
    if(inputSearch){
      const userFilterData = userData.filter( (data) => data.name.includes(inputSearch),);
      setFilteredData(userFilterData)
    }
    else{
      allUserData()
    }
   
    },[url , inputSearch])


  

    const customClickShowModal = () => {
      setCustomShowModal(true);
    }
    const customCloseModal = () => {
            setCustomShowModal(false);

    }

  return (
    <>
      <h1 className="text-center text-white btn-dark"> POKEMON'S </h1>

      <input
        type="text"
        className="form-control searchInput w-50 m-3 text-center"
        placeholder="Enter Pokemon Name..."
        onChange={(e)=>setInputSearch(e.target.value)}
      />

      <Card
        loading={loading}
        filteredData = {filteredData}
        setInfoUser={(data) => setInfoUser(data)}
        customClickShowModal = {customClickShowModal}
      />

      <div className="d-flex justify-content-center">
        {prevUrl && (
          <button
            className="btn btn-outline-dark m-1"
            onClick={() => {
              setFilteredData([]);
              setUrl(prevUrl);
            }}
          >
            Previous
          </button>
        )}

        {nextUrl && (
          <button
            className="btn btn-outline-dark m-1"
            onClick={() => {
              setFilteredData([]);
              setUrl(nextUrl);
            }}
          >
            Next
          </button>
        )}
      </div>

      {
        customShowModal ? <Modal infoUser={infoUser} customCloseModal={customCloseModal} /> : null
      }
      
    </>
  );
}

export default App;

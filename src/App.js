import axios from 'axios';
import './App.css';
import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';



function App() {

  const [data, setData]=useState([])
  const [query, setQuery]= useState("Lamborghini")
  const [page, setPage]=useState(1)
  const [hasMore, setHasMore] = useState(true)

  const client_id = 'YDvnRJkm34f8-hQhAgOHkJCtbySQNSP0VNvIhdH4M3U'
  const fetchUrl = `https://api.unsplash.com/search/photos?client_id=${client_id}&query=${query}&page=${page}}`

  const fetchImages = () => {
    axios.get(fetchUrl, {
      headers:{},
    })
    .then((response)=> {
      setData([...data, ...response.data.results])
    })
    .catch((error)=> {
      console.log(error)
    })
    setPage(page +1)
  }

  useEffect(()=>{
    fetchImages()
  }, [query])

  const searchImages = (e) => {
    if(e.keyCode === 13){
      setQuery(e.target.value);
      setData([])
    }
  }

  return (
    <>
      <div className='form'>
        <input type ="text" className='input' placeholder='Search for images' onKeyDown={(e)=> searchImages(e)}></input>
        <button className='search-button'>Search</button>
      </div>
      <InfiniteScroll
        dataLength={data.length} //This is important field to render the next data
        next={fetchImages}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        
      >
        <div className="card-list">
            {data.map((data,key) => (
              <div className="container" key={key}>
                <img src={data.urls.small} className='card-image' alt={data.alt_description}/>
                {/* <h4>Photo by {data.user.name}</h4> */}
              </div>
            ))}
        </div>
      </InfiniteScroll>
    </>
  );
}

export default App;
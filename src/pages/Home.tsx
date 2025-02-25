import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { useState } from 'react';
import { Link } from 'react-router';
import "./style.css"

const GET_CHARACTERS = graphql(`
    query GetCharacters ($page: Int!)  {
     characters(page: $page) {
     info {
       count,
       next, 
       pages,
       prev
     }
     results { 
       name,
       image,
      id
      }
   }
 }
 `);

const Home = () => {

    const [page, setPage] = useState<number>(1);

    const { loading, error, data, refetch } = useQuery(GET_CHARACTERS, {
        variables: { page },
      });

      function AddPage(){
        const newPage = page + 1
        setPage(newPage)
        refetch()
      }

      function RemovePage(){
        const newPage = page - 1
        setPage(newPage)
        refetch()
        
      }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) console.log(data);
  
    return (
        <div >
            <div className={"flexbox"}>
            <button disabled={page <= 1} onClick={RemovePage}>previous</button>
            <p> Page : {page.toString()} </p>
            <button disabled={page >= (data?.characters?.info?.pages || 42)} onClick={AddPage} >next</button>
            </div>
            <div className={"flexbox"}>
            {data?.characters?.results?.map((character, index)=>(
                <div key={index} >
                    <Link to={`${character?.id}`}>
                    <img src={character?.image || ''} width={300} />
                    <h2 className={"flexbox"}> {character?.name} </h2>

                    </Link>
                </div>
            ))}
            </div>

            <footer className={"flexbox"}>
              <p>By mat mat and marie ❤️</p>
            </footer>
        </div>
    )
}

export default Home

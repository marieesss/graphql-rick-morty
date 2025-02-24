import { DocumentNode, useQuery } from '@apollo/client';
import { graphql } from '../gql';
import { GetCharactersQuery } from '../gql/graphql';
import { useState } from 'react';

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
       image
     }
   }
 }
 `);

const Home = () => {

    const [page, setPage] = useState<Number>(0);

    const { loading, error, data } = useQuery<GetCharactersQuery>(GET_CHARACTERS as DocumentNode, {
        variables: { page },
      });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) console.log(data);
  
    return (
        <div>
            {data?.characters?.results?.map((character, index)=>(
                <div key={index} >
                    <h2> {character?.name} </h2>
                    <img src={character?.image || ''} width={300} />
                </div>
            ))}
        </div>
    )
}

export default Home

import { useParams } from "react-router";
import { useQuery } from '@apollo/client';
import { graphql } from '../gql';
import "./style.css"


const GET_CHARACTER_DETAILS = graphql(`
  query GetCharacterDetail ($id: ID!)  {
     character(id: $id) {
		name,
    	status,
        species,
        gender, 
        type, 
        image, 
        location {
            name
        }
     }
   }
 `);

const Details = () => {
    const params = useParams<{ id: string }>(); 
    const id : string = params?.id || "1"


    const { loading, error, data } = useQuery(GET_CHARACTER_DETAILS, {
        variables: { id } ,
    });


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error : {error.message}</p>;
    if (data) console.log(data);

  return (
    <div className={"flexbox-column"}>
    <div className={"flexbox"}>
      <div>
      <h1>{data?.character?.name}</h1>
      <img src={data?.character?.image ||""} width={300} />

      </div>
      
    </div>

    <div className={"flexbox"}>
      <ul>
        <li>Gender : {data?.character?.gender} </li>
        <li>Location : {data?.character?.location?.name} </li>
        <li>Status : {data?.character?.status} </li>
        <li>Type : {data?.character?.type} </li>
      </ul>
      </div>




    <footer className={"flexbox"}>
              <p>By mat mat and marie ❤️</p>
       </footer>
       </div>

  )
}

export default Details

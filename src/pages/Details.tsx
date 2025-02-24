import React from 'react'
import { useParams } from "react-router";


const Details = () => {
let params = useParams();
  return (
    <div>
      Details of {params.id}
    </div>
  )
}

export default Details

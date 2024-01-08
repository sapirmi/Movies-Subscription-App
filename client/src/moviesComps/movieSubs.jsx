import { Link, useNavigate } from "react-router-dom"
import "../App.css"
import { useState } from "react"

function MovieSubsComp({subs}) {

  return (
    <>
    <strong>Subscriptions Watched</strong>
    <ul>
        {subs.map((sub, index) => (
            <li key={index}><Link to={`/members/${sub.memberId}`}>{sub.name}</Link>, {sub.date.split("T")[0]}</li>
        ))}
    </ul>
      
    </>
  )
}

export default MovieSubsComp

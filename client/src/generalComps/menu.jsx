import "../App.css"
import { useNavigate, Outlet } from 'react-router-dom';

function MenuComp({text, linkAll, linkAdd}) {

  const navigate = useNavigate();
  
  return (
    <>
      <button className="button" onClick={() => navigate(linkAll)}>All {text}</button>&nbsp; &nbsp; 
      <button className="button" onClick={() => navigate(linkAdd)}>Add {text.slice(0, -1)}</button><br/><br/>
      <Outlet/>

    </>
  )
}

export default MenuComp

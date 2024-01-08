import "../App.css"
import UserSettingComp from "./userSetting"

function AddUserComp() {


  return (
    <>
      <h2>Add New User</h2><br/>
      <UserSettingComp isNew={true} oldUser={false}/>
      
    </>
  )
}

export default AddUserComp

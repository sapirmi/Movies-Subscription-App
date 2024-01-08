import MenuComp from "../generalComps/menu"

function UserPageComp() {

  return (
    <>
      <h1>Users</h1><br/>
      <MenuComp text="Users" linkAll="show-users" linkAdd="add-user"/>
    </>
  )
}

export default UserPageComp

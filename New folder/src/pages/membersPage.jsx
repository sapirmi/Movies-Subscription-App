import MenuComp from "../generalComps/menu"

function MembersPageComp() {

  return (
    <>
      <h1>Subscriptions</h1><br/>
      <MenuComp text="Members" linkAll="show-members" linkAdd="add-member"/>
    </>
  )
}

export default MembersPageComp

import "../App.css";
import MemberSettingComp from "./memberSetting";

function AddMemberComp() {


  return (
    <>
      <h2>Add New Member</h2><br/>
      <MemberSettingComp oldMember={false}/>
    </>
  );
}

export default AddMemberComp;

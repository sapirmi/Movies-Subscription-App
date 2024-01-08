import AddUserComp from "./usersComps/addUser";
import AllUsersComp from "./usersComps/allUsers";
import EditUserComp from "./usersComps/editUser";
import UserPageComp from "./pages/usersPage"
import { Route, Routes } from 'react-router-dom';
import MoviePageComp from "./pages/moviesPage";
import AllMoviesComp from "./moviesComps/allMovies";
import AddMovieComp from "./moviesComps/addMovie";
import EditMovieComp from "./moviesComps/editMovie";
import MembersPageComp from "./pages/membersPage";
import MemberComp from "./membersComps/memberComp";
import AllMembersComp from "./membersComps/allMembers";
import MovieComp from "./moviesComps/movieComp";
import AddMemberComp from "./membersComps/addMember";
import EditMemberComp from "./membersComps/editMember";
import MainPageComp from "./pages/mainPage";
import LoginPageComp from "./pages/loginPage";
import Authorization from "./auth/authorization";
import PERMISSIONS from "./permissions/permissions"

function RoutesComp() {

  return (
    <>   
      <Routes>
        <Route path="/login" element={<LoginPageComp/>}></Route>
        <Route path="/create" element={<LoginPageComp/>}></Route>
      </Routes> 

      <Routes>
        <Route path="/" element={<MainPageComp/>}>
        <Route element={<Authorization permissions={[PERMISSIONS.ADMIN]} />}>
          <Route path="/users" element={<UserPageComp/>}>
            <Route path="add-user" element={<AddUserComp/>}/>
            <Route path="edit-users/:id" element={<EditUserComp/>}/>
            <Route path="show-users" element={<AllUsersComp/>}/>
          </Route>
          </Route>
          <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_MOVS]} />}>
            <Route path="/movies" element={<MoviePageComp/>}>
              <Route path="add-movie" element={<AddMovieComp/>}/>
              <Route path="show-movies" element={<AllMoviesComp/>}/>
              <Route path="edit-movie/:id" element={<EditMovieComp/>}/>
              <Route path=":id" element={<MovieComp ifApi={true}/>}/>
            </Route>
          </Route>
          <Route element={<Authorization permissions={[PERMISSIONS.CAN_VIEW_SUBS]} />}>
          <Route path="/members" element={<MembersPageComp/>}>
            <Route path=":id" element={<MemberComp ifApi={true}/>}/>
            <Route path="show-members" element={<AllMembersComp/>}/>
            <Route path="add-member" element={<AddMemberComp/>}/>
            <Route path="edit-member/:id" element={<EditMemberComp/>}/>
          </Route>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default RoutesComp

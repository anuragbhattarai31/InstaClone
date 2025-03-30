import Home from "./Home"
import Notifications from "./Notifications"
import Search from "./Search"
import CreatePost from "./CreatePost"
import ProfileLink from "./ProfileLink"

const SidebarItems = () => {
  return (
    <>
    <Home/>
    <Search/>
    <Notifications/>
    <CreatePost/>
    <ProfileLink/>
    </>
  )
}

export default SidebarItems
import SidebarLayout from "../components/SidebarLayout";
import Profile from "../components/Profile";

export default function ProfilePage(){
    return (
        <div className="flex min-h-screen">
        <SidebarLayout />
        <Profile />
        </div>
    );

}
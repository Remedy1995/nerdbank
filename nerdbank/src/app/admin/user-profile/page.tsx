import AuthGuard from "../admin-guards/protectedRoutes";
import UserProfile from "../user-profile/defaultLayout";

const ProtectedPage = ()=> {

      return (
           <AuthGuard>
            <UserProfile/>
            </AuthGuard>

          )
    }

export default ProtectedPage;
import AuthGuard from "../admin-guards/protectedRoutes";
import Dashboard from "../dashboard/defaultLayout";

const ProtectedPage = ()=> {

      return (
           <AuthGuard>
            <Dashboard/>
            </AuthGuard>

          )
    }

export default ProtectedPage;
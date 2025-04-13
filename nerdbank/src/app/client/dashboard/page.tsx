import AuthGuard from "../client-guards/protectedRoutes";
import Dashboard from "../dashboard/defaultLayout";

 const ProtectedPage = ()=> {

      return (
          <AuthGuard>
            <Dashboard/>
          </AuthGuard>
          )
    }

export default ProtectedPage;
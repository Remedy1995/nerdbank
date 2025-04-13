import AuthGuard from "../admin-guards/protectedRoutes";
import CreateAccount from "../create-account/defaultLayout";

const ProtectedPage = ()=> {

      return (
           <AuthGuard>
            <CreateAccount/>
            </AuthGuard>

          )
    }

export default ProtectedPage;
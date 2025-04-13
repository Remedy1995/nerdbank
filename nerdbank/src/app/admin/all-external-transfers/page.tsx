import AuthGuard from "../admin-guards/protectedRoutes";
import AllExternalTransfers from "../all-external-transfers/defaultlayout";

 const ProtectedPage = ()=> {

      return (
          <AuthGuard>
            <AllExternalTransfers/>
           </AuthGuard>
          )
    }

export default ProtectedPage;
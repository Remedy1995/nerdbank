import AuthGuard from "../admin-guards/protectedRoutes";
import AllSelfTransfers from "../all-self-transfers/defaultlayout";

 const ProtectedPage = ()=> {

      return (
          <AuthGuard>
            <AllSelfTransfers/>
           </AuthGuard>
          )
    }

export default ProtectedPage;
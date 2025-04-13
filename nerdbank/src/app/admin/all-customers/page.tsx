import AuthGuard from "../admin-guards/protectedRoutes";
import AllCustomers from "../all-customers/defaultlayout";

const ProtectedPage = ()=> {
return(
   <AuthGuard>
   <AllCustomers/>
    </AuthGuard>
    )
    }

export default ProtectedPage;
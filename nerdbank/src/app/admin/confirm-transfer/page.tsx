import AuthGuard from "../admin-guards/protectedRoutes";
import ConfirmTransfer from "../confirm-transfer/defaultLayout";

const ProtectedPage = ()=> {

      return (
           <AuthGuard>
            <ConfirmTransfer/>
            </AuthGuard>

          )
    }

export default ProtectedPage;
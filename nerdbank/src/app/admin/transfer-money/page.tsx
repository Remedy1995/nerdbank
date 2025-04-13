import AuthGuard from "../admin-guards/protectedRoutes";
import TransferMoney from "../transfer-money/defaultLayout";

const ProtectedPage = ()=> {

      return (
           <AuthGuard>
            <TransferMoney/>
            </AuthGuard>

          )
    }

export default ProtectedPage;
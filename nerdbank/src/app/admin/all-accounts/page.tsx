import AuthGuard from "../admin-guards/protectedRoutes";
import AllAccounts from "../all-accounts/defaultlayout";

const ProtectedPage = () => {
  return <AllAccounts />;
};

export default ProtectedPage;

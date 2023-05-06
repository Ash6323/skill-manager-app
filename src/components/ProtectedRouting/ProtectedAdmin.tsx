import { Navigate } from "react-router-dom";

interface IProtected {
  children: any;
}

const ProtectedAdmin: React.FC<IProtected> = ({ children }) => {

  const user = JSON.parse(localStorage.getItem("User") || "{}");
  if (!user.token) {
    return <Navigate to="/" />;
  }
  if(user.role != "Admin") {
    return <Navigate to="/" />;
  }

  return children;
}
export default ProtectedAdmin;
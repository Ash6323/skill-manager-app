import { Navigate } from "react-router-dom";

interface IProtected {
  children: any;
}

const ProtectedEmployee: React.FC<IProtected> = ({ children }) => {

  const user = JSON.parse(localStorage.getItem("User") || "{}");
  if (!user.token && user.role !== "Employee") {
    return <Navigate to="/" />;
  }
  if(user.role !== "Employee") {
    return <Navigate to="/" />;
  }
  
  return children;
}
export default ProtectedEmployee;
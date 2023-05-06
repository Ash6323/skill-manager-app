import { Navigate } from "react-router-dom";

interface IProtected {
  children: any;
}

const Protected: React.FC<IProtected> = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("User") || "{}");

  if (!user.token) {
    return <Navigate to="/" />;
  }

  return children;
}
export default Protected;
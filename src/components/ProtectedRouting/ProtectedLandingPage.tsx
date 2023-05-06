import { Navigate } from "react-router-dom";

interface IProtected {
  children: any;
}

const ProtectedLandingPage: React.FC<IProtected> = ({ children }) => {

  const user = JSON.parse(localStorage.getItem("User") || "{}");
  if (user.token ) {
    localStorage.clear();
  }

  return children;
}
export default ProtectedLandingPage;
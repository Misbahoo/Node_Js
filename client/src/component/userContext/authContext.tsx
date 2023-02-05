import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [theUser, setTheUser] = useState({});
  return (
    <UserContext.Provider value={{ theUser, setTheUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

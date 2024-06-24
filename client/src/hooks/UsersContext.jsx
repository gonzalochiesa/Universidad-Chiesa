import React, { createContext, useContext, useState } from "react";

const UsersContext = createContext();

export const useUsersContext = () => {
  return useContext(UsersContext);
};

export const UsersProvider = ({ children }) => {
  const [usersContext, setUsersContext] = useState({
    isLoggedIn: false,
    role: "guest",
  });

  return (
    <UsersContext.Provider value={{ usersContext, setUsersContext }}>
      {children}
    </UsersContext.Provider>
  );
};

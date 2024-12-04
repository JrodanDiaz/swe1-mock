import { createContext, useState, useContext, SetStateAction, useEffect } from "react";
import { User } from "../types";
import { getJWT, getUsername } from "../utilts";

// Create two contexts
const UserContext = createContext<User | null>(null);
const SetUserContext = createContext<React.Dispatch<SetStateAction<User>> | null>(null);

// UserContextProvider component
export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState({
    username: "",
    isAdmin: false,
  });

  const jwt = getJWT();
  const username = getUsername();

  useEffect(() => {
    setUser((prev) => ({ username: username, isAdmin: !!jwt && username === "jordan" }));
  }, []);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>{children}</SetUserContext.Provider>
    </UserContext.Provider>
  );
};

// Custom hook to use user context
export const useUser = () => {
  const user = useContext(UserContext);
  if (!user) {
    throw new Error("useUser must be used within a UserContextProvider");
  }
  return user;
};

// Custom hook to use setUser context
export const useSetUser = () => {
  const setUser = useContext(SetUserContext);
  if (!setUser) {
    throw new Error("useSetUser must be used within a UserContextProvider");
  }
  return setUser;
};

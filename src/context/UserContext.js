import { createContext } from "react";

const UserContext = createContext({
  user: null,
  isAuthenticated: false,

  setUser: () => {},
  clearUser: () => {},
});

export default UserContext;

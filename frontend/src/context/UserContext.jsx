import { useContext, createContext } from "react";

// Reference: https://react.dev/reference/react/useContext
export const UserContext = createContext(null);

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === null) {
    console.warn("useUser must be used within a UserContext.Provider");
  }

  return context;
};

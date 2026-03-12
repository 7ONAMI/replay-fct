import { createContext, useContext } from "react";
import { useUserLibrary } from "../hooks/useUserLibrary";

const LibraryContext = createContext();

export const LibraryProvider = ({ children }) => {
  const library = useUserLibrary();
  return (
    <LibraryContext.Provider value={library}>
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = () => useContext(LibraryContext);

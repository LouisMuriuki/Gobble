import { createContext } from "react";

const CategoriesContext = createContext({});

export const CategoriesContextProvider = ({ children }) => {
  return (
    <CategoriesContext.Provider value={{}}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;

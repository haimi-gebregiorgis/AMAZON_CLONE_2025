import React, { createContext, useReducer } from "react"

export const DataContext = createContext()

export const DataProvider = ({ children, reducer, initialState }) => {
  return (
    <DataContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </DataContext.Provider>
  );
};


// import React, { createContext, useReducer } from "react";

// // Create the context
// export const DataContext = createContext();

// // Create the provider component
// export const DataProvider = ({ children, reducer, initialState }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <DataContext.Provider value={[state, dispatch]}>
//       {children}
//     </DataContext.Provider>
//   );
// };

import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  return (
    <AppContext.Provider value={{ cart, setCart, favorites, setFavorites }}>
      {children}
    </AppContext.Provider>
  );
};

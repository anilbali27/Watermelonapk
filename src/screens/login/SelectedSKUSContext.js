// SelectedSKUSContext.js

// SelectedSKUSContext.js

import React, { useState, createContext } from 'react';

const SelectedSKUSContext = createContext();

const SelectedSKUSProvider = ({ children }) => {
  const [selectedSKUS, setSelectedSKUS] = useState([]);

  return (
    <SelectedSKUSContext.Provider value={[selectedSKUS, setSelectedSKUS]}>
      {children}
    </SelectedSKUSContext.Provider>
  );
};

export { SelectedSKUSContext, SelectedSKUSProvider };

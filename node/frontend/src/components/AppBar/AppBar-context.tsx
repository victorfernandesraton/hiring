import { createContext, useCallback, useContext, useState } from "react";

export type AppBarContextType = {
  mobileOpen: boolean;
  setMobileOpen: () => void;
};

export const AppBarContext = createContext<AppBarContextType>({
  mobileOpen: false,
  setMobileOpen: () => {},
});

export const useAppBarContext = () => useContext(AppBarContext);

const AppBarProvider: React.FC = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(true);

  const handleToggle = useCallback(
    () => setMobileOpen(!mobileOpen),
    [mobileOpen]
  );

  return (
    <AppBarContext.Provider value={{ mobileOpen, setMobileOpen: handleToggle }}>
      {children}
    </AppBarContext.Provider>
  );
};

export default AppBarProvider;

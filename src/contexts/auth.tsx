import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { AuthProviderProps, User } from "utils/interface";

export const AuthProvider = (props: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [error, setError] = useState<any>();
  const [loadingInitial, setLoadingInitial] = useState<boolean>(true);

  const location = useLocation();

  useEffect(() => {
    if (error) setError(null);
  }, [error, location.pathname]);

  useEffect(() => {
    if (localStorage.getItem("pokedex")) {
      const storageData: User = JSON.parse(
        localStorage.getItem("pokedex") || ""
      );
      setCurrentUser(storageData);
      setLoadingInitial(false);
    } else {
      setLoadingInitial(false);
    }
  }, []);

  const UpdateUser = (name: string, dob: number) => {
    if (localStorage.getItem("pokedex")) {
      const storageData: User = JSON.parse(
        localStorage.getItem("pokedex") || ""
      );
      storageData.name = name;
      storageData.dob = dob;
      localStorage.setItem("pokedex", JSON.stringify(storageData));
    } else {
      localStorage.setItem(
        "pokedex",
        JSON.stringify({
          name,
          dob,
        })
      );
    }
  };

  const memorizedReturnValue = useMemo(
    () => ({
      currentUser,
      error,
      UpdateUser,
    }),
    [currentUser, error]
  );

  return (
    <AuthContext.Provider value={memorizedReturnValue}>
      {!loadingInitial && props.children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}

export type AuthContextShape = {
  currentUser?: User;
  error: any;
  UpdateUser: (name: string, dob: number) => void;
};

export const AuthContext = createContext({} as AuthContextShape);

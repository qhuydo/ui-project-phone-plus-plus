import { createContext, useCallback, useContext, useMemo } from "react";
import { useLocalStorage } from "hooks";
import PropTypes from "prop-types";

const AuthContext = createContext({
  isAuth: false,
  user: null,
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("auth", undefined);

  const signIn = useCallback(() => {
    setUser({
      name: "Huy cbd",
      avatar: "https://i1.sndcdn.com/avatars-000098677007-iayi3j-t500x500.jpg",
    });
  }, [setUser]);

  const signOut = useCallback(
    (cb) => {
      setUser(null);
      cb();
    },
    [setUser]
  );

  const contextValue = useMemo(() => {
    return {
      isAuth: !!user,
      user: user,
      signIn: signIn,
      signOut: signOut,
    };
  }, [signIn, signOut, user]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.element,
};

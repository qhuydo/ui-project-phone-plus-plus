import { users } from "features/auth/assets";
import { random } from "lodash-es";
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
    let user = {
      ...users[random(users.length - 1)],
    };
    delete user.password;
    setUser(user);
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

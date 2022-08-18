import { users } from "features/auth/assets";
import { provinces } from "features/payment/assets";
import { random } from "lodash-es";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from "react";
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

  useEffect(() => {
    if (user) {
      const commune =
        provinces[user.provinceId]?.districts?.[user.districtId]?.communes?.[
          user.communeId
        ];
      if (!commune) {
        signOut(() => {});
      }
    }
  }, [signOut, user]);

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

import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";

interface AuthProps {
  authState?: { token: string | null; authenticated: boolean | null };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
}

const TOKEN_KEY = "Token";

export const REGISTER_URL =
  "https://run.mocky.io/v3/2677ab4f-6bfd-4c4e-b4f3-905044e20db3";

export const LOGIN_URL =
  "https://run.mocky.io/v3/300e4152-17a0-467e-9c9a-53756a9356c2";

const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: false,
  });

  // useEffect(() => {
  //   const loadToken = async () => {
  //     const token = await SecureStore.getItemAsync(TOKEN_KEY);

  //     if (token) {
  //       setAuthState({
  //         token: token,
  //         authenticated: true,
  //       });
  //     }
  //   };

  //   loadToken();
  // }, []);

  const register = async (email: string, password: string) => {
    try {
      const response = await fetch(`${REGISTER_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Can't register user");
      }

      const data = await response.json();

      return data;
    } catch (error) {
      throw new Error("Can't register user");
    }
  };

  const login = async (email: string, password: string) => {
    // try {
    //   const response = await fetch(`${LOGIN_URL}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     // body: JSON.stringify({ email, password }),
    //   });

    //   if (!response.ok) {
    //     throw new Error("Can't login user");
    //   }

    //   const data = await response.json();

    //   setAuthState({
    //     token: data.token,
    //     authenticated: true,
    //   });

    //   await SecureStore.setItemAsync(TOKEN_KEY, data.token);
    //   return data;
    // } catch (error) {
    //   throw new Error("Can't login user");
    // }

    // await SecureStore.setItemAsync("isAuthenticated", JSON.stringify(true));

    setAuthState({
      token: null,
      authenticated: true,
    });
  };

  const logout = async () => {
    // await SecureStore.deleteItemAsync("isAuthenticated");
    // await SecureStore.deleteItemAsync(TOKEN_KEY);

    setAuthState({
      token: null,
      authenticated: false,
    });
  };

  const value = {
    authState,
    onRegister: register,
    onLogin: login,
    onLogout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

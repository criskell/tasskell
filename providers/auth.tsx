import { auth } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
  UserCredential,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export type AuthenticationParams = {
  email: string;
  password: string;
};

export type AuthContext = {
  user: User | null;
  signUp: (data: AuthenticationParams) => Promise<UserCredential>;
  signIn: (data: AuthenticationParams) => Promise<UserCredential>;
  resetPassword: (email: string) => Promise<void>;
};

const AuthContext = createContext<AuthContext | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);

  const signUp = async (user: AuthenticationParams) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      setUser(credential.user);

      return credential;
    } catch (error) {
      throw new Error("Sign up failed: ", { cause: error });
    }
  };

  const signIn = async (user: AuthenticationParams) => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        user.email,
        user.password
      );

      setUser(credential.user);

      console.log("bizarro kk");

      return credential;
    } catch (error) {
      throw new Error("Sign in failed: ", { cause: error });
    }
  };

  const resetPassword = async (email: string) => {
    try {
      return await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw new Error("Reset password failed: ", { cause: error });
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signUp,
        signIn,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);

  if (!auth) {
    throw new Error("Authentication context not found");
  }

  return auth;
};

export const useUser = () => {
  const { user } = useAuth();

  if (!user) {
    throw new Error("User not defined.");
  }

  return user;
};

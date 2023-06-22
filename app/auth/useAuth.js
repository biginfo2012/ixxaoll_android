import { useContext } from "react";
import { AuthContext, authStorage } from "app/auth";

export default useAuth = () => {
    const { user, setUser } = useContext(AuthContext);

    const login = () => {
        authContext.setUser({ email, password });
        authStorage.storeToken(email);
    };

    const logout = () => {
        setUser(null);
        authStorage.removeToken();
    };

    return { user, setUser, login, logout };
};

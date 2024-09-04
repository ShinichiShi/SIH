import { createContext, useState, useEffect,useContext } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import PropTypes from 'prop-types';
// Create the context
export const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();

        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            // setLoading(false);
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ currentUser }}>
            {children}
        </AuthContext.Provider>
    );
};
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // 'children' is required and should be a valid React node
    // requiredRole: PropTypes.string,      // 'requiredRole' is optional but should be a string if provided
};


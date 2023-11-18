export const storeToken = (token) => {
    localStorage.setItem('token', token);
};

export const storeUser = (userId) => {
    localStorage.setItem('user', userId);
};

// Function to get the token
export const getToken = () => {
    return localStorage.getItem('token');
};

// Function to get the user
export const getUser = () => {
    return localStorage.getItem('user');
};

// Function to remove the token (for logout)
export const removeToken = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

// Function to check if the user is authenticated
export const isAuthenticated = () => {
    return getToken() != null;
};
const BASE_API = "http://103.57.221.113:3000/v1/";

const API = {
    baseUrl: BASE_API,
    authentication: {
        signIn: `${BASE_API}/auth/login`,
        customers: `${BASE_API}/customers`,
        supplier: `${BASE_API}/suppliers`,
        category: `${BASE_API}/categories`,
        product: `${BASE_API}/products`,
        users: `${BASE_API}/users/`,
        inventory: `${BASE_API}/inventories`,
    },
};

export default API;
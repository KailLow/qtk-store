// const BASE_API = "http://localhost:8080";
const BASE_API = "http://103.57.221.113:3000/v1/";

const API = {
    baseUrl: BASE_API,
    authentication: {
        signIn: `${BASE_API}/auth/login`,
        customers: `${BASE_API}/customers`,
        supplier: `${BASE_API}/suppliers`,
        category: `${BASE_API}/categories`,
    },
};

export default API;
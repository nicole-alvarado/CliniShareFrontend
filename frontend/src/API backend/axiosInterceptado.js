// import axios from "axios";

// const axiosInterceptado = axios.create();

// axiosInterceptado.interceptors.request.use(
//   async (config) => {
//     const usuario = await JSON.parse(
//       window.localStorage.getItem("loggedCliniShareAppUser")
//     );

//     config.headers["token"] = usuario.token;

//     return config;
//   },
//   (error) => {
//     console.error("✉️ ", error);
//     return Promise.reject(error);
//   }
// );

// export default axiosInterceptado;
import axios from "axios";

const axiosInterceptado = axios.create();

axiosInterceptado.interceptors.request.use(
  async (config) => {
    const usuario = await JSON.parse(
      window.localStorage.getItem("loggedCliniShareAppUser")
    );

    if (usuario && usuario.token) {
      config.headers["token"] = usuario.token;
    }

    return config;
  },
  (error) => {
    console.error("✉️ ", error);
    return Promise.reject(error);
  }
);

export default axiosInterceptado;

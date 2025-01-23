import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import axiosInstance, { setAccessToken } from "../components/api/axiosInstance";

export default function useUser() {
  // const navigate = useNavigate();
  const [user, setUser] = useState({ status: "fetching", data: null });

  useEffect(() => {
    axiosInstance("/tokens/refresh")
      .then(({ data }) => {
        setTimeout(() => {
          setUser({ status: "logged", data: data.user });
        }, 1000);
        setAccessToken(data.accessToken);
      })
      .catch(() => {
        setUser({ status: "guest", data: null });
        setAccessToken("");
      });
  }, []);

  const logoutHandler = () => {
    axiosInstance
      .get("/account/logout")
      .then(() => setUser({ status: "guest", data: null }));
    setAccessToken("");
  };

  const signUpHandler = (e) => {
    //
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    console.log(formData, "here dormdatra");

    if (!formData.email || !formData.password || !formData.name) {
      return alert("Заполните все поля!");
    }
    axiosInstance
      .post("/account/register", formData) // {name, pass, email, role}; role === client ? Cleint : Courier
      .then(({ data }) => {
        setUser({ status: "logged", data: data.user });
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password) {
      return alert("Отсутствуют обязательные поля!");
    }
    axiosInstance
      .post("/account/login", formData)
      .then(({ data }) => {
        setUser({ status: "logged", data: data.user });
        console.log(formData, "signInHandler on Front");
      })
      .catch((error) => {
        alert("Неправильный адрес электронной почты или пароль");
        console.log(error);
      });
  };

  return {
    user,
    signInHandler,
    signUpHandler,
    logoutHandler,
  };
}

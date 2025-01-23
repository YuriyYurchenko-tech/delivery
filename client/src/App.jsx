// import { useEffect } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ProtectedRouter from "./components/hoc/ProtectedRoute";
import Layout from "./components/Layout";
import MainPage from "./components/pages/MainPage";
import AccountLoginPage from "./components/pages/AccountLoginPage";
import AccountNewPage from "./components/pages/AccountNewPage";
import useUser from "./hooks/useUser";
import { useEffect, useState } from "react";
import axiosInstance from "./components/api/axiosInstance";
import UiOneOrderfromMain from "./components/ui/UiOneOrderfromMain";
import CourierCabinet from "./components/pages/CourierCabinet";
import OneOrderfromMain from "./components/pages/OneOrderfromMain";
import AddNewOrderPage from "./components/pages/AddNewOrderPage";

function App() {
  const { logoutHandler, signInHandler, signUpHandler, user } = useUser();
  const [allOrder, setAllOrder] = useState([]);
  const [orders, setOrders] = useState([]);

  console.log(user);

  // useEffect(() => {
  //   axiosInstance.get("/orders").then((res) => setAllOrder(res.data));
  // }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await axiosInstance.delete(`/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order.id !== id));
    } catch (error) {
      console.log(error);
    }
  };
  // user.data.role= "client" || "courier"

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout user={user} logoutHandler={logoutHandler} />,
      children: [
        {
          path: "/",
          element: <MainPage user={user} />,
        },
        {
          path: "/orders/add",
          element: <AddNewOrderPage />,
        },
        {
          element: (
            <ProtectedRouter
              user={user}
              isAllowed={user.status !== "logged"}
              redirectPath={
                user?.data?.role === "client" ? "/" : "/couriercabinet"
              }
            />
          ),
          children: [
            {
              path: "/account/new",
              element: (
                <AccountNewPage user={user} signUpHandler={signUpHandler} />
              ),
            },
            {
              path: "/account/login",
              element: <AccountLoginPage signInHandler={signInHandler} />,
            },
          ],
        },

        {

          path: "/couriercabinet",

          element: <CourierCabinet />,
        },
        {
          path: "/orders/:id",
          element: <OneOrderfromMain />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

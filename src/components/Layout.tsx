import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import Aos from "aos";
import BottomNav from "./BottomNav";
import ToastContainer from "./ToastContainer";

export default function Layout(): JSX.Element {
  useEffect(() => {
    window.scrollTo(0, 0);
    Aos.init({
      duration: 1200,
      once: true,
    });
  }, []);
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <CustomCursor />
      <Footer />
      <BottomNav />
      <ToastContainer />
    </>
  );
}

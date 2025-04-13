"use client";
import Header from "../components/client-header";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import { useAuthStatus } from "../fetchAuthStatus";

export default function Unauthorised() {
   const { data } : any = useAuthStatus();
   

  const { isAdmin }  = data?.userInfo?.message ?? false;
  console.log('isAdmin:', isAdmin);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeoutID = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeoutID); // Cleanup timeout on unmount
  }, []);

  return (
    <div>
      {loading && (
        <div id="preloader">
          <div data-loader="dual-ring"></div>
        </div>
      )}
      <div id="main-wrapper">
        <Header />
        <div id="content">
          <section className="section">
            <div className="container text-center">
              <h2 className="text-25 mb-0">403</h2>
              <h3 className="text-6 mb-3">Oops! Sorry you are not allowed to access this page</h3>
              <p className="text-3 text-muted">
               Please contact your administrator for assistance.
              </p>
              <a href={!isAdmin?"/client/dashboard":"/admin/dashboard"} className="btn btn-primary shadow-none px-5 m-2">
                Home
              </a>

            </div>
          </section>
        </div>
        <Footer />
      </div>
      <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href="#">
        <i className="fa fa-chevron-up"></i>
      </a>

      {/* Styles Switcher */}
      <div id="styles-switcher" className="left">
        <h2 className="text-3">Color Switcher</h2>
        <hr />
        <ul>
          <li className="blue" data-bs-toggle="tooltip" title="Blue" data-path="css/color-blue.css"></li>
          <li className="indigo" data-bs-toggle="tooltip" title="Indigo" data-path="css/color-indigo.css"></li>
          <li className="purple" data-bs-toggle="tooltip" title="Purple" data-path="css/color-purple.css"></li>
          <li className="pink" data-bs-toggle="tooltip" title="Pink" data-path="css/color-pink.css"></li>
          <li className="red" data-bs-toggle="tooltip" title="Red" data-path="css/color-red.css"></li>
          <li className="orange" data-bs-toggle="tooltip" title="Orange" data-path="css/color-orange.css"></li>
          <li className="yellow" data-bs-toggle="tooltip" title="Yellow" data-path="css/color-yellow.css"></li>
          <li className="teal" data-bs-toggle="tooltip" title="Teal" data-path="css/color-teal.css"></li>
          <li className="cyan" data-bs-toggle="tooltip" title="Cyan" data-path="css/color-cyan.css"></li>
          <li className="brown" data-bs-toggle="tooltip" title="Brown" data-path="css/color-brown.css"></li>
        </ul>
        <button className="btn btn-dark btn-sm border-0 fw-400 rounded-0 shadow-none" id="reset-color">
          Reset Default
        </button>
        <button className="btn switcher-toggle">
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </div>
  );
}

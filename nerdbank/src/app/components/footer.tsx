

"use client";

export default function Footer(){
    return (
        <footer id="footer">
        <div className="container">
          <div className="row">
            {/*
            <div className="col-lg d-lg-flex align-items-center">
              <ul className="nav justify-content-center justify-content-lg-start text-3">
                <li className="nav-item"> <a className="nav-link active" href="#">About Us</a></li>
                <li className="nav-item"> <a className="nav-link" href="#">Support</a></li>
                <li className="nav-item"> <a className="nav-link" href="#">Help</a></li>
                <li className="nav-item"> <a className="nav-link" href="#">Careers</a></li>
                <li className="nav-item"> <a className="nav-link" href="#">Affiliate</a></li>
                <li className="nav-item"> <a className="nav-link" href="#">Fees</a></li>
              </ul>
            </div>
*/}
           {/* <div className="col-lg d-lg-flex justify-content-lg-end mt-3 mt-lg-0">
              <ul className="social-icons justify-content-center">
                <li className="social-icons-facebook"><a data-bs-toggle="tooltip" href="http://www.facebook.com/" target="_blank" title="Facebook"><i className="fab fa-facebook-f"></i></a></li>
                <li className="social-icons-twitter"><a data-bs-toggle="tooltip" href="http://www.twitter.com/" target="_blank" title="Twitter"><i className="fab fa-twitter"></i></a></li>
                <li className="social-icons-google"><a data-bs-toggle="tooltip" href="http://www.google.com/" target="_blank" title="Google"><i className="fab fa-google"></i></a></li>
                <li className="social-icons-youtube"><a data-bs-toggle="tooltip" href="http://www.youtube.com/" target="_blank" title="Youtube"><i className="fab fa-youtube"></i></a></li>
              </ul>
            </div>
            */}
          </div>
          <div className="footer-copyright pt-3 pt-lg-2 mt-2">
            <div className="row">
              <div className="col-lg">
                <p className="text-center text-lg-start mb-2 mb-lg-0">Copyright &copy; 2025 <a href="/dashboard"> NerdBank </a>. All Rights Reserved.</p>
              </div>
             {/*}
              <div className="col-lg d-lg-flex align-items-center justify-content-lg-end">
                <ul className="nav justify-content-center">
                  <li className="nav-item"> <a className="nav-link active" href="#">Security</a></li>
                  <li className="nav-item"> <a className="nav-link" href="#">Terms</a></li>
                  <li className="nav-item"> <a className="nav-link" href="#">Privacy</a></li>
                </ul>
              </div>
              */}
            </div>
          </div>
        </div>
      </footer>
    )
}
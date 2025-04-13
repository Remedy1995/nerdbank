

import Image from "next/image"
import { useQuery } from "@tanstack/react-query";
import { fetchGetUserInformation } from "../../../bankapi/bankapiComponents";
import { HandleLogout  } from "../hooks/hooks";


export default function Header() {
     const {Logout} = HandleLogout()
  type ApiResponse = {
    message: {
      firstname: string | ""
      lastname: string | ""
      phone: string | ""
      email: string | ""
    }
  }

  const { data: userInfo } = useQuery<ApiResponse>({
    queryKey: ["userinfo"],
    queryFn: async () => {
      const result = await fetchGetUserInformation({});

      if (!result) {
        //fallback
        return {
          message: { firstname: "", lastname: "", phone: "", email: "" }
        };
      }
      return result;
    },
  });


  const { message } = userInfo || {}





    return (
              <header id="header">
                <div className="container">
                  <div className="header-row">
                    <div className="header-column justify-content-start">

                      <div className="logo me-3">
                        <a className="d-flex" href="/client/dashboard" title="NerdBank - HTML Template">
                          <h3 className="text-primary">Nerd Bank</h3>
                          {/* <Image src="/images/logo.png" alt="NerdBank" width={120}  height={35}/> */}
                          </a> </div>

                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#header-nav"> <span></span> <span></span> <span></span> </button>



                      <nav className="primary-menu navbar navbar-expand-sm">
                        <div id="header-nav" className="collapse navbar-collapse">
                          <ul className="navbar-nav me-auto">
                            <li className="active text-gray-900"><a href="/client/dashboard">Dashboard</a></li>
                            <li className="text-emerald-900"><a href="/client/transfer-money">Transfer Funds</a></li>
                             {/*<li><a href="send-money.html">Send/Request</a></li>*/}
                           {/* <li><a href="help.html">Help</a></li>*/}
                            <li className="nav-item dropdown"> <a className="nav-link dropdown-toggle" href="#" id="transferDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Transfer History</a>
                              <ul className="dropdown-menu mx-4" aria-labelled="transferDropdown">
                                <li><a className="dropdown-item mx-4" href="/client/all-self-transfers">Self Transfers</a></li>
                                <li><a className="dropdown-item mx-4" href="/client/all-external-transfers">External Transfers</a></li>
                                  {/* <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="/all-self-transfers">Self Transfers</a></li>
                                    <li><a className="dropdown-item" href="/all-external-transfers">External Transfers</a></li>
                                    {/* <li><a className="dropdown-item" href="feature-header-primary.html">Primary Version</a></li>
                                    <li><a className="dropdown-item" href="index-2.html">Transparent Version</a></li>
                                  </ul> */}
                                {/* <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Navigation DropDown</a>
                                  <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="index.html">Light Version (Default)</a></li>
                                    <li><a className="dropdown-item" href="feature-navigation-dropdown-dark.html">Dark Version</a></li>
                                    <li><a className="dropdown-item" href="feature-navigation-dropdown-primary.html">Primary Version</a></li>
                                  </ul>
                                </li> */}
                                {/* <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Second Navigation</a>
                                  <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="send-money.html">Default Version</a></li>
                                    <li><a className="dropdown-item" href="deposit-money.html">Alternate Version</a></li>
                                  </ul>
                                </li> */}
                                {/* <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Page Headers</a>
                                  <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="feature-page-header-left-alignment.html">Left Alignment</a></li>
                                    <li><a className="dropdown-item" href="feature-page-header-center-alignment.html">Center Alignment</a></li>
                                    <li><a className="dropdown-item" href="feature-page-header-light.html">Light Version</a></li>
                                    <li><a className="dropdown-item" href="feature-page-header-dark.html">Dark Version</a></li>
                                    <li><a className="dropdown-item" href="feature-page-header-primary.html">Primary Version</a></li>
                                    <li><a className="dropdown-item" href="feature-page-header-custom-background.html">Custom Background</a></li>
                                    <li><a className="dropdown-item" href="feature-page-header-custom-background-with-transparent-header.html">Custom Background 2</a></li>
                                  </ul>
                                </li> */}
                                {/* <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Footer</a>
                                  <ul className="dropdown-menu">
                                    <li><a className="dropdown-item" href="index.html">Light Version Default</a></li>
                                    <li><a className="dropdown-item" href="index-2.html">Alternate Version</a></li>
                                    <li><a className="dropdown-item" href="feature-footer-dark.html">Dark Version</a></li>
                                    <li><a className="dropdown-item" href="feature-footer-primary.html">Primary Version</a></li>
                                  </ul>
                                </li> */}
                                {/* <li><a className="dropdown-item" href="feature-layout-boxed.html">Layout Boxed</a></li> */}
                              </ul>
                            </li>
                            {/* <li className="dropdown dropdown-mega"> <a className="dropdown-toggle" href="#">Pages</a>
                              <ul className="dropdown-menu">
                                <li>
                                  <div className="dropdown-mega-content">
                                    <div className="row">
                                      <div className="col-lg"> <span className="sub-title">Homepage</span>
                                        <ul className="dropdown-mega-submenu">
                                          <li><a className="dropdown-item" href="index.html">Home Version 1</a></li>
                                          <li><a className="dropdown-item" href="index-2.html">Home Version 2</a></li>
                                          <li><a className="dropdown-item" href="landing-page-send.html">Landing Page - Send</a></li>
                                          <li><a className="dropdown-item" href="landing-page-receive.html">Landing Page - Receive</a></li>
                                        </ul>
                                      </div>
                                      <div className="col-lg"> <span className="sub-title">Account</span>
                                        <ul className="dropdown-mega-submenu">
                                          <li><a className="dropdown-item" href="settings-profile.html">My Profile</a></li>
                                          <li><a className="dropdown-item" href="settings-security.html">Security</a></li>
                                          <li><a className="dropdown-item" href="settings-payment-methods.html">Payment Methods</a></li>
                                          <li><a className="dropdown-item" href="settings-notifications.html">Notifications</a></li>
                                          <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Login</a>
                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item" href="login.html">Login Page 1</a></li>
                                              <li><a className="dropdown-item" href="login-2.html">Login Page 2</a></li>
                                              <li><a className="dropdown-item" href="login-3.html">Login Page 3</a></li>
                                            </ul>
                                          </li>
                                          <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Signup</a>
                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item" href="signup.html">Signup Page 1</a></li>
                                              <li><a className="dropdown-item" href="signup-2.html">Signup Page 2 </a></li>
                                              <li><a className="dropdown-item" href="signup-3.html">Signup Page 3 </a></li>
                                            </ul>
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="col-lg"> <span className="sub-title">Dashboard</span>
                                        <ul className="dropdown-mega-submenu">
                                          <li><a className="dropdown-item" href="dashboard.html">Dashboard</a></li>
                                          <li><a className="dropdown-item" href="transactions.html">Transactions</a></li>
                                          <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Send Money</a>
                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item" href="send-money.html">Send Money</a></li>
                                              <li><a className="dropdown-item" href="send-money-confirm.html">Send Money Confirm</a></li>
                                              <li><a className="dropdown-item" href="send-money-success.html">Send Money Success </a></li>
                                            </ul>
                                          </li>
                                          <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Request Money</a>
                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item" href="request-money.html">Request Money</a></li>
                                              <li><a className="dropdown-item" href="request-money-confirm.html">Request Money Confirm</a></li>
                                              <li><a className="dropdown-item" href="request-money-success.html">Request Money Success </a></li>
                                            </ul>
                                          </li>
                                          <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Deposit Money</a>
                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item" href="deposit-money.html">Deposit Money</a></li>
                                              <li><a className="dropdown-item" href="deposit-money-confirm.html">Deposit Money Confirm</a></li>
                                              <li><a className="dropdown-item" href="deposit-money-success.html">Deposit Money Success </a></li>
                                            </ul>
                                          </li>
                                          <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Withdraw Money</a>
                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item" href="withdraw-money.html">Withdraw Money</a></li>
                                              <li><a className="dropdown-item" href="withdraw-money-confirm.html">Withdraw Money Confirm</a></li>
                                              <li><a className="dropdown-item" href="withdraw-money-success.html">Withdraw Money Success </a></li>
                                            </ul>
                                          </li>
                                          <li><a className="dropdown-item" href="notifications.html">Notifications</a></li>
                                        </ul>
                                      </div>
                                      <div className="col-lg"> <span className="sub-title">Blog</span>
                                        <ul className="dropdown-mega-submenu">
                                          <li><a className="dropdown-item" href="blog.html">Blog Standard</a></li>
                                          <li><a className="dropdown-item" href="blog-grid.html">Blog Grid</a></li>
                                          <li><a className="dropdown-item" href="blog-list.html">Blog List</a></li>
                                          <li><a className="dropdown-item" href="blog-single.html">Blog Single Right Sidebar</a></li>
                                          <li><a className="dropdown-item" href="blog-single-left-sidebar.html">Blog Single Left Sidebar</a></li>
                                        </ul>
                                      </div>
                                      <div className="col-lg"> <span className="sub-title">Others</span>
                                        <ul className="dropdown-mega-submenu">
                                          <li><a className="dropdown-item" href="about-us.html">About Us</a></li>
                                          <li><a className="dropdown-item" href="fees.html">Fees</a></li>
                                          <li><a className="dropdown-item" href="help.html">Help</a></li>
                                          <li><a className="dropdown-item" href="contact-us.html">Contact Us</a></li>
                                          <li><a className="dropdown-item" href="404.html">404</a></li>
                                          <li><a className="dropdown-item" href="coming-soon.html" target="_blank">Coming Soon</a></li>
                                          <li className="dropdown"><a className="dropdown-item dropdown-toggle" href="#">Elements</a>
                                            <ul className="dropdown-menu">
                                              <li><a className="dropdown-item" href="elements.html">Elements 1</a></li>
                                              <li><a className="dropdown-item" href="elements-2.html">Elements 2</a></li>
                                            </ul>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              </ul>
                             </li>  */}
                          </ul>
                        </div>
                      </nav>

                    </div>
                    <div className="header-column justify-content-end">

                      <nav className="login-signup navbar navbar-expand">
                        <ul className="navbar-nav">
                          {/* <li className="dropdown language">
                         <a className="dropdown-toggle" href="#">En</a>
                           <ul className="dropdown-menu">
                              <li><a className="dropdown-item" href="#">English</a></li>
                              <li><a className="dropdown-item" href="#">French</a></li>
                              <li><a className="dropdown-item" href="#">Русский</a></li>
                              <li><a className="dropdown-item" href="#">简体中文</a></li>
                              <li><a className="dropdown-item" href="#">Türkçe</a></li>
                            </ul>
                          </li> */}
                          <li className="dropdown notifications">
              {/* <a className="dropdown-toggle" href="#"><span className="text-5"><i className="far fa-bell"></i></span><span className="count">3</span></a> */}
                           <ul className="dropdown-menu">
                             {/* <li className="text-center text-3 py-2">Notifications (3)</li> */}
                              <li className="dropdown-divider mx-n3"></li>
                              <li><a className="dropdown-item" href="#"><i className="fas fa-bell"></i>A new digital FIRC document is available for you to download<span className="text-1 text-muted d-block">22 Jul 2021</span></a></li>
                              <li><a className="dropdown-item" href="#"><i className="fas fa-bell"></i>Updates to our privacy policy. Please read.<span className="text-1 text-muted d-block">04 March 2021</span></a></li>
                              <li><a className="dropdown-item" href="#"><i className="fas fa-bell"></i>Update about NerdBank fees<span className="text-1 text-muted d-block">18 Feb 2021</span></a></li>
                              <li className="dropdown-divider mx-n3"></li>
                              <li><a className="dropdown-item text-center text-primary px-0" href="notifications.html">See all Notifications</a></li>
                             </ul>
                          </li>
                          <li className="nav-item dropdown "> <a className="nav-link dropdown-toggle px-0" href="#" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                            <Image className="rounded-circle" src="/images/avatar-user-icon-vector_97886-15026.avif" alt="" width={50} height={50}/></a>
                             <ul className="dropdown-menu profile-drop"  aria-labelledby="profileDropdown">
                              <li className="text-center text-3 py-2">Hi, {message?.firstname} {message?.lastname}</li>
                              <li className="dropdown-divider mx-n3"></li>
                              <li><a className="dropdown-item profile-down" href="/client/user-profile"><i className="fa fa-cog"></i>Account Settings</a></li>

                             {/*<li><a className="dropdown-item profile-down" href="settings-Security.html"><i className="fas fa-shield-alt"></i>Security</a></li>*/}
                             {/* <li><a className="dropdown-item profile-down" href="settings-payment-methods.html"><i className="fas fa-credit-card"></i>Payment Methods</a></li>*/}
                             {/*<li><a className="dropdown-item profile-down" href="settings-notifications.html"><i className="fas fa-bell"></i>Notifications</a></li>*/}
                              <li className="dropdown-divider mx-n3"></li>
                            {/*<li><a className="dropdown-item profile-down" href="help.html"><i className="fas fa-life-ring"></i>Need Help?</a></li>*/}
                              <li><a className="dropdown-item profile-down" href="#" onClick={Logout} ><i className="fas fa-sign-out-alt"></i>Sign Out</a></li>
                            </ul>
                          </li>
                        </ul>
                      </nav>

                    </div>
                  </div>
                </div>
              </header>
    )
}
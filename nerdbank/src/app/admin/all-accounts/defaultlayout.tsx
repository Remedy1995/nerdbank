"use client"
import Footer from "../../components/footer"
import Header from "../../components/admin-header"
import { useState } from "react"
import Sidebar from "../../components/sidebar"
import { useQuery } from "@tanstack/react-query";
import { fetchGetaccounts } from "../../../../bankapi/bankapiComponents";
import {useRouter} from 'next/navigation';
import Link from 'next/link';



export default function AllAccounts() {

   const router = useRouter();
  interface SingleAccount {
   accountBalance:number,
   accountBankName :string,
   accountBankRoutingTransitNumber:string,
   accountBankSwiftCode :string,
   accountName:
{isAdmin: boolean, _id: string, firstname: string, lastname:string, phone: string,email:string}
accountNumber :string,
accountPin:null,
accountStatus:string,
accountType:string,
createdAt:string
_id:string
  }



  interface BulkAccountData {
    [x: string]: string | SingleAccount[] | null,
     Account : SingleAccount[] | null
  }



  interface DocProps {
    doc: Record<string, number>
  }

  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const [selectedAccount,setSelectedAccount] = useState<Array<SingleAccount>>([])
  const [documents, setDocuments] = useState<DocProps>({
    doc: {
      totalpages: 0,
    }
  })

  const { data, isLoading } = useQuery({
    queryKey: ["Accounts", page, perPage],
    queryFn: async () => {
      const result = await fetchGetaccounts({
        queryParams: { page, perPage }
      });

      console.log('dfdfd', result)



      if (!result) {
        return { Account : null };
      }
      setDocuments({
        doc: result
      })
      return result['accounts'];
    },
  });


  console.log('ress', selectedAccount)


  console.log('all Documents', data)
  const pagesToShow = 5;
  const totalPages = documents.doc["totalpages"]
  const getPageNumbers = () => {
    const pages = [];
    let startPage = Math.max(2, page - Math.floor(pagesToShow / 2));
    const endPage = Math.min(totalPages - 1, startPage + pagesToShow - 1);
    if (totalPages > pagesToShow && endPage === totalPages - 1) {
      startPage = totalPages - pagesToShow;
    }
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  }

  const goToPage = (page: number) => {
    setPage(page);
  };

  console.log(data)

const viewAccount =(event :React.MouseEvent<HTMLElement>)=> {
    const target = event.currentTarget as HTMLElement;
     if(!data || !Array.isArray(data)) return;
    const getAccount = data && data?.filter((val) => target.id === val._id);
    console.log('getUsee',getAccount)
    setSelectedAccount(getAccount)
    }

const updateAccount =() => {
    console.log('ghfghgh')
     router.push('/admin/update-account')
    }
  return (<>
    {isLoading && <div id="preloader">
      <div data-loader="dual-ring"></div>
    </div>}

    <div id="main-wrapper">
      <Header />
      <div id="content" className="py-4">
        <div className="container">
          <div className="row">
            <Sidebar />
            <div className="col-lg-9">
              <h4 className="fw-400 mb-3"></h4>
              <div className="row">
                <div className="col mb-2">
                  <form id="filterTransactions">
                   <div className="row g-3 mb-3">
                       {/* <div className="col-sm-6 col-md-5">
                        <div className="position-relative">
                          <input id="dateRange" type="text" className="form-control" placeholder="Date Range" />
                          <span className="icon-inside"><i className="fas fa-calendar-alt"></i></span>
                        </div>
                       </div>

                      <div className="col-auto d-flex align-items-center me-auto form-group" data-bs-toggle="collapse"> <a className="btn-link" data-bs-toggle="collapse" href="#allFilters" aria-expanded="false" aria-controls="allFilters">All Filters<i className="fas fa-sliders-h text-3 ms-1"></i></a> </div>
                      <div className="col-auto d-flex align-items-center ms-auto">
                        <div className="dropdown"> <a className="text-muted btn-link" href="#" role="button" id="statements" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i className="fas fa-file-download text-3 me-1"></i>Statements</a>
                          <div className="dropdown-menu dropdown-menu-end" aria-labelledby="statements"> <a className="dropdown-item" href="#">CSV</a> <a className="dropdown-item" href="#">PDF</a> </div>
                        </div>
                      </div>
                      <div className="col-12 collapse" id="allFilters">
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" id="allTransactions" name="allFilters" defaultChecked />
                          <label className="form-check-label" htmlFor="allTransactions">All Transactions</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" id="paymentsSend" name="allFilters" />
                          <label className="form-check-label" htmlFor="paymentsSend">Payments Send</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" id="paymentsReceived" name="allFilters" />
                          <label className="form-check-label" htmlFor="paymentsReceived">Payments Received</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" id="refunds" name="allFilters" />
                          <label className="form-check-label" htmlFor="refunds">Refunds</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" id="withdrawal" name="allFilters" />
                          <label className="form-check-label" htmlFor="withdrawal">Withdrawal</label>
                        </div>
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" id="deposit" name="allFilters" />
                          <label className="form-check-label" htmlFor="deposit">Deposit</label>
                        </div>
                      </div>
*/}
                    </div>
                  </form>
                </div>

              </div>

              <div className="bg-white shadow-sm rounded py-4 mb-4">
                <h3 className="text-5 fw-400 d-flex align-items-center px-4 mb-4">All Accounts</h3>
                <div className="transaction-title py-2 px-4">
                  <div className="row">
                    <div className="col-2 d-none d-md-block"><span className="">Date</span></div>
                    <div className="col-3 col-md-2">Bank Name</div>
                     <div className="col-3 col-md-2">Account Type</div>
                    <div className="d-none col-2 d-md-block">Account Balance</div>
                       <div className="col-2 col-md-2 d-none d-md-block">Account Number</div>
                     <div className="col-3 col-md-1">View</div>

                  </div>
                </div>
                <div className="transaction-list">
                  {

                    Array.isArray(data) && data.map((val: SingleAccount) => {
                        let createdDate = new Date(val.createdAt);
                        let parseDate = `${ String(createdDate.getDate()).padStart(2,'0') + "-" + String(createdDate.getMonth()+1).padStart(2,'0') + "-" + createdDate.getFullYear()}`
                            console.log('my parseDate ',parseDate,createdDate)
                      return (

                        <div className="transaction-item px-4 py-3" data-bs-toggle="modal" data-bs-target="#transaction-detail" key={val?._id}>
                          <div className="row align-items-center flex-row">
                            <div className=" col-2 d-none d-md-block"> <span className="d-block text-lowercase">{parseDate}</span> <span className="d-block text-1 fw-300 text-uppercase"></span> </div>
                            <div className="col-3 col-md-2"> <span className="d-block  text-lowercase">{val.accountBankName}</span></div>
                               <div className="col-3 col-md-2"><span className="text-2 text-lowercase">{val.accountType}</span> </div>
                               <div className="col-2 d-none col-md-2 d-md-block"><span className="text-2 text-lowercase">{val.accountBalance}</span> </div>
                            <div className="d-none col-2 d-md-block"><span className="text-2 text-lowercase">{val.accountNumber}</span> </div>
                             <div className=" col-3 col-md-1"><a className="p-2 rounded w-100 bg-primary text-white text-center" style={{ cursor: 'pointer' }} id={val._id} onClick={(event) => viewAccount(event)}>
                              View
                      </a></div>

                          </div>
                        </div>
                      )
                    })

                  }

                </div>

                <div id="transaction-detail" className="modal fade" role="dialog" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered transaction-details" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="row g-0">
                          <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-start py-4">
                            <div className="my-auto text-center">
                              <div className="text-17 text-white my-3"><i className="fas fa-book"></i></div>
                              <h2 className="text-7 text-white my-3">{selectedAccount[0]?.accountBankName}</h2>
                                <p className="text-white">Account Number</p>
                              <div className="text-8 fw-500 text-white  lh-1">{selectedAccount[0]?.accountNumber}</div>
                                <div className="text-3 fw-200 text-white  lh-4 p-3">
                                <a href= {`/admin/update-account?accountId=${selectedAccount[0]?._id}`} className="text-white text-decoration-underline  p-2 "> Update Account Info</a>
                                </div>

                            </div>

                          </div>
                          <div className="col-sm-7">
                            <h5 className="text-5 fw-400 m-3">Account Details</h5>
                            <button type="button" className="btn-close text-2 position-absolute top-0 p-3 end-0" data-bs-dismiss="modal" />
                            <div className="px-3">
                              <ul className="list-unstyled">
                               <li className="mb-2"> First Name <span className="float-end text-3">{selectedAccount[0]?.accountName?.firstname}</span></li>
                                <li className="mb-2">Last Name <span className="float-end text-3">{selectedAccount[0]?.accountName?.lastname}</span></li>
                                 <li className="mb-2">Email <span className="float-end text-3">{selectedAccount[0]?.accountName?.email}</span></li>
                                <li className="mb-2"> Account Balance <span className="float-end text-3">{selectedAccount[0]?.accountBalance}</span></li>
                                <li className="mb-2"> Account Type <span className="float-end text-3">{selectedAccount[0]?.accountType}</span></li>
                                <li className="mb-2">Swift Code <span className="float-end text-3">{selectedAccount[0]?.accountBankSwiftCode}</span></li>
                                 <li className="mb-2">Routing Transit Number <span className="float-end text-3">{selectedAccount[0]?.accountBankRoutingTransitNumber}</span></li>
                                 <li className="mb-2">Account Status <span className="float-end text-3">{selectedAccount[0]?.accountStatus}</span></li>
                                 <li className="mb-2">Account Created <span className="float-end text-3">{selectedAccount[0]?.createdAt}</span></li>
                              </ul>
                              {/* <hr className="mb-2" />
                              <p className="d-flex align-items-center fw-500 mb-0">Total Amount <span className="text-3 ms-auto">$557.20</span></p>
                             } <hr className="mb-4 mt-2" />
                              <ul className="list-unstyled">
                                <li className="fw-500">Paid By:</li>
                                <li className="text-muted">Envato Pty Ltd</li>
                              </ul>
                             <ul className="list-unstyled">
                                <li className="fw-500">Transaction ID:</li>
                                <li className="text-muted">26566689645685976589</li>
                              </ul>
                              <ul className="list-unstyled">
                                <li className="fw-500">Description:</li>
                                <li className="text-muted">Envato March 2021 Member Payment</li>
                              </ul>
//                               <ul className="list-unstyled">
//                                 <li className="fw-500">Status:</li>
//                                 <li className="text-muted">Completed<span className="text-success text-3 ms-1"><i className="fas fa-check-circle"></i></span></li>
//                               </ul>*/}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ul className="pagination justify-content-center mt-4 mb-0">
                  {/* Previous Button */}
                  <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                    <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => goToPage(page - 1)} tabIndex={-1}>
                      <i className="fas fa-angle-left"></i>
                    </a>
                  </li>

                  {/* First Page (Always Present) */}
                  <li className={`page-item ${page === 1 ? 'active' : ''}`}>
                    <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => goToPage(1)}>
                      1
                    </a>
                  </li>

                  {/* Dots for Skipped Pages */}
                  {page > pagesToShow && (
                    <li className="page-item d-flex align-content-center flex-wrap text-muted text-5 mx-1">
                      ...
                    </li>
                  )}

                  {/* Page Numbers */}
                  {getPageNumbers().map((pageNumber) => (
                    <li
                      key={pageNumber}
                      className={`page-item ${page === pageNumber ? 'active' : ''}`}
                    >
                      <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => goToPage(pageNumber)}>
                        {pageNumber}
                      </a>
                    </li>
                  ))}

                  {/* Dots for Skipped Pages */}
                  {page < totalPages - pagesToShow + 1 && (
                    <li className="page-item d-flex align-content-center flex-wrap text-muted text-5 mx-1">
                      ...
                    </li>
                  )}

                  {/* Last Page (Always Present if more than 1 page) */}
                  {totalPages > 1 && (
                    <li className={`page-item ${page === totalPages ? 'active' : ''}`}>
                      <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => goToPage(totalPages)}>
                        {totalPages}
                      </a>
                    </li>
                  )}

                  {/* Next Button */}
                  <li className={`page-item ${page === totalPages ? 'disabled' : ''}`}>
                    <a className="page-link" style={{ cursor: 'pointer' }} onClick={() => goToPage(page + 1)}>
                      <i className="fas fa-angle-right"></i>
                    </a>
                  </li>
                </ul>


              </div>
            </div>

          </div>
        </div>
      </div>


      <Footer />

    </div>

    <a id="back-to-top" data-bs-toggle="tooltip" title="Back to Top" href="javascript:void(0)"><i className="fa fa-chevron-up"></i></a>


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
      <button className="btn btn-dark btn-sm border-0 fw-400 rounded-0 shadow-none" data-bs-toggle="tooltip" title="Green" id="reset-color">Reset Default</button>
      <button className="btn switcher-toggle"><i className="fas fa-cog"></i></button>
    </div>
  </>
  )
}

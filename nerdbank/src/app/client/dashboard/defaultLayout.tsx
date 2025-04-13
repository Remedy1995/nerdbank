"use client";
import { useQuery } from "@tanstack/react-query";
import { fetchGetTransfers } from "../../../../bankapi/bankapiComponents";
import Footer from "../../components/footer";
import Header from "../../components/client-header";
import Sidebar from "../../components/sidebar";
import Link from "next/link";
import { useState } from "react";
import TransactionCard from "../../components/transactionCard";
import { fetchGetSingleAccount } from "../../../../bankapi/bankapiComponents";

export default function Dashboard() {
  interface SingleTransfer {
    _id: string;
    amount: number;
    accountNumber: string;
    accountName: string;
    accountbankName: string;
    descriptionOfTransfer: string;
    created_At: Date;
  }

  const { data: userAccount, status } = useQuery({
    queryKey: ["accountInfo"],
    queryFn: async () => {
      const account = await fetchGetSingleAccount({});
      console.log("mine result", account);
      if (!account) {
        //fallback
        return {
          account: { accountBalance: 0 },
        };
      }
      return account;
    },
  });

  type UserAccountType =
    | {
        account?: { accountBalance: number; accountNumber?: string };
      }
    | never[]; // Ensure TypeScript understands the possible types

  const userAccountData: UserAccountType = userAccount || {};
  const { data }: any = Array.isArray(userAccountData) ? null : userAccountData;
  console.log("usr acccount", data);
  const AccountNumber =
    typeof data?.accountNumber === "string" ? data.accountNumber : "";
  const SliceAccountNumber = AccountNumber.slice(-5);
  const padAccountNumber = SliceAccountNumber.padStart(
    AccountNumber.length || 5,
    "X"
  );

  interface BulkTransferData {
    [x: string]: string | SingleTransfer[] | null;
    transfer: SingleTransfer[] | null;
  }

  const [id, setSelectedId] = useState("");
  const [page] = useState(1);
  const [perPage] = useState(5);
  //fetch clients recent transactions
  const { data: transData, isLoading } = useQuery<BulkTransferData>({
    queryKey: ["transfers", page, perPage],
    queryFn: async () => {
      const result = await fetchGetTransfers({
        queryParams: { page, perPage },
      });

      if (!result) {
        return { transfer: null };
      }

      return result["transfers"];
    },
  });

  const selectedData =
    Array && Array.isArray(transData)
      ? transData?.filter((sel) => sel?._id === id)
      : [];
  const totalTransfers =
    Array.isArray(transData) && transData?.reduce((a, b) => a + b?.amount, 0);

  // if (isLoading) return <p>Loading transfers...</p>;
  // if (error) return <p>Error fetching transfers.</p>;
  return (
    <>
      {status === "pending" && (
        <div id="preloader">
          <div data-loader="dual-ring"></div>
        </div>
      )}
      <div id="main-wrapper">
        <Header />

        <div id="content" className="py-4">
          <div className="container">
            <div className="row">
              <Sidebar />
              <div className="col-lg-9">
                <div className="bg-white shadow-sm rounded p-4 mb-4">
                  <h3 className="text-4 fw-400 d-flex align-items-center mb-4">
                    {" "}
                    Account Number
                    <span className="border text-white bg-success rounded-pill fw-500 text-2 px-3 py-1 ms-2">
                      {padAccountNumber}
                    </span>
                  </h3>
                  <hr className="mb-4 mx-n4" />
                  <div className="row gy-4 profile-completeness">
                    <div className="col-sm-6 col-md-6">
                      <div className="bg-white border rounded text-center px-3 py-4">
                        <span className="d-block text-10 text-light mt-2 mb-3">
                          <p className="mb-0 text-primary text-8">
                            £ {transData && totalTransfers?.toFixed(2)}
                          </p>
                        </span>

                        <p className="mb-0 text-dark text-8">Total Transfers</p>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-6">
                      <div className="bg-white border rounded text-center px-3 py-4">
                        <span className="d-block text-10 text-light mt-2 mb-3">
                          <p className="mb-0 text-primary text-8">
                            £ {data && data?.accountBalance}
                          </p>
                        </span>

                        <p className="mb-0 text-dark text-8">
                          Available Balance
                        </p>
                      </div>
                    </div>

                    {/* <div className="col-sm-6 col-md-3">
                    <div className="position-relative border rounded text-center px-3 py-4">
                      <span className="d-block text-10 text-light mt-2 mb-3">
                        <i className="fas fa-credit-card"></i>
                      </span>
                      <span className="text-5 d-block text-light mt-4 mb-3">
                        <i className="far fa-circle "></i>
                      </span>
                      <p className="mb-0">
                        <a className="btn-link stretched-link" href="">Add Card</a>
                      </p>
                    </div>
                  </div>

                 {/* <div className="col-sm-6 col-md-3">
                    <div className="position-relative border rounded text-center px-3 py-4">
                      <span className="d-block text-10 text-light mt-2 mb-3">
                        <i className="fas fa-university"></i>
                      </span>
                      <span className="text-5 d-block text-light mt-4 mb-3">
                        <i className="far fa-circle "></i>
                      </span>
                      <p className="mb-0">
                        <a className="btn-link stretched-link" href="">Add Bank Account</a>
                      </p>
                    </div>
                  </div>
                  */}
                  </div>
                </div>
                <div className="bg-white shadow-sm rounded py-4 mb-4">
                  <h3 className="text-5 fw-400 d-flex align-items-center px-4 mb-4">
                    {isLoading ? "Loading" : "Recent Activity"}
                  </h3>

                  <div className="transaction-title py-2 px-4">
                    <div className="row">
                      <div className="col-2 col-sm-1 text-center">
                        <span className="">Date</span>
                      </div>
                      <div className="col-2 col-sm-2 text-center">
                        <span className="">Transfer Type</span>
                      </div>
                      <div className="col-4 col-sm-5 text-center">
                        Description
                      </div>
                      <div className="col-2 col-sm-2 d-sm-block text-center">
                        Status
                      </div>
                      <div className="col-2 col-sm-2 text-end">Amount</div>
                    </div>
                  </div>
                  <div className="transaction-list">
                    {Array.isArray(transData) &&
                      transData.map(
                        (val: {
                          _id: string;
                          amount: number;
                          accountName: string;
                          created_At: string;
                          transferType: string;
                          descriptionOfTransfer: string;
                          transferStatus: string;
                        }) => {
                          let date = new Date(val.created_At);
                          let month = date.getMonth();
                          let day = date.getDay();
                          let year = date.getFullYear();
                          return (
                            <div
                              className="transaction-item px-4 py-3"
                              data-bs-toggle="modal"
                              data-bs-target="#transaction-detail"
                              key={val?._id}
                              onClick={() => setSelectedId(val?._id)}
                            >
                              <div className="row align-items-center flex-row overflow-auto">
                                <div className="col-2 col-sm-1 text-center">
                                  {" "}
                                  <span className="d-block text-1 fw-300 text-uppercase">
                                    {month + "/" + day + "/" + year}
                                  </span>{" "}
                                </div>
                                <div className="col-2 col-sm-2 text-center">
                                  {" "}
                                  <span className="d-block text-1 fw-300 text-uppercase">
                                    {val.transferType}
                                  </span>{" "}
                                </div>
                                <div className="col-4 col-sm-5 overflow-auto">
                                  {" "}
                                  <span className="text-muted ">
                                    {val.descriptionOfTransfer}
                                  </span>{" "}
                                </div>
                                <div className="col-2 col-sm-2 d-sm-block text-center text-3 overflow-auto">
                                  {" "}
                                  <span
                                    data-bs-toggle="tooltip"
                                    title="Completed"
                                  >
                                    {" "}
                                    {val.transferStatus === "success" ? (
                                      <i className="fas fa-check-circle text-success "></i>
                                    ) : (
                                      <i className="fas fa-times text-danger"></i>
                                    )}
                                  </span>{" "}
                                  {val.transferStatus}
                                </div>
                                <div className="col-2 col-sm-2 text-end text-4 overflow-auto">
                                  {" "}
                                  <span className="text-nowrap">
                                    {val.amount.toFixed(2)}
                                  </span>{" "}
                                  <span className="text-2 text-uppercase">
                                    (£)
                                  </span>{" "}
                                </div>
                              </div>
                            </div>
                          );
                        }
                      )}
                  </div>

                  <TransactionCard array={selectedData} />

                  {/*<div className="text-center mt-4"><Link href="/transaction-history" className="btn-link text-3">View all<i className="fas fa-chevron-right text-2 ms-2"></i></Link></div>*/}
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
      <a
        id="back-to-top"
        data-bs-toggle="tooltip"
        title="Back to Top"
        href="javascript:void(0)"
      >
        <i className="fa fa-chevron-up"></i>
      </a>
      <div id="styles-switcher" className="left">
        <h2 className="text-3">Color Switcher</h2>
        <hr />
        <ul>
          <li
            className="blue"
            data-bs-toggle="tooltip"
            title="Blue"
            data-path="css/color-blue.css"
          ></li>
          <li
            className="indigo"
            data-bs-toggle="tooltip"
            title="Indigo"
            data-path="css/color-indigo.css"
          ></li>
          <li
            className="purple"
            data-bs-toggle="tooltip"
            title="Purple"
            data-path="css/color-purple.css"
          ></li>
          <li
            className="pink"
            data-bs-toggle="tooltip"
            title="Pink"
            data-path="css/color-pink.css"
          ></li>
          <li
            className="red"
            data-bs-toggle="tooltip"
            title="Red"
            data-path="css/color-red.css"
          ></li>
          <li
            className="orange"
            data-bs-toggle="tooltip"
            title="Orange"
            data-path="css/color-orange.css"
          ></li>
          <li
            className="yellow"
            data-bs-toggle="tooltip"
            title="Yellow"
            data-path="css/color-yellow.css"
          ></li>
          <li
            className="teal"
            data-bs-toggle="tooltip"
            title="Teal"
            data-path="css/color-teal.css"
          ></li>
          <li
            className="cyan"
            data-bs-toggle="tooltip"
            title="Cyan"
            data-path="css/color-cyan.css"
          ></li>
          <li
            className="brown"
            data-bs-toggle="tooltip"
            title="Brown"
            data-path="css/color-brown.css"
          ></li>
        </ul>
        <button
          className="btn btn-dark btn-sm border-0 fw-400 rounded-0 shadow-none"
          data-bs-toggle="tooltip"
          title="Green"
          id="reset-color"
        >
          Reset Default
        </button>
        <button className="btn switcher-toggle">
          <i className="fas fa-cog"></i>
        </button>
      </div>
    </>
  );
}

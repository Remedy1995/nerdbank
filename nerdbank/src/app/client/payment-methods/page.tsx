"use client";
import React from "react";
import Sidebar from "../../components/sidebar";
import Header from "../../components/client-header";
import { useState } from "react";
import Footer from "../../components/footer";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NavSettings from "@/app/components/client-navigation-settings";
import {
  useAddCardDetail,
  useUpdateCardDetail,
  useUpdateBankDetail,
  useAddBankDetail,
  useDeleteBankDetail,
} from "../../../../bankapi/bankapiComponents";
import { fetchGetCardDetails } from "../../../../bankapi/bankapiComponents";
import { useDeleteCardDetail } from "../../../../bankapi/bankapiComponents";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { fetchGetBankDetails } from "../../../../bankapi/bankapiComponents";

export default function PaymentMethods() {
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [successMessage, setShowSuccessMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const debitRef = React.useRef(null);
  const creditRef = React.useRef(null);
  const businessRef = React.useRef(null);
  const personalRef = React.useRef(null);
  const [click, setClick] = useState<string | string>("");
  const queryClient = useQueryClient();

  const [data, setData] = useState({
    _id: "",
    card: "",
    cardType: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardHolderName: "",
    swiftCode: "",
    accountNumber: "",
    accountName: "",
    bankName: "",
    bankCountry: "",
    typeOfBank: "",
  });

  function closeModal() {
    setShowErrorMessage("");
    setShowSuccessMessage("");
    setVisible(false);
  }

  interface bankProps {
    _id: string;
    swiftCode: string;
    accountNumber: string;
    accountName: string;
    bankName: string;
    bankCountry: string;
    typeOfBank: string;
  }

  interface cardProps {
    _id: string;
    card: string;
    cardType: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    cardHolderName: string;
  }

  const { data: cardData, isLoading } = useQuery<{
    cardinformation: cardProps[];
  }>({
    queryKey: ["cardDetails"],
    queryFn: async () => {
      const result = await fetchGetCardDetails({});
      console.log("API Result:", result);
      if (!result) {
        throw new Error("No data returned from API");
      }
      if (Array.isArray(result)) {
        return { cardinformation: result };
      }
      return result;
    },
  });

  //for bank account
  const { data: bankData, isLoading: isBankLoading } = useQuery<{
    bankinformation: bankProps[];
  }>({
    queryKey: ["bankDetails"],
    queryFn: async () => {
      const result = await fetchGetBankDetails({});
      console.log("API Result:", result);
      if (!result) {
        throw new Error("No data returned from API");
      }
      if (Array.isArray(result)) {
        return { bankinformation: result };
      }
      return result;
    },
  });
  console.log("bank data", bankData);

  console.log("my data", cardData);

  const { mutate: deleteCard, status: isdeleteStatus } = useDeleteCardDetail({
    onSuccess: (data) => {
      if (data) {
        console.log(data);
        const dataMessage = Object.keys(data);
        if (dataMessage.includes("message")) {
          setShowSuccessMessage("Card Detail Deleted Successfully");
          setVisible(true);
          queryClient.invalidateQueries({ queryKey: ["cardDetails"] });
          return;
        }
      }
    },
    onError: (error) => {
      if (error) {
        const errorMessage = Object.values(error);
        console.log(errorMessage.slice(2).at(0));
        const { message } = errorMessage.slice(2).at(0) as any;
        console.log(message);
        setShowErrorMessage(message);
        setVisible(true);
        return;
      }
    },
  });

  // for bank

  const { mutate: deleteBank, status: isdeleteBankStatus } =
    useDeleteBankDetail({
      onSuccess: (data) => {
        if (data) {
          console.log(data);
          const dataMessage = Object.keys(data);
          if (dataMessage.includes("message")) {
            setShowSuccessMessage("Bank Detail Deleted Successfully");
            setVisible(true);
            queryClient.invalidateQueries({ queryKey: ["bankDetails"] });
            return;
          }
        }
      },
      onError: (error) => {
        if (error) {
          const errorMessage = Object.values(error);
          console.log(errorMessage.slice(2).at(0));
          const { message } = errorMessage.slice(2).at(0) as any;
          console.log(message);
          setShowErrorMessage(message);
          setVisible(true);
          return;
        }
      },
    });

  //for bank
  const { mutate: updateBank, status: isUpdateBankStatus } =
    useUpdateBankDetail({
      onSuccess: (data) => {
        if (data) {
          console.log(data);
          const dataMessage = Object.keys(data);
          if (dataMessage.includes("message")) {
            setShowSuccessMessage("Bank Detail Updated Successfully");
            setVisible(true);
            queryClient.invalidateQueries({ queryKey: ["bankDetails"] });
            return;
          }
        }
      },
      onError: (error) => {
        if (error) {
          const errorMessage = Object.values(error);
          console.log(errorMessage.slice(2).at(0));
          const { message } = errorMessage.slice(2).at(0) as any;
          console.log(message);
          setShowErrorMessage(message);
          setVisible(true);
          return;
        }
      },
    });

  const { mutate: updateCard, status: isUpdateStatus } = useUpdateCardDetail({
    onSuccess: (data) => {
      if (data) {
        console.log(data);
        const dataMessage = Object.keys(data);
        if (dataMessage.includes("message")) {
          setShowSuccessMessage("Card Detail Updated Successfully");
          setVisible(true);
          queryClient.invalidateQueries({ queryKey: ["cardDetails"] });
          return;
        }
      }
    },
    onError: (error) => {
      if (error) {
        const errorMessage = Object.values(error);
        console.log(errorMessage.slice(2).at(0));
        const { message } = errorMessage.slice(2).at(0) as any;
        console.log(message);
        setShowErrorMessage(message);
        setVisible(true);
        return;
      }
    },
  });

  const { mutate: addCard, status } = useAddCardDetail({
    onSuccess: (data) => {
      if (data) {
        console.log(data);
        const dataMessage = Object.keys(data);
        if (dataMessage.includes("message")) {
          setShowSuccessMessage("Card Detail Saved Successfully");
          setVisible(true);
          queryClient.invalidateQueries({ queryKey: ["cardDetails"] });
          return;
        }
      }
    },
    onError: (error) => {
      if (error) {
        const errorMessage = Object.values(error);
        console.log(errorMessage.slice(2).at(0));
        const { message } = errorMessage.slice(2).at(0) as any;
        console.log(message);
        setShowErrorMessage(message);
        setVisible(true);
        return;
      }
    },
  });

  //for bank
  const { mutate: addBank, status: isAddBankStatus } = useAddBankDetail({
    onSuccess: (data) => {
      if (data) {
        console.log(data);
        const dataMessage = Object.keys(data);
        if (dataMessage.includes("message")) {
          setShowSuccessMessage("Bank Detail Saved Successfully");
          setVisible(true);
          queryClient.invalidateQueries({ queryKey: ["bankDetails"] });
          return;
        }
      }
    },
    onError: (error) => {
      if (error) {
        const errorMessage = Object.values(error);
        console.log(errorMessage.slice(2).at(0));
        const { message } = errorMessage.slice(2).at(0) as any;
        console.log(message);
        setShowErrorMessage(message);
        setVisible(true);
        return;
      }
    },
  });

  console.log("pushed data", data);

  function closeBackdrop() {
    const backdrops = document.querySelectorAll("div.modal-backdrop.fade.show");

    backdrops.forEach((backdrop) => {
      const element = backdrop as HTMLElement;
      element.style.setProperty("--bs-backdrop-opacity", "0");
      element.style.setProperty("opacity", "0");
      window.location.reload();
    });
  }
  const addCardDetail = (e: any) => {
    setShowErrorMessage("");
    setShowSuccessMessage("");

    setVisible(false);
    e.preventDefault();
    const finalData: any = {
      cardinformation: [
        {
          card: data.card,
          cardType: data.cardType,
          cardNumber: data.cardNumber,
          expiryDate: `${data.expiryDate.slice(0, 2)}/${data.expiryDate.slice(2, 4)}`,
          cvv: data.cvv,
          cardHolderName: data.cardHolderName,
        },
      ],
    };

    addCard({ body: finalData });

    if (
      data.card &&
      data.cardHolderName &&
      data.cardType &&
      data.cvv &&
      data.expiryDate
    ) {
      setData({
        _id: "",
        card: "",
        cardType: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolderName: "",
        swiftCode: "",
        accountNumber: "",
        accountName: "",
        bankName: "",
        bankCountry: "",
        typeOfBank: "",
      });

      if (debitRef.current) {
        (debitRef.current as HTMLInputElement).checked = false;
      }
      if (creditRef.current) {
        (creditRef.current as HTMLInputElement).checked = false;
      }
    }
  };

  //bank
  const addBankDetail = (e: any) => {
    setShowErrorMessage("");
    setShowSuccessMessage("");

    setVisible(false);
    e.preventDefault();
    const finalData: any = {
      bankinformation: [
        {
          swiftCode: data.swiftCode,
          accountNumber: data.accountNumber,
          accountName: data.accountName,
          bankName: data.bankName,
          bankCountry: data.bankCountry,
          typeOfBank: data.typeOfBank,
        },
      ],
    };

    addBank({ body: finalData });
    if (
      data.swiftCode &&
      data.accountNumber &&
      data.accountName &&
      data.bankName &&
      data.bankCountry
    ) {
      setData({
        _id: "",
        card: "",
        cardType: "",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        cardHolderName: "",
        swiftCode: "",
        accountNumber: "",
        accountName: "",
        bankName: "",
        bankCountry: "",
        typeOfBank: "",
      });

      if (businessRef.current) {
        (businessRef.current as HTMLInputElement).checked = false;
      }
      if (personalRef.current) {
        (personalRef.current as HTMLInputElement).checked = false;
      }
    }
  };

  const deleteCardDetail = (e: any, id: any) => {
    setShowErrorMessage("");
    setShowSuccessMessage("");

    setVisible(false);
    e.preventDefault();
    const finalData: any = {
      detailId: id,
    };

    deleteCard({ body: finalData });
  };

  //for bank

  const deleteBankDetail = (e: any, id: any) => {
    setShowErrorMessage("");
    setShowSuccessMessage("");

    setVisible(false);
    e.preventDefault();
    const finalData: any = {
      detailId: id,
    };

    deleteBank({ body: finalData });
  };

  const updateCardDetail = (e: any) => {
    setShowErrorMessage("");
    setShowSuccessMessage("");

    setVisible(false);
    e.preventDefault();
    const finalData: any = {
      detailId: click,
      cardinformation: [
        {
          card: data.card,
          cardType: data.cardType,
          cardNumber: data.cardNumber,
          expiryDate: data.expiryDate,
          cvv: data.cvv,
          cardHolderName: data.cardHolderName,
        },
      ],
    };

    updateCard({ body: finalData });
  };

  //for bank
  const updateBankDetail = (e: any) => {
    setShowErrorMessage("");
    setShowSuccessMessage("");

    setVisible(false);
    e.preventDefault();
    const finalData: any = {
      detailId: click,
      bankinformation: [
        {
          swiftCode: data.swiftCode,
          accountNumber: data.accountNumber,
          accountName: data.accountName,
          bankName: data.bankName,
          bankCountry: data.bankCountry,
          typeOfBank: data.typeOfBank,
        },
      ],
    };

    updateBank({ body: finalData });
  };

  const findData = cardData?.cardinformation.find((val: cardProps) => {
    return val._id === click;
  });

  //for bank

  const findBankData = bankData?.bankinformation.find((val: bankProps) => {
    return val._id === click;
  });

  console.log("my clicked data", click, findData);

  useEffect(() => {
    console.log("renredenrs", findData);
    if (findData) {
      setData({
        ...data,
        _id: findData._id,
        card: findData.card,
        cardType: findData.cardType,
        cardNumber: findData.cardNumber,
        expiryDate: findData.expiryDate.replace(/\//g, ""),
        cvv: findData.cvv,
        cardHolderName: findData.cardHolderName,
      });
    }

    if (findBankData) {
      setData({
        ...data,
        _id: findBankData._id,
        swiftCode: findBankData.swiftCode,
        accountNumber: findBankData.accountNumber,
        accountName: findBankData.accountName,
        bankName: findBankData.bankName,
        bankCountry: findBankData.bankCountry,
        typeOfBank: findBankData.typeOfBank,
      });
    }
  }, [findData, findBankData]);

  return (
    <>
      {[
        status,
        isLoading,
        isBankLoading,
        isUpdateStatus,
        isdeleteStatus,
        isdeleteBankStatus,
        isUpdateBankStatus,
        isAddBankStatus,
      ].includes("pending") && (
        <div id="preloader">
          <div data-loader="dual-ring"></div>
        </div>
      )}
      <div id="main-wrapper">
        <Header />
        <NavSettings thirdNav={true} />

        <div id="content" className="py-4">
          <div className="container">
            <div className="row">
              <Sidebar />

              <div className="col-lg-9">
                <div className="bg-white shadow-sm rounded p-4 mb-4">
                  <h3 className="text-5 fw-400 mb-4">
                    Credit or Debit Cards{" "}
                    <span className="text-muted text-4">(for payments)</span>
                  </h3>
                  <hr className="mb-4 mx-n4" />
                  {visible && successMessage && (
                    <div className="alert alert-primary d-flex align-items-center justify-content-between p-2">
                      <div className="d-flex align-items-center w-100">
                        <div
                          className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <i className="fas fa-bullhorn"></i>
                        </div>
                        <p className="text-2 mb-0 text-center">
                          {successMessage}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                      ></button>
                    </div>
                  )}

                  {visible && showErrorMessage && (
                    <div className="alert alert-danger d-flex align-items-center justify-content-between p-2">
                      <div className="d-flex align-items-center w-100">
                        <div
                          className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                          style={{ width: "30px", height: "30px" }}
                        >
                          <i className="fas fa-bullhorn"></i>
                        </div>
                        <p className="text-2 mb-0  text-center">
                          {showErrorMessage}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="btn-close"
                        onClick={closeModal}
                      ></button>
                    </div>
                  )}
                  <div className="row g-3">
                    {cardData?.cardinformation &&
                      cardData.cardinformation
                        .reverse()
                        .map((val: cardProps) => (
                          <div className="col-12 col-md-6 col-lg-4">
                            <div className="account-card account-card-primary text-white rounded p-3">
                              <p className="text-4">{val.cardNumber}</p>
                              <p className="d-flex align-items-center">
                                {" "}
                                <span className="account-card-expire text-uppercase d-inline-block opacity-7 me-2">
                                  Valid
                                  <br />
                                  thru
                                  <br />
                                </span>{" "}
                                <span className="text-4 opacity-9">
                                  {val.expiryDate}
                                </span>{" "}
                                <span className="badge bg-warning text-dark text-0 fw-500 rounded-pill px-2 ms-auto">
                                  Primary {val.card}
                                </span>{" "}
                              </p>
                              <p className="d-flex align-items-center m-0">
                                {" "}
                                <span className="text-uppercase fw-500">
                                  {val.cardHolderName}
                                </span>
                                {/* <img
                            className="ms-auto"
                            src="images/payment/visa.png"
                            alt="visa"
                            title=""
                          />{" "} */}
                              </p>
                              <div className="account-card-overlay rounded">
                                {" "}
                                <a
                                  href="#"
                                  onClick={() => setClick(val._id)}
                                  data-bs-target="#edit-card-details"
                                  data-bs-toggle="modal"
                                  className="text-light btn-link mx-2"
                                >
                                  <span className="me-1">
                                    <i className="fas fa-edit"></i>
                                  </span>
                                  Edit
                                </a>{" "}
                                <a
                                  onClick={(e) => deleteCardDetail(e, val._id)}
                                  href="#"
                                  className="text-light btn-link mx-2"
                                >
                                  <span className="me-1">
                                    <i className="fas fa-minus-circle"></i>
                                  </span>
                                  Delete
                                </a>{" "}
                              </div>
                            </div>
                          </div>
                        ))}
                    <div className="col-12 col-md-6 col-lg-4">
                      {" "}
                      <a
                        onClick={closeModal}
                        href=""
                        data-bs-target="#add-new-card-details"
                        data-bs-toggle="modal"
                        className=" account-card-new d-flex align-items-center rounded h-100 p-3 mb-4 mb-lg-0"
                      >
                        <p className="w-100 text-center lh-base m-0">
                          {" "}
                          <span className="text-3">
                            <i className="fas fa-plus-circle"></i>
                          </span>{" "}
                          <span className="d-block text-body text-3">
                            Add New Card
                          </span>{" "}
                        </p>
                      </a>{" "}
                    </div>
                  </div>
                </div>

                <div
                  id="edit-card-details"
                  className="modal fade"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title fw-400">Update Card</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body p-4">
                        <form id="updateCard" method="post">
                          {visible && successMessage && (
                            <div className="alert alert-primary d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0 text-center">
                                  {successMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}

                          {visible && showErrorMessage && (
                            <div className="alert alert-danger d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0  text-center">
                                  {showErrorMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}
                          <div className="mb-3">
                            <label
                              htmlFor="edircardNumber"
                              className="form-label"
                            >
                              Card Number
                            </label>
                            <div className="input-group">
                              <span className="input-group-text">
                                {/* <img
                                  className="ms-auto"
                                  src="images/payment/visa.png"
                                  alt="visa"
                                  title=""
                                /> */}
                              </span>
                              <input
                                type="text"
                                className="form-control"
                                data-bv-field="edircardNumber"
                                id="edircardNumber"
                                value={data.cardNumber}
                                placeholder="Card Number"
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    cardNumber: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="row g-3 mb-3">
                            <div className="col-lg-6">
                              <label
                                htmlFor="editexpiryDate"
                                className="form-label"
                              >
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="MM/YY"
                                maxLength={5}
                                value={
                                  data.expiryDate.length >= 4
                                    ? `${data.expiryDate.slice(0, 2)}/${data.expiryDate.slice(2, 4)}`
                                    : data.expiryDate
                                }
                                onChange={(e) => {
                                  // Remove any non-digit characters and slash
                                  const raw = e.target.value
                                    .replace(/[^\d]/g, "")
                                    .slice(0, 4);
                                  setData({ ...data, expiryDate: raw });
                                }}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label
                                htmlFor="editcvvNumber"
                                className="form-label"
                              >
                                CVV{" "}
                                <span
                                  className="text-info ms-1"
                                  data-bs-toggle="tooltip"
                                  title="For Visa/Mastercard, the three-digit CVV number is printed on the signature panel on the back of the card immediately after the card's account number. For American Express, the four-digit CVV number is printed on the front of the card above the card account number."
                                >
                                  <i className="fas fa-question-circle"></i>
                                </span>
                              </label>
                              <input
                                id="cvvNumber"
                                type="password"
                                className="form-control"
                                data-bv-field="cvvnumber"
                                required
                                inputMode="numeric"
                                maxLength={3}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d{0,3}$/.test(value)) {
                                    setData({ ...data, cvv: value });
                                  }
                                }}
                                value={data.cvv}
                                placeholder="CVV (3 3digits)"
                              />
                            </div>
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="editcardHolderName"
                              className="form-label"
                            >
                              Card Holder Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="editcardHolderName"
                              id="editcardHolderName"
                              required
                              value={data.cardHolderName}
                              placeholder="Card Holder Name"
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  cardHolderName: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div className="d-grid mt-4">
                            <button
                              className="btn btn-primary"
                              onClick={updateCardDetail}
                              type="submit"
                            >
                              Update Card
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="add-new-card-details"
                  className="modal fade"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title fw-400">Add a Card</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body p-4">
                        <form id="addCard">
                          {visible && successMessage && (
                            <div className="alert alert-primary d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0 text-center">
                                  {successMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}

                          {visible && showErrorMessage && (
                            <div className="alert alert-danger d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0  text-center">
                                  {showErrorMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}
                          <div className="btn-group d-flex mb-3" role="group">
                            <input
                              type="radio"
                              className="btn-check"
                              name="options"
                              id="option1"
                              onChange={(e) =>
                                setData({ ...data, card: "debit" })
                              }
                              ref={debitRef}
                            />
                            <label
                              className="btn btn-outline-secondary btn-sm shadow-none w-100"
                              htmlFor="option1"
                            >
                              Debit
                            </label>

                            <input
                              type="radio"
                              className="btn-check"
                              name="options"
                              id="option2"
                              onChange={(e) =>
                                setData({ ...data, card: "credit" })
                              }
                              ref={creditRef}
                            />
                            <label
                              className="btn btn-outline-secondary btn-sm shadow-none w-100"
                              htmlFor="option2"
                            >
                              Credit
                            </label>
                          </div>
                          <div className="row g-3">
                            <div className="col-12">
                              <label htmlFor="cardType" className="form-label">
                                Card Type
                              </label>
                              <select
                                onChange={(e) =>
                                  setData({ ...data, cardType: e.target.value })
                                }
                                id="cardType"
                                className="form-select"
                                required
                              >
                                <option value={data.cardType}>Card Type</option>
                                <option>Visa</option>
                                <option>MasterCard</option>
                                <option>American Express</option>
                                <option>Discover</option>
                              </select>
                            </div>
                            <div className="col-12">
                              <label
                                htmlFor="cardNumber"
                                className="form-label"
                              >
                                Card Number
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                data-bv-field="cardnumber"
                                id="cardNumber"
                                value={data.cardNumber}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    cardNumber: e.target.value,
                                  })
                                }
                                required
                                placeholder="Card Number"
                              />
                            </div>
                            <div className="col-lg-6">
                              <label
                                htmlFor="expiryDate"
                                className="form-label"
                              >
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="MM/YY"
                                maxLength={5}
                                value={
                                  data.expiryDate.length >= 4
                                    ? `${data.expiryDate.slice(0, 2)}/${data.expiryDate.slice(2, 4)}`
                                    : data.expiryDate
                                }
                                onChange={(e) => {
                                  // Remove any non-digit characters and slash
                                  const raw = e.target.value
                                    .replace(/[^\d]/g, "")
                                    .slice(0, 4);
                                  setData({ ...data, expiryDate: raw });
                                }}
                              />
                            </div>
                            <div className="col-lg-6">
                              <label htmlFor="cvvNumber" className="form-label">
                                CVV{" "}
                                <span
                                  className="text-info ms-1"
                                  data-bs-toggle="tooltip"
                                  title="For Visa/Mastercard, the three-digit CVV number is printed on the signature panel on the back of the card immediately after the card's account number. For American Express, the four-digit CVV number is printed on the front of the card above the card account number."
                                >
                                  <i className="fas fa-question-circle"></i>
                                </span>
                              </label>
                              <input
                                id="cvvNumber"
                                type="password"
                                className="form-control"
                                data-bv-field="cvvnumber"
                                required
                                inputMode="numeric"
                                maxLength={3}
                                onChange={(e) => {
                                  const value = e.target.value;
                                  if (/^\d{0,3}$/.test(value)) {
                                    setData({ ...data, cvv: value });
                                  }
                                }}
                                value={data.cvv}
                                placeholder="CVV (3 3digits)"
                              />
                            </div>
                            <div className="col-12">
                              <label
                                htmlFor="cardHolderName"
                                className="form-label"
                              >
                                Card Holder Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                data-bv-field="cardholdername"
                                id="cardHolderName"
                                required
                                value={data.cardHolderName}
                                placeholder="Card Holder Name"
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    cardHolderName: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-12 d-grid mt-4">
                              <button
                                className="btn btn-primary"
                                onClick={addCardDetail}
                                type="submit"
                              >
                                Add Card
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white shadow-sm rounded p-4 mb-4">
                  <h3 className="text-5 fw-400 mb-4">
                    Bank Accounts{" "}
                    <span className="text-muted text-4">(for withdrawal)</span>
                  </h3>
                  <hr className="mb-4 mx-n4" />
                  <div className="row g-3">
                    {bankData?.bankinformation &&
                      bankData.bankinformation.map((val: bankProps) => (
                        <div className="col-12 col-md-6">
                          <div className="account-card account-card-primary text-white rounded">
                            <div className="row g-0">
                              <div className="col-3 d-flex justify-content-center p-3">
                                <div className="my-auto text-center">
                                  {" "}
                                  <span className="text-13">
                                    <i className="fas fa-university"></i>
                                  </span>
                                  <p className="badge bg-warning text-dark text-0 fw-500 rounded-pill px-2 mb-0">
                                    {val.bankCountry}
                                  </p>
                                </div>
                              </div>
                              <div className="col-9 border-start">
                                <div className="py-4 my-2 ps-4">
                                  <p className="text-4 fw-500 mb-1">
                                    {val.accountName}
                                  </p>
                                  <p className="text-4 opacity-9 mb-1">
                                    {val.accountNumber}
                                  </p>
                                  <p className="m-0">
                                    Approved{" "}
                                    <span className="text-3">
                                      <i className="fas fa-check-circle"></i>
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="account-card-overlay rounded">
                              {" "}
                              <a
                                href="#"
                                onClick={() => setClick(val._id)}
                                data-bs-target="#bank-account-details"
                                data-bs-toggle="modal"
                                className="text-light btn-link mx-2"
                              >
                                <span className="me-1">
                                  <i className="fas fa-share"></i>
                                </span>
                                More Details
                              </a>{" "}
                              <a
                                href="#"
                                className="text-light btn-link mx-2"
                                onClick={(e) => deleteBankDetail(e, val._id)}
                              >
                                <span className="me-1">
                                  <i className="fas fa-minus-circle"></i>
                                </span>
                                Delete
                              </a>{" "}
                            </div>
                          </div>
                        </div>
                      ))}
                    <div className="col-12 col-md-6">
                      {" "}
                      <a
                        onClick={closeModal}
                        href=""
                        data-bs-target="#add-new-bank-account"
                        data-bs-toggle="modal"
                        className="account-card-new d-flex align-items-center rounded h-100 p-3 mb-4 mb-lg-0"
                      >
                        <p className="w-100 text-center lh-base m-0">
                          {" "}
                          <span className="text-3">
                            <i className="fas fa-plus-circle"></i>
                          </span>{" "}
                          <span className="d-block text-body text-3">
                            Add New Bank Account
                          </span>{" "}
                        </p>
                      </a>{" "}
                    </div>
                  </div>
                </div>

                <div
                  id="bank-account-details"
                  className="modal fade"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered transaction-details"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="row g-0">
                          <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-start py-4">
                            <div className="my-auto text-center">
                              <div className="text-17 text-white mb-3">
                                <i className="fas fa-university"></i>
                              </div>
                              <h3 className="text-6 text-white my-3">
                                {findBankData?.bankName}
                              </h3>
                              <div className="text-4 text-white my-4">
                                {findBankData?.accountNumber} |{" "}
                                {findBankData?.bankCountry}
                              </div>
                              <p className="badge bg-light text-dark text-0 fw-500 rounded-pill px-2 mb-0"></p>
                            </div>
                          </div>
                          <div className="col-sm-7">
                            <h5 className="text-5 fw-400 m-3">
                              Bank Account Details
                              <button
                                type="button"
                                className="btn-close text-2 float-end"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                              ></button>
                            </h5>
                            <hr />
                            <div className="px-3 mb-3">
                              <ul className="list-unstyled">
                                <li className="fw-500">Account Type:</li>
                                <li className="text-muted">
                                  {findBankData?.typeOfBank}
                                </li>
                              </ul>
                              <ul className="list-unstyled">
                                <li className="fw-500">Account Name:</li>
                                <li className="text-muted">
                                  {findBankData?.accountName}
                                </li>
                              </ul>
                              <ul className="list-unstyled">
                                <li className="fw-500">Account Number:</li>
                                <li className="text-muted">
                                  {findBankData?.accountNumber}
                                </li>
                              </ul>
                              <ul className="list-unstyled">
                                <li className="fw-500">Bank Country:</li>
                                <li className="text-muted">
                                  {findBankData?.bankCountry}
                                </li>
                              </ul>
                              <ul className="list-unstyled">
                                <li className="fw-500">Status:</li>
                                <li className="text-muted">
                                  Approved{" "}
                                  <span className="text-success text-3">
                                    <i className="fas fa-check-circle"></i>
                                  </span>
                                </li>
                              </ul>
                              <div className="d-grid">
                                <a
                                  data-bs-target="#edit-bank-account"
                                  data-bs-toggle="modal"
                                  href="#"
                                  className="btn btn-sm btn-outline-danger shadow-none"
                                >
                                  <span className="me-1">
                                    <i className="fas fa-minus-circle"></i>
                                  </span>
                                  Edit Bank Account
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="edit-bank-account"
                  className="modal fade"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title fw-400">
                          Edit bank account
                        </h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                          onClick={closeBackdrop}
                        ></button>
                      </div>
                      <div className="modal-body p-4">
                        <form id="addbankaccount" method="post">
                          {visible && successMessage && (
                            <div className="alert alert-primary d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0 text-center">
                                  {successMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}

                          {visible && showErrorMessage && (
                            <div className="alert alert-danger d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0  text-center">
                                  {showErrorMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}
                          <div className="mb-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                id="personal"
                                name="bankAccountType"
                                required
                                type="radio"
                                checked={
                                  data.typeOfBank === "personal" ? true : false
                                }
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    typeOfBank: "personal",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="personal"
                              >
                                Personal
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                id="business"
                                name="bankAccountType"
                                required
                                type="radio"
                                checked={
                                  data.typeOfBank === "business" ? true : false
                                }
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    typeOfBank: "business",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="business"
                              >
                                Business
                              </label>
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="bankName" className="form-label">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="bankName"
                              id="bankName"
                              required
                              value={data.bankName}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  bankName: e.target.value,
                                })
                              }
                              placeholder="e.g. HDFC Bank"
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="accountName" className="form-label">
                              Bank Country
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="accountName"
                              id="accountName"
                              required
                              value={data.bankCountry}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  bankCountry: e.target.value,
                                })
                              }
                              placeholder="Great Britain"
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="accountName" className="form-label">
                              Account Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="accountName"
                              id="accountName"
                              required
                              value={data.accountName}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  accountName: e.target.value,
                                })
                              }
                              placeholder="e.g. Smith Rhodes"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="accountNumber"
                              className="form-label"
                            >
                              Account Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="accountNumber"
                              id="accountNumber"
                              required
                              value={data.accountNumber}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  accountNumber: e.target.value,
                                })
                              }
                              placeholder="e.g. 12346678900001"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="ifscCode" className="form-label">
                              Swift Code
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="ifscCode"
                              id="ifscCode"
                              required
                              value={data.swiftCode}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  swiftCode: e.target.value,
                                })
                              }
                              placeholder="e.g. ABCDE12345"
                            />
                          </div>
                          {/* <div className="form-check mb-3"> */}
                          {/* <input
                              className="form-check-input"
                              id="remember-me"
                              name="remember"
                              type="checkbox"
                            /> */}
                          {/* <label
                              className="form-check-label"
                              htmlFor="remember-me"
                            >
                              I confirm the bank account details above
                            </label> */}
                          {/* </div> */}
                          <div className="d-grid">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              onClick={updateBankDetail}
                            >
                              Edit Bank Account
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  id="add-new-bank-account"
                  className="modal fade"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title fw-400">Add bank account</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body p-4">
                        <form id="addbankaccount" method="post">
                          {visible && successMessage && (
                            <div className="alert alert-primary d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0 text-center">
                                  {successMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}

                          {visible && showErrorMessage && (
                            <div className="alert alert-danger d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0  text-center">
                                  {showErrorMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}
                          <div className="mb-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                id="personal"
                                name="bankAccountType"
                                required
                                type="radio"
                                ref={personalRef}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    typeOfBank: "personal",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="personal"
                              >
                                Personal
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                id="business"
                                name="bankAccountType"
                                required
                                type="radio"
                                ref={businessRef}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    typeOfBank: "business",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="business"
                              >
                                Business
                              </label>
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="bankName" className="form-label">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="bankName"
                              id="bankName"
                              required
                              value={data.bankName}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  bankName: e.target.value,
                                })
                              }
                              placeholder="e.g. HDFC Bank"
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="accountName" className="form-label">
                              Bank Country
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="accountName"
                              id="accountName"
                              required
                              value={data.bankCountry}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  bankCountry: e.target.value,
                                })
                              }
                              placeholder="Great Britain"
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="accountName" className="form-label">
                              Account Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="accountName"
                              id="accountName"
                              required
                              value={data.accountName}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  accountName: e.target.value,
                                })
                              }
                              placeholder="e.g. Smith Rhodes"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="accountNumber"
                              className="form-label"
                            >
                              Account Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="accountNumber"
                              id="accountNumber"
                              required
                              value={data.accountNumber}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  accountNumber: e.target.value,
                                })
                              }
                              placeholder="e.g. 12346678900001"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="ifscCode" className="form-label">
                              Swift Code
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="ifscCode"
                              id="ifscCode"
                              required
                              value={data.swiftCode}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  swiftCode: e.target.value,
                                })
                              }
                              placeholder="e.g. ABCDE12345"
                            />
                          </div>
                          {/* <div className="form-check mb-3"> */}
                          {/* <input
                              className="form-check-input"
                              id="remember-me"
                              name="remember"
                              type="checkbox"
                            /> */}
                          {/* <label
                              className="form-check-label"
                              htmlFor="remember-me"
                            >
                              I confirm the bank account details above
                            </label> */}
                          {/* </div> */}
                          <div className="d-grid">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              onClick={addBankDetail}
                            >
                              Add Bank Account
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  id="add-new-bank-account"
                  className="modal fade"
                  role="dialog"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title fw-400">Add bank account</h5>
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body p-4">
                        <form id="addbankaccount" method="post">
                          {visible && successMessage && (
                            <div className="alert alert-primary d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0 text-center">
                                  {successMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}

                          {visible && showErrorMessage && (
                            <div className="alert alert-danger d-flex align-items-center justify-content-between p-2">
                              <div className="d-flex align-items-center w-100">
                                <div
                                  className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                                  style={{ width: "30px", height: "30px" }}
                                >
                                  <i className="fas fa-bullhorn"></i>
                                </div>
                                <p className="text-2 mb-0  text-center">
                                  {showErrorMessage}
                                </p>
                              </div>
                              <button
                                type="button"
                                className="btn-close"
                                onClick={closeModal}
                              ></button>
                            </div>
                          )}
                          <div className="mb-3">
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                id="personal"
                                name="bankAccountType"
                                required
                                type="radio"
                                ref={personalRef}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    typeOfBank: "personal",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="personal"
                              >
                                Personal
                              </label>
                            </div>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                id="business"
                                name="bankAccountType"
                                required
                                type="radio"
                                ref={businessRef}
                                onChange={(e) =>
                                  setData({
                                    ...data,
                                    typeOfBank: "business",
                                  })
                                }
                              />
                              <label
                                className="form-check-label"
                                htmlFor="business"
                              >
                                Business
                              </label>
                            </div>
                          </div>

                          <div className="mb-3">
                            <label htmlFor="bankName" className="form-label">
                              Bank Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="bankName"
                              id="bankName"
                              required
                              value={data.bankName}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  bankName: e.target.value,
                                })
                              }
                              placeholder="e.g. HDFC Bank"
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="accountName" className="form-label">
                              Bank Country
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="accountName"
                              id="accountName"
                              required
                              value={data.bankCountry}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  bankCountry: e.target.value,
                                })
                              }
                              placeholder="Great Britain"
                            />
                          </div>

                          <div className="mb-3">
                            <label htmlFor="accountName" className="form-label">
                              Account Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="accountName"
                              id="accountName"
                              required
                              value={data.accountName}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  accountName: e.target.value,
                                })
                              }
                              placeholder="e.g. Smith Rhodes"
                            />
                          </div>
                          <div className="mb-3">
                            <label
                              htmlFor="accountNumber"
                              className="form-label"
                            >
                              Account Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="accountNumber"
                              id="accountNumber"
                              required
                              value={data.accountNumber}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  accountNumber: e.target.value,
                                })
                              }
                              placeholder="e.g. 12346678900001"
                            />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="ifscCode" className="form-label">
                              Swift Code
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              data-bv-field="ifscCode"
                              id="ifscCode"
                              required
                              value={data.swiftCode}
                              onChange={(e) =>
                                setData({
                                  ...data,
                                  swiftCode: e.target.value,
                                })
                              }
                              placeholder="e.g. ABCDE12345"
                            />
                          </div>
                          {/* <div className="form-check mb-3"> */}
                          {/* <input
                              className="form-check-input"
                              id="remember-me"
                              name="remember"
                              type="checkbox"
                            /> */}
                          {/* <label
                              className="form-check-label"
                              htmlFor="remember-me"
                            >
                              I confirm the bank account details above
                            </label> */}
                          {/* </div> */}
                          <div className="d-grid">
                            <button
                              className="btn btn-primary"
                              type="submit"
                              onClick={addBankDetail}
                            >
                              Add Bank Account
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
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

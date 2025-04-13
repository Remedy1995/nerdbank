"use client";
import Footer from "../../components/footer";
import Header from "../../components/admin-header";
import { useForm } from "react-hook-form";
import { useTransferStore } from "../../store/useStore";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../../store/useStore";
import UserHooks from "../../hooks/hooks";
import { useState } from "react";
import React from "react";

export default function TransferMoney() {
  let info;
  const [AccountInfo, setAccountInfo] = useState("");
  const { userAccount, userInfo }: any = UserHooks();
  console.log("useeeee", userAccount?.data?.accountNumber);
  console.log(
    "user Info",
    userInfo?.message?.firstname + " " + userInfo?.message?.lastname
  );

  React.useEffect(() => {
    const senderAccountInfo =
      userAccount?.data?.accountNumber +
      "-" +
      userInfo?.message?.firstname +
      " " +
      userInfo?.message?.lastname;
    console.log("senderAccount ", senderAccountInfo);
    setAccountInfo(senderAccountInfo);
  }, [userAccount]);
  console.log("fgjfgfgf", AccountInfo);
  const { transfers, setTransfers } = useTransferStore();

  const { auth: userId } = useAuthStore();
  const navigation = useRouter();

  console.log("my transfers", transfers, setTransfers);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      senderAccountInfo: "",
      transferType: "",
      accountName: "",
      amount: "",
      accountNumber: "",
      accountBankName: "",
      accountType: "",
      accountBankRoutingTransitNumber: "",
      accountBankSwiftCode: "",
      descriptionOfTransfer: "",
    },
  });

  const watchTransferTypeSelected = watch("transferType");
  console.log("the watchTrans", watch("senderAccountInfo"));
  const onSubmit = (data: string | any) => {
    let transferMoneyData: any = [
      {
        body: {
          receiverAccount: [
            {
              accountName: data.accountName,
              accountNumber: data.accountNumber,
              accountBankName: data.accountBankName,
              accountType: data.accountType,
              accountBankRoutingTransitNumber:
                data.accountBankRoutingTransitNumber,
              accountBankSwiftCode: data.accountBankSwiftCode,
            },
          ],
          senderAccount: userId,
          amount: data.amount,
          descriptionOfTransfer: data.descriptionOfTransfer,
        },
      },
    ];
    console.log("my ttt", data);
    //pushes to the store
    setTransfers(transferMoneyData);
    //if transfer Type selected is self delete recieveAccount else leave it

    if (watchTransferTypeSelected === "self") {
      transferMoneyData = transferMoneyData.map((val: any) => {
        console.log("my val", val);
        return {
          body: {
            receiverAccount: data.accountNumber,
            senderAccount: userId,
            amount: val.body.amount,
            descriptionOfTransfer: val.body.descriptionOfTransfer,
            transferType: data.transferType,
          },
        };
      });
    }

    console.log("my Extra data", transferMoneyData);
    setTransfers(transferMoneyData);
    console.log("my new transfers", transfers);
    console.log(data);
    navigation.push("/admin/verify-pin");
  };
  return (
    <>
      <div id="main-wrapper">
        <Header />
        {/* <div className="bg-primary">
        <div className="container d-flex justify-content-center">
          <ul className="nav nav-pills alternate nav-lg border-bottom-0">
            <li className="nav-item"> <a className="nav-link" href="send-money.html">Send</a></li>
            <li className="nav-item"> <a className="nav-link active" href="request-money.html">Request</a></li>
          </ul>
        </div>
      </div>*/}
        <div id="content" className="py-4">
          <div className="container">
            <div className="row mt-4 mb-5">
              <div className="col-lg-11 mx-auto">
                <div className="row widget-steps">
                  <div className="col-4 step active">
                    <div className="step-name">Details</div>
                    <div className="progress">
                      <div className="progress-bar"></div>
                    </div>
                    <a href="#" className="step-dot"></a>{" "}
                  </div>
                  <div className="col-4 step disabled">
                    <div className="step-name">Confirm</div>
                    <div className="progress">
                      <div className="progress-bar"></div>
                    </div>
                    <a href="#" className="step-dot"></a>{" "}
                  </div>
                  <div className="col-4 step disabled">
                    <div className="step-name">Success</div>
                    <div className="progress">
                      <div className="progress-bar"></div>
                    </div>
                    <a href="#" className="step-dot"></a>{" "}
                  </div>
                </div>
              </div>
            </div>
            <h4 className="fw-400 text-center mt-3">Transfer Money</h4>
            <p className="lead text-center mb-4">
              Transfer Money at anytime, anywhere in the world.
            </p>
            <div className="row">
              <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">
                <div className="bg-white shadow-sm rounded p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4">
                  <h3 className="text-5 fw-400 mb-3 mb-sm-4">
                    Receipient Details
                  </h3>
                  <hr className="mx-n3 mx-sm-n5 mb-4" />
                  <form id="form-send-money" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                      <label htmlFor="payerName" className="form-label">
                        Transfer From Account
                      </label>
                      {
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Account Information"
                          value={
                            userAccount && userInfo ? AccountInfo : "loading..."
                          }
                          {...register("senderAccountInfo", {
                            required: true,
                            disabled: true,
                          })}
                          aria-invalid={
                            errors.senderAccountInfo ? "true" : "false"
                          }
                        />
                      }
                      {errors.senderAccountInfo?.type === "required" && (
                        <p className="text-danger" role="alert">
                          Account Name is required
                        </p>
                      )}
                    </div>
                    <div className="mb-3">
                      <label htmlFor="transferType" className="form-label">
                        Type Of Transfer
                      </label>
                      <select
                        className="form-control"
                        {...register("transferType", { required: true })}
                        aria-invalid={errors.transferType ? "true" : "false"}
                      >
                        <option value="">Select Transfer Type</option>
                        <option value="self">Self Transfers</option>
                        <option value="external">External Transfers</option>
                      </select>
                      {errors.transferType?.type === "required" && (
                        <p className="text-danger" role="alert">
                          Transfer Type is required
                        </p>
                      )}
                    </div>
                    {watchTransferTypeSelected === "external" && (
                      <div className="mb-3">
                        <label htmlFor="payerName" className="form-label">
                          Account Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Account Name"
                          {...register("accountName", { required: true })}
                          aria-invalid={errors.accountName ? "true" : "false"}
                        />
                        {errors.accountName?.type === "required" && (
                          <p className="text-danger" role="alert">
                            Account Name is required
                          </p>
                        )}
                      </div>
                    )}
                    {["self", "external"].includes(
                      watchTransferTypeSelected
                    ) && (
                      <div className="mb-3">
                        <label htmlFor="payerName" className="form-label">
                          Amount
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Amount"
                          {...register("amount", { required: true })}
                          aria-invalid={errors.amount ? "true" : "false"}
                        />
                        {errors.amount?.type === "required" && (
                          <p className="text-danger" role="alert">
                            Amount is required
                          </p>
                        )}
                      </div>
                    )}
                    {["self", "external"].includes(
                      watchTransferTypeSelected
                    ) && (
                      <div className="mb-3">
                        <label htmlFor="payerName" className="form-label">
                          Account Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Account Number"
                          {...register("accountNumber", { required: true })}
                          aria-invalid={errors.accountNumber ? "true" : "false"}
                        />
                        {errors.accountNumber?.type === "required" && (
                          <p className="text-danger" role="alert">
                            Account Number is required
                          </p>
                        )}
                      </div>
                    )}
                    {watchTransferTypeSelected === "external" && (
                      <div className="mb-3">
                        <label htmlFor="payerName" className="form-label">
                          Account Bank Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Account Bank Name"
                          {...register("accountBankName", { required: true })}
                          aria-invalid={
                            errors.accountBankName ? "true" : "false"
                          }
                        />
                        {errors.accountBankName?.type === "required" && (
                          <p className="text-danger" role="alert">
                            Account Bank Name is required
                          </p>
                        )}
                      </div>
                    )}

                    {["self", "external"].includes(
                      watchTransferTypeSelected
                    ) && (
                      <div className="mb-3">
                        <label htmlFor="accountType" className="form-label">
                          Account Type
                        </label>
                        <select
                          className="form-control"
                          {...register("accountType", { required: true })}
                          aria-invalid={errors.accountType ? "true" : "false"}
                        >
                          <option value="">Select Account Type</option>
                          <option value="Savings">Savings</option>
                          <option value="Current">Current</option>
                          <option value="Checking">Checking</option>
                        </select>
                        {errors.accountType?.type === "required" && (
                          <p className="text-danger" role="alert">
                            Account Type is required
                          </p>
                        )}
                      </div>
                    )}
                    {watchTransferTypeSelected === "external" && (
                      <div className="mb-3">
                        <label htmlFor="payerName" className="form-label">
                          {" "}
                          Routing Transit Number
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Routing Transit Number"
                          {...register("accountBankRoutingTransitNumber", {
                            required: true,
                          })}
                          aria-invalid={
                            errors.accountBankRoutingTransitNumber
                              ? "true"
                              : "false"
                          }
                        />
                        {errors.accountBankRoutingTransitNumber?.type ===
                          "required" && (
                          <p className="text-danger" role="alert">
                            Routing Transit Number is required
                          </p>
                        )}
                      </div>
                    )}
                    {watchTransferTypeSelected === "external" && (
                      <div className="mb-3">
                        <label htmlFor="payerName" className="form-label">
                          Bank Swift Code
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Bank Swift Code"
                          {...register("accountBankSwiftCode", {
                            required: true,
                          })}
                          aria-invalid={
                            errors.accountBankSwiftCode ? "true" : "false"
                          }
                        />
                        {errors.accountBankSwiftCode?.type === "required" && (
                          <p className="text-danger" role="alert">
                            Bank Swift Code is required
                          </p>
                        )}
                      </div>
                    )}
                    {["self", "external"].includes(
                      watchTransferTypeSelected
                    ) && (
                      <div className="mb-3">
                        <label htmlFor="description" className="form-label">
                          Enter Description of Transfer
                        </label>
                        <textarea
                          className="form-control"
                          {...register("descriptionOfTransfer", {
                            required: true,
                          })}
                          aria-invalid={
                            errors.descriptionOfTransfer ? "true" : "false"
                          }
                          rows={4}
                          id="description"
                          placeholder="Description of Transfer"
                        ></textarea>
                        {errors.descriptionOfTransfer?.type === "required" && (
                          <p className="text-danger" role="alert">
                            Description Of Transfer is required
                          </p>
                        )}
                      </div>
                    )}
                    {["self", "external"].includes(
                      watchTransferTypeSelected
                    ) && (
                      <div className="d-grid mt-4">
                        <button className="btn btn-primary" type="submit">
                          Continue
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}

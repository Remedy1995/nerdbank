"use client";
import { useTransferStore } from "../../store/useStore";
import Header from "../components/admin-header";
import Footer from "../components/footer";
import { useCreateaccounts } from "../../../../bankapi/bankapiComponents";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore, useMessageStore } from "../../store/useStore";

export default function CreateAccountNext() {
  const navigation = useRouter();
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [stateOfAuth, setStateOfAuth] = useState(false);
  const { auth, setAuth }: any = useAuthStore();
  const { message, setMessage } = useMessageStore();

  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      accountStatus: "",
      accountType: "",
    },
  });

  const { mutate: createAccount, status: isStatus } = useCreateaccounts({
    onSuccess: (data) => {
      console.log("data", data);
      if (data) {
        const dataMessage = Object.values(data);
        setMessage(dataMessage[0] as string);
        console.log("my data mess", dataMessage, message);
        navigation.push("/admin/account-success");
      }
    },
    onError: (error) => {
      console.log("my error", error);
      if (error) {
        const errorMessage = Object.values(error);
        console.log(errorMessage[0]);
        setShowErrorMessage(errorMessage[0]);
        setVisible(true);
      }
    },
  });

  const onSubmit = (data: Record<string, string>| any) => {
    setShowErrorMessage("");

    const userId = auth?.split(" ")[0];
    const updatedData = { ...data, userId };
    console.log("rrrrr", updatedData);
    createAccount({ body: updatedData });
  };

  return (
    <div>
      {isStatus === "pending" && (
        <div id="preloader">
          <div data-loader="dual-ring"></div>
        </div>
      )}
      <div id="main-wrapper">
        <Header />

        <div id="content" className="py-4">
          <div className="container">
            <div className="row mt-4 mb-5">
              <div className="col-lg-11 mx-auto">
                <div className="row widget-steps">
                  <div className="col-4 step complete">
                    <div className="step-name">User Account</div>
                    <div className="progress">
                      <div className="progress-bar"></div>
                    </div>
                    <a href="withdraw-money.html" className="step-dot"></a>{" "}
                  </div>
                  <div className="col-4 step active">
                    <div className="step-name">Bank Account</div>
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
            <h2 className="fw-400 text-center mt-3 mb-4">
              Create Bank Account
            </h2>
            <div className="row">
              <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">
                {visible && (
                  <div className="alert alert-danger d-flex align-items-center justify-content-between p-2">
                    <div className="d-flex align-items-center w-100">
                      <div
                        className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <i className="fas fa-bullhorn"></i>
                      </div>
                      <p className="lead mb-0 flex-grow-1 text-center">
                        {showErrorMessage}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setVisible(false)}
                    ></button>
                  </div>
                )}

                <div className="bg-white shadow-sm rounded p-3 pt-sm-5 pb-sm-5 px-sm-5 mb-4">
                  <p className="lead text-center alert alert-info">
                    You have successfully created a new account for{" "}
                    <span className="text-primary">
                      {typeof auth === "string" && auth?.length > 0
                        ? auth?.split(" ")[1] + " " + auth.split(" ")[2] + " "
                        : ""}
                    </span>
                    continue to create bank Account <br />
                  </p>
                  <form
                    id="form-withdraw-money-confirm"
                    onSubmit={handleSubmit(onSubmit)}
                  >
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
                    <div className="mb-3">
                      <label htmlFor="accountType" className="form-label">
                        Status Type
                      </label>
                      <select
                        className="form-control"
                        {...register("accountStatus", { required: true })}
                        aria-invalid={errors.accountType ? "true" : "false"}
                      >
                        <option value="">Select Account Status</option>
                        <option value="inactive">Inactive</option>
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                      </select>
                      {errors.accountStatus?.type === "required" && (
                        <p className="text-danger" role="alert">
                          Account Type is required
                        </p>
                      )}
                    </div>
                    <div className="d-grid">
                      <button className="btn btn-primary" type="submit">
                        Create Bank Account
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
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
    </div>
  );
}

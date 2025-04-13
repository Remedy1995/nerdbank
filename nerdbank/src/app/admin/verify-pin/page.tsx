"use client";
import React from "react";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { VerifyPin } from "@/app/hooks/hooks";
import { useRouter } from "next/navigation";
import { number } from "zod";
import { useMessageStore } from "../../store/useStore";

const VerifyBank = () => {
  const { setMessage: setBankPinConfirm } = useMessageStore()
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);
  const [pin, setpin] = useState(Array(6).fill(""));
  const navigation = useRouter();
  const pinObject: Record<string, string> = {
    userPin: pin.join(""),
  };

  function closeModal() {
    setVisible(false);
    setMessage("dummy message");
    return;
  }

  const { Verify, message, visible, setVisible, setMessage }: any =
    VerifyPin(pinObject);
  console.log("mes", typeof message);

  useEffect(() => {
      if (message === 200) {
        navigation.push("/admin/confirm-transfer");
        setBankPinConfirm('confirmed');
        
      }
      
    }, [message, navigation]);
  const handleChange = (value: string, index: number) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newpin = [...pin];
    newpin[index] = value;
    setpin(newpin);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      const newpin = [...pin];
      newpin[index - 1] = "";
      setpin(newpin);
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <>
      
      {message === "" && (
        <div id="preloader">
          <div data-loader="dual-ring"></div>
        </div>
      )}
      <div className="container-fluid m-0 p-0">
        <div className="row g-0 vh-100">
          <div className="col-sm-6 col-md-6 col-lg-6">
            <div className="d-flex justify-content-center h-100 align-items-center bg-white">
              <div className="d-flex flex-column w-50 p-1 rounded bg-white">
                <div className="d-flex justify-content-center">
                  <Image
                    className="rounded"
                    src="/images/hand.tiff"
                    alt=""
                    width={200}
                    height={200}
                  />
                </div>

                <div className="d-flex justify-content-center">
                  <p className="text-primary fs-5 text-nowrap fw-medium text-center text-uppercase">
                    Pin Verification
                  </p>
                </div>

                <div className="container-fluid d-flex justify-content-center align-items-center px-2">
                  <div className="col-12 px-3 fs-6 fw-normal w-100 mb-4 text-center">
                    Please provide your bank pin to complete the process.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-md-6 col-lg-6 bg-primary">
            <div className="d-flex justify-content-center h-100 align-items-center">
              <div className="d-flex flex-column w-50 p-1 rounded">
                {![200].includes(message) && visible && (
                  <div className="alert alert-secondary d-flex align-items-center justify-content-between p-2">
                    <div className="d-flex align-items-center w-100">
                      <div
                        className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center"
                        style={{ width: "30px", height: "30px" }}
                      >
                        <i className="fas fa-bullhorn text-danger"></i>
                      </div>
                      <p className="text-2 mb-0 text-center text-dark fw-normal">
                        {message}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={closeModal}
                    ></button>
                  </div>
                )}
                <p className="text-white fs-5 text-nowrap text-center">
                  Verify Your Bank Pin
                </p>
                <div className="col-12 px-3 fs-6 fw-light w-100 mb-4 text-white">
                  Enter the 6-digit code associated with your account to
                  complete the process.
                </div>

                <div className="d-flex justify-content-between gap-1 mb-3">
                  {pin.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      className="w-100 p-1 text-center fw-medium"
                      value={digit}
                      onChange={(e) => handleChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      ref={(el) => {
                        inputRefs.current[index] = el;
                      }}
                    />
                  ))}
                </div>

                <button
                  className="btn text"
                  style={{ background: "white" }}
                  onClick={Verify}
                >
                  Verify Pin
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VerifyBank;

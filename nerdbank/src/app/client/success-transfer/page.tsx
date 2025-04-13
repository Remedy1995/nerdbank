"use client";
import { useTransferStore } from "../../store/useStore";
import Header from "../../components/client-header";
import Footer from "../../components/footer";
import  { useRouter } from "next/navigation";

export default function SuccessTransfer () {



    interface ReceiverAccount {
        accountName: string;
        accountNumber: string;
        accountBankName: string;
        accountType: string;
        accountBankRoutingTransitNumber: string;
        accountBankSwiftCode: string;
    }

    interface TransferBody {
        receiverAccount: ReceiverAccount[]; // Allow multiple accounts
        senderAccount: string;
        amount: string; // Keep as string since that&apos;s what&apos;s in the data
        descriptionOfTransfer: string;
    }

    interface TransferProps {
        body: TransferBody;
    }
     
    const router = useRouter();
    const { transfers } = useTransferStore();

    let amount;
    {/*} senderAccount,
    descriptionOfTransfer,receiverAccount*/};
    if (transfers.length > 0) {
        const transData = transfers[0] as unknown as TransferProps; // Explicitly asserting the type

        amount = transData.body.amount;
       {/*} senderAccount = transData.body.senderAccount;
        descriptionOfTransfer = transData.body.descriptionOfTransfer;
        receiverAccount = transData.body.receiverAccount[0];*/}
    }


     
    const depositMoneyScreen = () => {
     router.push("/client/transfer-money")
    }

    return (<div>
        {/* <div id="preloader">
            <div data-loader="dual-ring"></div>
        </div> */}
        <div id="main-wrapper">
            <Header />
            {/*<div className="bg-white">
                <div className="container d-flex justify-content-center">
                    <ul className="nav nav-tabs nav-lg border-bottom-0">
                        <li className="nav-item"> <a className="nav-link" href="deposit-money.html">Deposit</a></li>
                        <li className="nav-item"> <a className="nav-link active" href="withdraw-money.html">Transfer</a></li>
                    </ul>
                </div>
            </div>*/}

            <div id="content" className="py-4">
                <div className="container">


                    <div className="row mt-4 mb-5">
                    <div className="col-lg-11 mx-auto">
          <div className="row widget-steps">
            <div className="col-4 step complete">
              <div className="step-name">Details</div>
              <div className="progress">
                <div className="progress-bar"></div>
              </div>
              <span className="step-dot"></span> </div>
            <div className="col-4 step complete">
              <div className="step-name">Confirm</div>
              <div className="progress">
                <div className="progress-bar"></div>
              </div>
              <span className="step-dot"></span> </div>
            <div className="col-4 step complete">
              <div className="step-name">Success</div>
              <div className="progress">
                <div className="progress-bar"></div>
              </div>
              <span className="step-dot"></span> </div>
          </div>
        </div>
                    </div>
                    <h2 className="fw-400 text-center mt-3 mb-4">Transfer Money</h2>
                    <div className="row">
                        <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">

                            <div className="bg-white text-center shadow-sm rounded p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4">
                                <div className="my-4">
                                    <p className="text-success text-20 lh-1"><i className="fas fa-check-circle"></i></p>
                                    <p className="text-success text-8 fw-500 lh-1">Success!</p>
                                    <p className="lead">Transactions Complete</p>
                                </div>
                                <p className="text-3 mb-4">You &apos;ve<span className="text-4 fw-500"> transferred £ {amount}</span> successfully</p>
                                <div className="d-grid"><button className="btn btn-primary" onClick={depositMoneyScreen}>Transfer Money Again</button></div>
                                {/*<a className="text-3 d-inline-block btn-link mt-4" href="#"><i className="fas fa-print"></i> Print</a>*/}
                                </div>

                        </div>
                    </div>
                </div>
            </div>


        </div>
        <Footer />
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
    </div>


    )
}


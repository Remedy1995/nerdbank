"use client";
import { useTransferStore } from "../../store/useStore";
import Header from "../../components/admin-header";
import Footer from "../../components/footer";
import {  useCreateDeposits, useCreateTransfers } from "../../../../bankapi/bankapiComponents";
import { useRouter } from "next/navigation";
import { useState } from "react";



export default function ConfirmTransfer  ()  {


    const navigation = useRouter()
    const [showErrorMessage, setShowErrorMessage] = useState("")
    const [visible, setVisible] = useState(false);
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
        amount: number; // Keep as string since that's what's in the data
        descriptionOfTransfer: string;
        transferType?: string
    }

    interface TransferProps {
        body: TransferBody;
    }


    const { mutate: transferExternal, status} = useCreateDeposits({

        onSuccess: (data) => {
            console.log('data', data)
            if (data) {

                const dataMessage = Object.keys(data);
                if (dataMessage.includes("message")) {

                    navigation.push('/admin/success-transfer')
                }

            }
        },
        onError: (error) => {
            console.log('my errors', error)
            if (error) {
                const errorMessage: any[] = Object.values(error)
                console.log(errorMessage[2]['message'])
               setShowErrorMessage(errorMessage[2]['message'] || errorMessage[2]['error'] )
                setVisible(true)
            }

        }
    })



    const { mutate: transferSelf, status: isStatus } = useCreateTransfers({

        onSuccess: (data) => {
            console.log('data', data)
            if (data) {

                const dataMessage = Object.keys(data);
                if (dataMessage.includes("message")) {

                    navigation.push('/admin/success-transfer')
                }

            }
        },
        onError: (error) => {
            console.log('my error', error)
            console.log('my error', error)
            if (error) {
                const errorMessage: any[] = Object.values(error)
                console.log(errorMessage[2]['message'])
                setShowErrorMessage(errorMessage[2]['message'])
                setVisible(true)
            }


        }
    })
    const { transfers } = useTransferStore();

    let amount, transData, receiverAccount, receiverAccountData: any, transferType: string = '';
    if (transfers.length > 0) {
        transData = transfers[0] as unknown as TransferProps; // Explicitly asserting the type
        console.log('sdfdsfs', transData)
        transData.body.amount = isNaN(Number(transData.body.amount)) ? 0 : Number(transData.body.amount)
        amount = transData.body.amount;
        receiverAccount = transData.body.receiverAccount[0];
        receiverAccountData = transData.body.receiverAccount;
        transferType = transData.body.transferType ?? ""

    }

    const spliceAccountNumber = transferType !== 'self' ? receiverAccount?.accountNumber.slice(-5) : receiverAccountData?.toString()?.slice(-5);
    const padAccountNumber = transferType !== 'self' ? spliceAccountNumber?.padStart(Number(receiverAccount?.accountNumber.length), "X") || "" :
        spliceAccountNumber?.padStart(Number(receiverAccountData?.toString()?.length), "X")

    console.log('aa', receiverAccountData)

    const transferMoneyData = [{ ...transData }]


    console.log('recieved this', transferMoneyData)
    const transferMoney = (event: React.MouseEvent<HTMLButtonElement>) => {
        setShowErrorMessage("")

        event.preventDefault()
        //determine to send to external or self using apis written
        if (transferType === 'self') {
            const removeExtra = transferMoneyData.map((val) => {
                if (val) {
                    const { body } = val
                    if (body && Object.keys(body).includes("receiverAccount")) {
                        return { ...body, receiverAccount: receiverAccountData }
                    }
                }
                return null;
            }).filter((val) => val !== null);

             console.log('pushing data',removeExtra[0])
            if (removeExtra.length > 0 ) {
                 delete removeExtra[0].transferType;
                transferSelf({body : removeExtra[0]})
            }
        } else {
            transferExternal(transferMoneyData[0])
        }

    }

    return (<div>

        {status === 'pending' && (<div id="preloader">
            <div data-loader="dual-ring"></div>
        </div>)}
        {isStatus === 'pending' && (<div id="preloader">
            <div data-loader="dual-ring"></div>
        </div>)}
        <div id="main-wrapper">
            <Header />
            {/* <div className="bg-white">
                <div className="container d-flex justify-content-center">
                    <ul className="nav nav-tabs nav-lg border-bottom-0">
                        <li className="nav-item"> <a className="nav-link" href="deposit-money.html">Deposit</a></li>
                        <li className="nav-item"> <a className="nav-link active" href="withdraw-money.html">Transfer</a></li>
                    </ul>
                </div>
            </div> */}

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
                                    <a href="withdraw-money.html" className="step-dot"></a> </div>
                                <div className="col-4 step active">
                                    <div className="step-name">Confirm</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="#" className="step-dot"></a> </div>
                                <div className="col-4 step disabled">
                                    <div className="step-name">Success</div>
                                    <div className="progress">
                                        <div className="progress-bar"></div>
                                    </div>
                                    <a href="#" className="step-dot"></a> </div>
                            </div>
                        </div>
                    </div>
                    <h2 className="fw-400 text-center mt-3 mb-4">Transfer Money</h2>
                    <div className="row">
                        <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">

                            {visible && (<div className="alert alert-danger d-flex align-items-center justify-content-between p-2">
                                <div className="d-flex align-items-center w-100">
                                    <div className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                                        <i className="fas fa-bullhorn"></i>
                                    </div>
                                    <p className="lead mb-0 flex-grow-1 text-center">{showErrorMessage}</p>
                                </div>
                                <button type="button" className="btn-close" onClick={() => setVisible(false)}></button>
                            </div>)}


                            <div className="bg-white shadow-sm rounded p-3 pt-sm-5 pb-sm-5 px-sm-5 mb-4">

                                <p className="lead text-center alert alert-info">You are Transfering money<br />
                                    to<br />
                                    <span className="fw-500">
                                        {transferType !== 'self' ? receiverAccount?.accountBankName : null} {transferType !== 'self' && "-"}{padAccountNumber}</span></p>
                                <p className="mb-2 mt-4">Amount to Transfer <span className="text-3 float-end"> {Number(amount)} £</span></p>
                                {/* <p className="text-muted">Transactions fees <span className="float-end d-flex align-items-center">5.00 £</span></p> */}
                                <hr />
                                <p className="text-4 fw-500">Total<span className="float-end">{Number(amount)} £</span></p>
                                <form id="form-withdraw-money-confirm" method="post">
                                    <div className="d-grid"><button className="btn btn-primary" onClick={transferMoney}>Transfer Money</button></div>
                                </form>
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
    </div >


    )
}


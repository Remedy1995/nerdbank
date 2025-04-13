"use client"
import Footer from "../../components/footer"
import Header from "../../components/admin-header"
import { useForm } from "react-hook-form";
import { useTransferStore } from "../../store/useStore";
import { useRouter } from "next/navigation";
import {useAuthStore} from "../../store/useStore";
import UserHooks from "../../hooks/hooks";
import {useState} from 'react'
import {  useRegisterUser  } from "../../../../bankapi/bankapiComponents";


export default function CreateAccount() {


 const [AccountInfo,setAccountInfo]= useState("")
 const [showErrorMessage, setShowErrorMessage] = useState("")
  const {auth,setAuth} = useAuthStore()
    const [visible, setVisible] = useState(false);
  const navigation = useRouter();
  const { register, watch, formState: { errors }, handleSubmit, } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      password: ""
    }
  })

 const { mutate: createUser, status} =  useRegisterUser ({

        onSuccess: (data) => {
            console.log('data', data)
            if (data) {

                const dataMessage : any[] = Object.values(data);

                console.log(dataMessage)
               if (dataMessage) {
                   console.log(dataMessage)
                     //push userId and full name to the store
                     setAuth(dataMessage[2])
                     console.log('pushed auth',auth)
                   navigation.push('/admin/create-account-next-step')
               }

            }
        },
        onError: (error) => {
            console.log('my error', error)
            if (error) {
                const errorMessage = Object.values(error)
                console.log(errorMessage)
                console.log(errorMessage[1])
                setShowErrorMessage(errorMessage[2]['message'])
                setVisible(true)
            }

        }
    })
  const onSubmit = (data: Record<string,string> | any) => {
     console.log('my data',data)
     createUser({
         body : data})
    }

    //navigation.push("/confirm-transfer")

  return (<>
    {/* {status === 'pending' && <div id="preloader">
      <div data-loader="dual-ring"></div>
    </div>} */}

    <div id="main-wrapper">
      <Header />
      {/*<div className="bg-primary">
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
                  <div className="step-name">User Account</div>
                  <div className="progress">
                    <div className="progress-bar"></div>
                  </div>
                  <a href="#" className="step-dot"></a> </div>
                <div className="col-4 step disabled">
                  <div className="step-name">Bank Account</div>
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
          <h4 className="fw-400 text-center mt-3">Create User Account</h4>
          <p className="lead text-center mb-4">Create An Account Today</p>
          <div className="row">
            <div className="col-md-9 col-lg-7 col-xl-6 mx-auto">

              <div className="bg-white shadow-sm rounded p-3 pt-sm-4 pb-sm-5 px-sm-5 mb-4">
                <h3 className="text-5 fw-400 mb-3 mb-sm-4">Customer Details</h3>
                  {visible && (<div className="alert alert-danger d-flex align-items-center justify-content-between p-2">
                                <div className="d-flex align-items-center w-100">
                                    <div className="featured-box-icon bg-light-3 text-brown rounded-circle me-2 d-flex align-items-center justify-content-center" style={{ width: "30px", height: "30px" }}>
                                        <i className="fas fa-bullhorn"></i>
                                    </div>
                                    <p className="lead mb-0 flex-grow-1 text-center">{showErrorMessage}</p>
                                </div>
                                <button type="button" className="btn-close" onClick={() => setVisible(false)}></button>
                            </div>)}
                <hr className="mx-n3 mx-sm-n5 mb-4" />

                <form id="form-send-money" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                    <label htmlFor="payerName" className="form-label">First Name</label>
                    <input type="text"
                      className="form-control" placeholder="Enter First name"
                      {...register("firstname", { required: true })}
                      aria-invalid={errors.firstname ? "true" : "false"} />
                    {errors.firstname?.type === "required" && (
                      <p className="text-danger" role="alert">Firstname is required</p>
                    )}
                  </div>
           <div className="mb-3">
                    <label htmlFor="payerName" className="form-label">Last name</label>
                    <input type="text"
                      className="form-control" placeholder="Enter Last name"
                      {...register("lastname", { required: true })}
                      aria-invalid={errors.lastname ? "true" : "false"} />
                    {errors.phone?.type === "required" && (
                      <p className="text-danger" role="alert">Last name is required</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="payerName" className="form-label">Phone Number</label>
                    <input type="text"
                      className="form-control" placeholder="Enter Phone Number"
                      {...register("phone", { required: true })}
                      aria-invalid={errors.phone ? "true" : "false"} />
                    {errors.phone?.type === "required" && (
                      <p className="text-danger" role="alert">Phone number is required</p>
                    )}
                  </div>
                   <div className="mb-3">
                    <label htmlFor="payerName" className="form-label">Email Address</label>
                    <input type="text"
                      className="form-control" placeholder="Enter email address"
                      {...register("email", { required: true })}
                      aria-invalid={errors.email ? "true" : "false"} />
                    {errors.email?.type === "required" && (
                      <p className="text-danger" role="alert">email address is required</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="payerName" className="form-label">Password</label>
                    <input type="text"
                      className="form-control" placeholder="Enter Password"
                      {...register("password", { required: true })}
                      aria-invalid={errors.password ? "true" : "false"} />
                    {errors.password?.type === "required" && (
                      <p className="text-danger" role="alert">Password is required</p>
                    )}
                  </div>
                   <div className="d-grid mt-4">
                    <button className="btn btn-primary"

                      type="submit">Continue</button></div>
                </form>

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

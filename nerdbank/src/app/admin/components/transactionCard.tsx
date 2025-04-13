import { AlertCircle } from "lucide-react"


interface Transaction {
    _id: string,
    transferStatus:string,
    descriptionOfTransfer:string,
    amount: number,
     accountName: string,
     created_At:string,
     transferType:string,
     accountType : string
    }
interface ArrProps {
     array : Transaction[]
    }

export default function TransactionCard({ array }: ArrProps) {
    console.log('my transaction data',array)
      let date,month,day,year;
      if(array?.length > 0){
     date =  new Date(array[0]?.created_At)
     month = String(date.getMonth()+ 1).padStart(2,'0')
      day = String(date.getDay()).padStart(2,'0')

      year = date.getFullYear()
                        }
    return (

                <div id="transaction-detail" className="modal fade" role="dialog" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered transaction-details" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="row g-0">
                          <div className="col-sm-5 d-flex justify-content-center bg-primary rounded-start py-4">
                            <div className="my-auto text-center">
                              <div className="text-17 text-white my-3"><i className="fas fa-building"></i></div>
                              <h3 className="text-4 text-white fw-400 my-3">{array && array[0]?.transferType}</h3>
                              <div className="text-8 fw-500 text-white my-4">{array && array[0]?.accountType}</div>
                              <p className="text-white fw-500 text-4">{ array && day + "-" + month + "-"+ year}</p>
                            </div>
                          </div>
                          <div className="col-sm-7">
                            <h5 className="text-5 fw-400 m-3">Transaction Details</h5>
                            <button type="button" className="btn-close text-2 float-end position-absolute top-0 end-0 p-2" data-bs-dismiss="modal" />
                            <div className="px-3">

                              <hr className="mb-2" />
                              <p className="d-flex align-items-center fw-500 mb-0">Transfer Amount <span className="text-3 ms-auto">£{array && array[0]?.amount.toFixed(2)}</span></p>
                              <hr className="mb-4 mt-2" />
                              <ul className="list-unstyled">
                                <li className="fw-500">Description:</li>
                                <li className="text-muted">{array && array[0]?.descriptionOfTransfer}</li>
                              </ul>
                              <ul className="list-unstyled">
                                <li className="fw-500">Transfer ID:</li>
                                <li className="text-muted">{array && array[0]?._id}</li>
                              </ul>

                              <ul className="list-unstyled">
                                <li className="fw-500">Status:</li>
                                <li className="text-muted">{array && array[0]?.transferStatus}
                                 {array && array[0]?.transferStatus ==='success' ?(<i className="fas fa-check-circle text-success mx-2"></i>):(<i className="fas fa-times text-danger mx-2"></i>)}</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
        )
    }

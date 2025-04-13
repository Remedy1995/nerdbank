const VerifyPin = require("../helpers/verifyPin");

const VerifyBankPin = async (req, res) => {
  const { userPin } = req.body;
  const PinResponse = {
    404: "User Not Found",
    422: "User Pin Not Provided",
    400: "Incorrect Pin Provided",
    500: "Sorry An Error Occured try later",
  };
  const verifyPinResponse = await VerifyPin(userPin, req.userId);
  const pinStatusCodes = Object.keys(PinResponse).map((val) => Number(val));
  if (pinStatusCodes.includes(verifyPinResponse)) {
    return res.status(verifyPinResponse).json({ message: PinResponse[verifyPinResponse] });
  }
  
  return res.status(200).json({
    status: 200,
    message: "you have verified pin successfully",
  });
};

module.exports = { VerifyBankPin };

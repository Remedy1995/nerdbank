const Bank = require('../models/BankInformation'); // adjust path to your model


// Create or Add a Bank Detail for a User
exports.addBankDetail = async (req, res) => {
    const {  bankinformation } = req.body;

    let error = '';
    const checkData = Object.entries(bankinformation[0]).flatMap(
      ([key, value]) => {
        if (value === "") {
           error= { message: `${key} is required` };   
           return 400; 
        }
  
        return 200;
      }
      
    )
    console.log(checkData)
    if(checkData.includes(400)){
      return res.status(400).json(error)
    }
    let userId = req.userId;
    try {
        let bank  = await Bank.findOne({ user: userId });
        if (bank) {
            // Update existing user's bank list
            bank.bankinformation.push(bankinformation[0]);
        } else {
            // Create new document for user
            bank = new Bank({
                user: userId,
             bankinformation: bankinformation
            });
        }

        await bank.save();
        res.status(200).json({ message: "Bank detail saved successfully", data: bank });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Get All Bank Details of a User
exports.getUserBankDetails = async (req, res) => {
    const userId = req.userId;

    try {
        const bank = await Bank.findOne({ user: userId }).populate('user');
        if (!bank) return res.status(404).json({ message: "No bank details found for this user." });

        res.status(200).json(bank.bankinformation);
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Delete a Specific Bank Detail by Index
exports.deleteBankDetail = async (req, res) => {
    const { detailId } = req.body;

    try {
        const bank = await Bank.findOne({ "bankinformation._id": detailId });
        if (!bank) return res.status(404).json({ message: "No bank details found for this user." });

        bank.bankinformation = bank.bankinformation.filter(detail => detail._id.toString() !== detailId);
        await bank.save();

        res.status(200).json({ message: "Bank detail deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// Update a Specific Bank Detail
exports.updateBankDetail = async (req, res) => {
    const { detailId, ...updateFields } = req.body;
  
    if (!detailId) {
      return res.status(422).json({
        status: false,
        message: "Bank detail ID is required"
      });
    }
  
    const BankData = updateFields.bankinformation?.[0];
  
    if (!BankData) {
      return res.status(422).json({
        status: false,
        message: "Bank information is missing"
      });
    }
  
    // Build $set for the positional operator
    const updateObj = {};
    for (const key in BankData) {
      updateObj[`bankinformation.$.${key}`] = BankData[key];
    }
  
    try {
      const updatedBank = await Bank.findOneAndUpdate(
        { "bankinformation._id": detailId },
        { $set: updateObj },
        { new: true, runValidators: true }
      );
  
      if (!updatedBank) {
        return res.status(404).json({
          status: false,
          message: "Bank detail not found"
        });
      }
  
      const updatedDetail = updatedBank.bankinformation.find(
        (item) => item._id.toString() === detailId
      );
  
      return res.status(200).json({
        status: true,
        message: "Bank detail updated successfully",
        data: updatedDetail
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Error updating Bank detail",
        error: error.message
      });
    }
  };

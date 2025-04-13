const Card = require("../models/CardInformation"); // adjust path to your model

// Create or Add a CardDetail for a User
exports.addCardDetail = async (req, res) => {
  const { cardinformation } = req.body;

  console.log("the card information", cardinformation);
    
  let error = '';
  const checkData = Object.entries(cardinformation[0]).reverse().flatMap(
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
    let card = await Card.findOne({ user: userId });
    if (card) {
      // Update existing user's Cardlist
      card.cardinformation.push(cardinformation[0]);
    } else {
      // Create new document for user
      card = new Card({
        user: userId,
        cardinformation: cardinformation,
      });
    }

    await card.save();
    res
      .status(200)
      .json({ message: "Card detail saved successfully", data: card });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get All CardDetails of a User
exports.getUserCardDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const card = await Card.findOne({ user: userId }).populate("user");
    if (!card)
      return res
        .status(404)
        .json({ message: "No card details found for this user." });

    res.status(200).json(card.cardinformation);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete a Specific CardDetail by Index
exports.deleteCardDetail = async (req, res) => {
  const { detailId } = req.body;

  try {
    const card = await Card.findOne({ "cardinformation._id": detailId });
    if (!card)
      return res
        .status(404)
        .json({ message: "No Card details found for this user." });

    card.cardinformation = card.cardinformation.filter(
      (detail) => detail._id.toString() !== detailId
    );
    await card.save();

    res.status(200).json({ message: "Card detail deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


exports.updateCardDetail = async (req, res) => {
    const { detailId, ...updateFields } = req.body;
  
    if (!detailId) {
      return res.status(422).json({
        status: false,
        message: "Card detail ID is required"
      });
    }
  
    const cardData = updateFields.cardinformation?.[0];
  
    if (!cardData) {
      return res.status(422).json({
        status: false,
        message: "Card information is missing"
      });
    }
  
    // Build $set for the positional operator
    const updateObj = {};
    for (const key in cardData) {
      updateObj[`cardinformation.$.${key}`] = cardData[key];
    }
  
    try {
      const updatedCard = await Card.findOneAndUpdate(
        { "cardinformation._id": detailId },
        { $set: updateObj },
        { new: true, runValidators: true }
      );
  
      if (!updatedCard) {
        return res.status(404).json({
          status: false,
          message: "Card detail not found"
        });
      }
  
      const updatedDetail = updatedCard.cardinformation.find(
        (item) => item._id.toString() === detailId
      );
  
      return res.status(200).json({
        status: true,
        message: "Card detail updated successfully",
        data: updatedDetail
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Error updating card detail",
        error: error.message
      });
    }
  };
  
  
  
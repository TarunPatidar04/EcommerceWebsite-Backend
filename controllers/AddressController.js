import AddressModel from "../models/AddressModel.js";

//Add Address
export const addAddress = async (req, res) => {
  try {
    let { fullName, address, city, state, country, pincode, phoneNumber } =
      req.body;

    let UserAddress = await AddressModel.create({
      userId: req.user,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });

    if (!UserAddress) {
      return res.status(400).json({
        message: "Address not added",
      });
    }

    res.status(200).json({
      message: "Address added successfully",
      UserAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in Add Address API",
      error: error.message,
    });
  }
};

//Get Address
export const getAddress = async (req, res) => {
  try {
    let address = await AddressModel.find({userId:req.user}).sort({
      createAt: -1,
    });

    res.status(200).json({
      message: "Address found successfully",
      UserAddress: address[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error in Get Address API",
      error: error.message,
    });
  }
};

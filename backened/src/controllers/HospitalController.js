import  Hospital  from "../models/Hospital.js";
import User from "../models/User.js";


export const createHospital = async (req, res) => {
  try {
    const { name, phone, address } = req.body;

    if (req.user.role !== "hospital") {
      return res.status(403).json({ message: "Only hospitals can create hospital entries" });
    }

    const hospital = new Hospital({  
      name,
      phone,
      address,
      adminUserId: req.user._id,
    });

    await hospital.save();
    res.status(201).json({ hospital });
  } catch (err) {
    res.status(500).json({ message: "Error creating hospital", error: err.message });
  }
};

export const getAllHospitals = async (req, res) => {
  try {
    const hospitals = await Hospital.find();
    res.status(200).json({ hospitals });
  } catch (err) {
    res.status(500).json({ message: "Error fetching hospitals" });
  }
};

export const deleteHospital = async (req, res) => {
  try {
    const hospital = await Hospital.findById(req.params.id);

    if (!hospital) return res.status(404).json({ message: "Hospital not found" });

    if (!hospital.adminUserId.equals(req.user._id)) {
      return res.status(403).json({ message: "You can only delete your own hospital" });
    }

    await Hospital.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Hospital deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting hospital" });
  }
};



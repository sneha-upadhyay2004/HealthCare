import Emergency from "../models/Emergency.js";
import User from "../models/User.js";
import  Hospital  from "../models/Hospital.js";
import { storage } from "../cloudConfig.js";
import multer from "multer";
const upload = multer({ storage });

export const sendSelfEmergency = async (req, res) => {
  try {
    const { location } = req.body;

    if (!location || !location.coordinates || !location.address) {
      return res.status(400).json({ message: "Location with address is required" });
    }

     const user = req.user;

       const emergency = new Emergency({
      for: "self",
      user: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      gender: user.gender,
      location,

    
       })
   await emergency.save();
    res.status(201).json({ message: "Emergency Sent", emergency });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const sendForOthers = async (req, res) => {
  try {
    const { gender } = req.body;
    const location = JSON.parse(req.body.location);
    const { latitude, longitude, address } = location;

    if (!req.file) {
      return res.status(400).json({ message: 'Image is required' });
    }

    const emergency = new Emergency({
      for: 'others', // ✅ Fix here
      user: req.user._id,
      gender,
      image: {
        url: req.file.path,
        public_id: "dummy", // optional: replace with real cloudinary public_id if needed
      },
      location: {
        address,
        coordinates: [longitude, latitude],
      },
    });

    await emergency.save();
    res.status(201).json({ message: 'Emergency submitted successfully', emergency });
  } catch (err) {
    console.error("Emergency Submit Error:", err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};



// ✅ Show all emergencies (self + others)
// export const getAllEmergencies = async (req, res) => {
//   try {
//    const emergencies = await Emergency.find()
//   .populate("user")
//   .populate("helpedBy.id"); 
//   // .populate("helpedBy");

//     // const emergencies = await Emergency.find();


//     res.status(200).json({ success: true, emergencies });
//   } catch (err) {
//     console.error("Error fetching emergencies:", err);
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// }

export const getAllEmergencies = async (req, res) => {
  try {
    const emergencies = await Emergency.find()
      .populate("user")
      .populate("helpedBy.id");

    // Now attach hospital info for each emergency that was helped
    const enrichedEmergencies = await Promise.all(
      emergencies.map(async (emergency) => {
        if (emergency.helpedBy?.id?.role === "hospital") {
          const hospital = await Hospital.findOne({ adminUserId: emergency.helpedBy.id._id });
          if (hospital) {
            emergency = emergency.toObject();
            emergency.hospitalDetails = {
              name: hospital.name,
              phone: hospital.phone,
            };
          }
        }
        return emergency;
      })
    );

    res.status(200).json({ success: true, emergencies: enrichedEmergencies });
  } catch (err) {
    console.error("Error fetching emergencies:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const helpEmergency = async (req, res) => {
  try {
    const emergency = await Emergency.findById(req.params.id);
    if (!emergency) return res.status(404).json({ message: "Emergency not found" });

    const user = req.user; // ✅ use req.user from auth middleware

    // Only hospital can help
    if (user.role !== "hospital") {
      return res.status(403).json({ message: "Only hospitals can help emergencies" });
    }

    emergency.helpedBy = { id: user._id }; // ✅ store inside `helpedBy.id`
    await emergency.save();

    res.status(200).json({ message: "Emergency marked as helped", emergency });
  } catch (error) {
    console.error("Error in helpEmergency:", error);
    res.status(500).json({ message: "Server error" });
  }
};

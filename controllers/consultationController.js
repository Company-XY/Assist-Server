const asyncHandler = require("express-async-handler");
const Consultation = require("../models/consultationModel");

//Get all consultation postings

const getAllConsultations = asyncHandler(async (req, res) => {
  try {
    const consultations = await Consultation.find();
    res.status(200).json(consultations);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "An error occurred while fetching consultations",
        error,
      });
  }
});

//Create consultation
const createConsultation = asyncHandler(async (req, res) => {
    try {
      const consultationData = req.body; // Assuming data is sent in the request body
      const consultation = new Consultation(consultationData);
      await consultation.save();
  
      res.status(201).json({ message: 'Consultation created successfully', consultation });
    } catch (error) {
      res.status(500).json({ message: 'An error occurred while creating the consultation', error });
    }
  });
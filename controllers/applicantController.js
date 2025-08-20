const jobs = require('../models/applicantModel')

exports.addJobs = async (req, res) => {
    console.log("Inside add applicantController");
    const {fullName ,jobTitle,  qualification,  email,   phone, coverLetter } = req.body

    

    console.log(req.body);
const resume=req.file.filename
    try {
        const existingApplication = await jobs.findOne({ jobTitle,email })
        console.log(existingApplication);
        
        if (existingApplication) {
            res.status(401).json("Applicant already existing...")
        }
        else {
            const newApplication = new applicants({
               fullName ,jobTitle,  qualification,  email,   phone, coverLetter,resume
            })
            await newApplication.save()
            res.status(200).json(newApplication)
        }
    }
    catch (err) {
        res.status(500).json("Err" + err)
    }
}

exports.getAllApplications = async(req, res)=>{
    try {
    const getApplication = await applicants.find()
    res.status(200).json(getApplication);
  } catch (err) {
    res.status(500).json("Err" + err)
  }       
}


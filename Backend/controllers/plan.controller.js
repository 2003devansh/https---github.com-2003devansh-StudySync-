const Plan = require('../models/plan.model');

exports.getPlans = async (req,res,next)=>{
    try {
        const plan = await Plan.find({user: req.user._id});
        res.status(200).json({plan});
    } catch (error) {
        next(error) ;
    }
}

exports.createPlan = async (req,res,next)=>{
    try {
        const {syllabus,examDate,goals,studyPlan,completedTasks,reminders,aiGenerated}  = req.body ; 
        const newPlan = await Plan.create({
            user: req.user._id,
            syllabus,
            examDate,
            goals,
            studyPlan,
            completedTasks,
            reminders,
            aiGenerated,
        })

        res.status(201).json({
            message: "plan created successfully",
            plan: newPlan,
        })
    } catch (error) {
        next(error) ;
    }
}

exports.updatePlan = async (req,res,next)=>{
    try {
        const planId  = req.params.id ;
        const updatedPlan = await Plan.findByIdAndUpdate(
            { _id: planId, user: req.user._id },
            { $set: req.body },
            { new: true, runValidators: true }
        )
        if(!updatedPlan){
            return res.status(404).json({message: "Plan not found"}) ;
        }
        res.status(200).json({
            message: "Plan updated successfully",
            plan: updatedPlan,
        })
    } catch (error) {
        next(error) ;
    }
}

exports.deletePlan = async (req,res,next)=>{
    try {
        const planId = req.params.id ; 
        const deleted = await Plan.findByIdAndDelete({
            _id: planId,
            user: req.user._id,
        })
        if(!deleted){
            return res.status(404).json({message: "Plan not found"}) ;
        }

        res.status(200).json({
            message: "Plan deleted successfully",
        })
    } catch (error) {
        next(error) ;
    }
}
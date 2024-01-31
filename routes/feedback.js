const express = require("express") 
const {validateFeedback} = require("../validator")
const auth = require("../middleware/auth")
const Feedback = require("../models/Feedback")

router = express.Router()

router.get("/", async(req, res)=>{
    try{
    const feedback = await feedback.find()
        res.send(feedback)
    } catch (err) {
        res.send(" Error while Fetching Data");
    }
})



router.post("/", auth, async(req, res)=>{
    const {error} = validateFeedback(req.body)
    if (error) {
        return res.send(error.details[0].message)
    }

    let feedback = new Feedback({
        user: req.user._id,
        title: req.body.title,
        rating: req.body.rating
    })

    feedback = await feedback.save()
    res.send(feedback)
})


router.put("/:id", auth, async(req, res)=>{
    try{
    const feedback = await Feedback.findByIdAndUpdate(
    req.params.id,
    {
        title: req.body.title,
        rating: req.body.rating,
    },
    { new: true }
    )

    if(!feedback){
        return res.status(404).send("No Feedback Available!")
    }

    res.send(feedback)
} catch (err) {
    console.log(err);
}
})

    

router.delete("/:id", auth, async(req, res)=>{
    const feedback = await Feedback.findByIdAndDelete(req.params.id)
    if(!feedback){
        return res.status(404).send("Feedback is not found")
    }

    res.send(feedback)
})


module.exports = router
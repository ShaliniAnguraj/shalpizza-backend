const express = require("express")
const router = express.Router();
const User = require("../models/userModel")

router.post("/register", async (req, res) => {

    const { name, email, password, address } = req.body

    const newUser = new User({ name, email, password, address })

    try {
        newUser.save()
        res.send(newUser)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/login", async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.find({ email, password })

        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id
            }
            res.send(currentUser);
        }
        else {
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
        return res.status(400).json({ message: 'Something went weong' });
    }

});


router.get("/getallusers", async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/deleteuser", async (req, res) => {

    const userid = req.body.userid

    try {
        await User.findOneAndDelete({ _id: userid })
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("updateuser", async(req,res) =>{
    const user = await User.findById(req.user._id);

    if(user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.pic = req.body.pic || user.pic;
        if(req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            pic: updatedUser.pic,
            isAdmin: updatedUser.isAdmin,
            token: generateToken(updatedUser._id),
          });

    }
    else {
        res.status(404);
        throw new Error("User Not Found");
      }
})


module.exports = router



/**const express = require("express")
const router = express.Router();
const User = require("../models/userModel")

router.post("/register", async (req, res) => {

    const { name, email, password, address } = req.body

    const newUser = new User({ name, email, password, address })

    try {
        newUser.save()
        res.send(newUser)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/login", async (req, res) => {

    const { email, password } = req.body

    try {

        const user = await User.find({ email, password })

        if (user.length > 0) {
            const currentUser = {
                name: user[0].name,
                email: user[0].email,
                isAdmin: user[0].isAdmin,
                _id: user[0]._id
            }
            res.send(currentUser);
        }
        else {
            return res.status(400).json({ message: 'User Login Failed' });
        }

    } catch (error) {
        return res.status(400).json({ message: 'Something went weong' });
    }

});


router.get("/getallusers", async (req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});

router.post("/deleteuser", async (req, res) => {

    const userid = req.body.userid

    try {
        await User.findOneAndDelete({ _id: userid })
        res.send('User Deleted Successfully')
    } catch (error) {
        return res.status(400).json({ message: error });
    }

});


module.exports = router */
const router = require("express").Router();
let Student = require("../models/student")

//insert
router.route("/add").post((req,res)=>{

    const name = req.body.name; 
    const age = Number(req.body.age);
    const gender = req.body.gender;
    const mobile = Number(req.body.mobile);

    const newStudent = new Student(
        {
            name,
            age,
            gender,
            mobile
        }
    )

    newStudent.save().then(()=>{

        res.json("Student added");
 
    }).catch((err)=>{

        console.log;
    });

});

//fetch

router.route("/").get((req,res)=>{


    Student.find().then((students)=>
    {
        res.json(students)
    }).catch((err)=>{

        console.log(err);
    });
});

//update
router.route("/update/:sid").put(async(req,res)=>
{
    let userId = req.params.sid;

    const {name,age,gender,mobile} = req.body;

    const updateStudent = {
        name,
        age,
        gender,
        mobile
    }

    const update = await Student.findByIdAndUpdate(userId,updateStudent).then(()=>{

        res.status(200).send({status:"User updated"});

    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with updating data" , error:err.message});
    });
    

})

//delete
router.route("/delete/:sid").delete(async(req,res)=>{

    let userId = req.params.sid;

    await Student.findByIdAndDelete(userId).then(()=>{
        res.status(200).send({status:"User deleted"});
    }).catch((err)=>
    {
        console.log(err);
        res.status(500).send({status:"Error with deleting data" , error:err.message});
    })
})

//fetch one object
router.route("/get/:sid").get(async(req,res)=>{

    let userId = req.params.sid;

   const user =  await Student.findById(userId).then((student)=>{
        res.status(200).send({status:"User fetched",student});

    }).catch((err)=>
    {
        console.log(err);
        res.status(500).send({status:"Error with fetching data" , error:err.message});
    });

});



module.exports = router;
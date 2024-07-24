const express = require('express');
const z = require('zod');
const jwt = require('jsonwebtoken');

const { User, Account } = require('../db');
const { JWT_SECRET } = require('../config');
const { authMiddleware } = require('../middleware');

const router = express.Router();

const SignUpSchema = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string()
});

const SignInSchema = z.object({
    username: z.string().email(),
    password: z.string()
});


router.post("/signup", async (req, res)=>{

    const parsing = SignUpSchema.safeParse(req.body)
    // console.log(parsing.success  )
    if(!parsing.success){
        console.log(parsing.error)
        res.send('User/Password not corrected form');
    }

    const userExists = await User.findOne({username: req.body.username}).exec()
    if(userExists){
        res.json({
            message: "Email already taken / Incorrect inputs"
        });
    }

    const user = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    });

    
    const token = jwt.sign({
        userId
    }, JWT_SECRET);



    res.json({
        message: "User created successfully",
        token: token
    });


});

router.post('/signin', async (req, res)=>{

    const parsing1 = SignInSchema.safeParse(req.body);

    if(!parsing1.success){
        res.send('User/Password not corrected form');
    }

    const userExists = await User.findOne({username: req.body.username}).exec();
    if(!userExists){
        res.json({
            message: "No User Found!"
        });
    }
    // JWT logic code block learn later
    if (userExists) {
        const token = jwt.sign({
            userId: userExists._id
        }, JWT_SECRET);
        res.json({
            token: token
        })
        return;
    }

    // executes if the above code blocks fails to run
    res.status(411).json({
        message: "Error while logging in"
    })

});

const updateSchema = z.object({
    password: z.string().optional(),
    firstName: z.string().optional(),
    lastName: z.string().optional()
});

// router.put('/', authMiddleware, async (req, res)=>{
//     const auth = req.headers.authorization;
//     const parsing = updateSchema.safeParse(req.body);
//     if(!parsing.success){
//         res.json({
//             msg: "Enter valid password"
//         });
//     }
    
//     await User.updateOne(req.body, {
//         _id: req.userId
//     });

//     res.json({
//         message: "Updated successfully"
//     });

// });



// router.get('/bulk/:filter', async (req, res)=>{
//     const filter = req.params.filter;
    

//     const users = await User.find({
//         $or: [{
//             firstName: {
//                 "$regex": filter
//             }
//         }, {
//             lastName: {
//                 "$regex": filter
//             }
//         }]
//     })

//     res.json({
//         user: users.map(user => ({
//             firstName: firstName,
//             lastName: lastName,
//             _id: user._id
//         }))
//     })


// });


router.put("/", authMiddleware, async (req, res) => {
    const { success } = updateSchema.parse(req.body)
    if (!success) {
        res.status(411).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        id: req.userId
    })

    res.json({
        message: "Updated successfully"
    })
})

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports = router;

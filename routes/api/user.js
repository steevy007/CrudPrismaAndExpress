const router=require('express').Router()
const {PrismaClient}=require('@prisma/client')

const {user}=new PrismaClient();

router.get('/',async (req,res)=>{
    const users= await user.findMany({
        select:{
            email:true,
            name:true,
            posts:true
        }
    })

    res.json(users)
})


router.get('/find/:email',async (req,res)=>{
    const email=req.params.email;

    const existUser= await user.findUnique({
        where:{
            email
        },
        select:{
            email:true,
            name:true,
            posts:true
        }
    })

    if(existUser){
        res.json(existUser)
    }else{
        res.json({
            message:"Utilisateur non existant"
        })
    }
})


router.post('/create/:email/:name',async (req,res)=>{
    const newUser=req.params.email;

    const addNewUser=await user.create({
        data:{
            email:newUser
        }
    })

    if(addNewUser){
        res.json({
            message:"Utilisateur ajouter avec succes",
            data:newUser
        })
    }else{
        res.json({
            message:"Utilisateur non enregistrer"
        })
    }

    console.log(newUser)
})


router.put('/edit/:email',async(req,res)=>{
    const _email=req.params.email;

    const updateUser=await user.update({
        where:{
            email:_email
        },
        data:{
            name:"Sanon Steeve"
        }
    })


   const findUserUpdate=await user.findUnique({
        where:{
            email:_email
        },
        select:{
            email:true,
            name:true,
            posts:true
        }
    })

    if(updateUser){
        res.json({
            message:"user modifier avec succes",
            data:findUserUpdate
        });
    }else{
        res.json({
            message:"user non modifier"
        });
    }
})


router.delete('/delete/:email',async(req,res)=>{
    const email=req.params.email



    const findUser=await user.findUnique({
        where:{
            email
        }
    })

    if(findUser){

        const deleteUser=await user.delete({
            where:{
                email
            }
        })
    
        if(deleteUser){
            res.json({
                message:"user supprimer avec succes"
            })
        }else{
            res.json({
                message:"error de suppression"
            })
        }
    }else{
        res.json("Utilisateur non trouve")
    }

})
module.exports=router
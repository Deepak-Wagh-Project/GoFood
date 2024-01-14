const express=  require('express');
const router=express.Router();

router.post("/display-data",(req,res)=>{
        try {
           res.send({
            status:200,
            message:"Data is comming successfully",
            data:{
                foodData:[...global.food_items],
                foodCategoryData:[...global.food_category]}
           }) 
        } catch (error) {
            res.send({
                status:400,
                message:"Data issue",
                error:error
               })
        }
})

module.exports= router;
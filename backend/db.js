const mongoose =require('mongoose');
const mongoURI= 'mongodb+srv://deeps2398wagh:MA3KAiL5kVzcpdRw@cluster0.tukttwb.mongodb.net/GoFood?retryWrites=true&w=majority'
const mongoDBConnection= ()=>{
    mongoose.connect(mongoURI).then(async()=>{
        console.log("MongoDB is connected")
        const fetch_Food_Data= await mongoose.connection.db.collection('foodData')
         const food_data=await  fetch_Food_Data.find({}).toArray()
         const fetch_Category_Data= await mongoose.connection.db.collection('foodCategories')
         const food_Category_data=await  fetch_Category_Data.find({}).toArray()

        global.food_items=food_data;
        global.food_category=food_Category_data;
    }
    )
}

module.exports=mongoDBConnection;
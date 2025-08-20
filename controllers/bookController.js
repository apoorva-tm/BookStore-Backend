const books= require("../models/bookModel");
const stripe = require('stripe')(process.env.stripeKey)
exports.addBook=async(req,res)=>{
    console.log("Inside addBookController");
    const {title,author,noofpages,imageUrl,price,dprice, abstract,publisher,language,isbn,category} = req.body
    
    UploadedImages=[]
    req.files.map((item)=>UploadedImages.push(item.filename))
    
    console.log(req.files);//array
    console.log(req.body);

    const email = req.payload?.userMail
    console.log(email);
   try{
      const existingBook = await books.findOne({title,userMail:email})
      console.log(existingBook);
      
      if(existingBook){
        res.status(401).json("Book already existing....")
      }
      else{
        const newBook = new books({
          title,author,noofpages,imageUrl,price,dprice, abstract,publisher,language,isbn,category,UploadedImages,userMail:email
        })
        await newBook.save()
        res.status(200).json(newBook)

      }
    }
    catch(err){
      res.status(500).json("Err"+err)
    }
  
}


exports.getHomeBooks=async(req, res)=>{

  try {
    const homeBooks = await books.find().sort({ _id: -1 }).limit(4); 
    res.status(200).json(homeBooks);
  } catch (err) {
   
    res.status(500).json("Err"+err);
  }
  
}

exports.getAllBooks=async(req, res)=>{

  console.log(req.query);
  console.log('inside all books controller');
  const searchKey=req.query.search 
  const email = req.query.userMail
  

  try {
   const query = {
    title: {
    $regex: searchKey,
    $options: "i"
  },
  userMail:{
     $ne:email
  }
}
const allBooks = await books.find(query);
    res.status(200).json(allBooks);
  } catch (err) {
    
     res.status(500).json("Err"+err);
  }

}


exports.getABooks=async(req, res)=>{

  console.log("inside a book controller");
  const{id}=req.params
  console.log(id);
  
  

  try {
    const ABooks = await books.findOne({_id:id});
    res.status(200).json(ABooks);
  } catch (err) {
    
     res.status(500).json("Err"+err);
  }

}


// _____________________ADMIN_________________________________

exports.getAllBookAdmimController=async(req, res)=>{

  try {
    const allExistingBooks = await books.find(); 
    res.status(200).json(allExistingBooks);
  } catch (err) {
   
    res.status(500).json("Err"+err);
  }
  
}



exports.approveBooksAdminController=async(req,res)=>{

   const {_id,title,author,noofpages,imageUrl,price,dprice, abstract,publisher,language,isbn,category,UploadedImg,status,brought,
userMail} = req.body
     
     try {
    const allExistingBooks = await books.findByIdAndUpdate({_id},{title,author,noofpages,imageUrl,price,dprice, abstract,publisher,language,isbn,category,UploadedImg,status:'approved',brought,
userMail},{new:true}) 
await allExistingBooks.save()
    res.status(200).json(allExistingBooks);
  } catch (err) {
   
    res.status(500).json("Err"+err);
  }
}

exports.makepayment=async(req,res)=>{
  console.log("inside make payment");
  const {bookDetails}=req.body
  console.log(bookDetails);

  const email=req.payload.userMail
  console.log(email);
  
  try{
const existingBook = await books.findByIdAndUpdate({_id:bookDetails._id},{
  title:bookDetails.title,
  author:bookDetails.author,
  noofpages:bookDetails.noofpages,
  imageUrl:bookDetails.imageUrl,
  price:bookDetails.price,
  dprice:bookDetails.dprice,
   abstract:bookDetails.abstract,
   publisher:bookDetails.publisher,
   language:bookDetails.language,
   isbn:bookDetails.isbn,
   category:bookDetails.category,
   UploadedImg:bookDetails.UploadedImg,
   status:'sold',
   brought:email,
userMail:bookDetails.userMail},
{new:true}) 
console.log(existingBook);

line_item =[{
  price_data:{
    currency:'usd',
    product_data:{
      name:bookDetails.title,
      description :`${bookDetails.author} | ${bookDetails.publisher}`,
      images:[bookDetails.imageUrl],
      metadata:{
        title:bookDetails.title,
  author:bookDetails.author,
  noofpages:bookDetails.noofpages,
  imageUrl:bookDetails.imageUrl,
  price:bookDetails.price,
  dprice:bookDetails.dprice,
   abstract:bookDetails.abstract,
   publisher:bookDetails.publisher,
   language:bookDetails.language,
   isbn:bookDetails.isbn,
   category:bookDetails.category,
   UploadedImg:bookDetails.UploadedImg,
   status:'sold',
   brought:email,
userMail:bookDetails.userMail
      }
    },
   
    //doller conversion
    unit_amount:Math.round(bookDetails.dprice*100)
  },
   quantity:1
}]




//create stripe checkout session
const session = await stripe.checkout.sessions.create({
  //purchase using card
    "payment_method_types": ["card"],
    //details of book
    line_items: line_item,
    //make payment
  mode: 'payment',
  //if payment is successful then redirected to payment success

   success_url: 'http://localhost:5173/paymentsuccess',
  
   //if payment is unsuccessful then redirected to payment error
 cancel_url :'http://localhost:5173/paymenterror'

});
console.log(session);
res.status(200).json({sessionID:session.id,existingBook})
}
  
  catch(err){
res.status(500).json("Err"+err);
  }
}

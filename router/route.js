// Import express
const express = require('express');

// Import controllers
const usercontroller = require('../controllers/userController');
const jobController = require('../controllers/jobController');
const bookController = require('../controllers/bookController');

// Import middlewares
const jwtMiddleware = require('../middlewares/jwtMiddleware');
const multermiddleware = require('../middlewares/multerMiddleware');

// Create router instance
const route = new express.Router();

// 🔐 Auth Routes
route.post('/api/register', usercontroller.register);
route.post('/api/login', usercontroller.login);
route.post('/api/google-login', usercontroller.googleAuth);

// 📚 Book Routes
route.post('/api/addBook',jwtMiddleware,multermiddleware.array('UploadedImages', 3),
bookController.addBook);

route.get('/api/AllBook', bookController.getAllBooks);
route.get('/api/HomeBooks', bookController.getHomeBooks);
route.get('/api/ABook/:id', bookController.getABooks);

// 🛠️ Admin Book Routes
route.get('/api/admin-Books', jwtMiddleware, bookController.getAllBookAdmimController);
route.put('/api/admin-approvedBooks', jwtMiddleware, bookController.approveBooksAdminController);

// 👥 Admin User Route
route.get('/api/admin-allUsers', jwtMiddleware, usercontroller.getAllUserController);

// 💼 Admin Job Routes
route.post('/api/admin-addJobs', jwtMiddleware, jobController.addJobs);
route.get('/api/admin-allJobs', jwtMiddleware, jobController.getAllJobs);
route.delete('/api/admin-deleteJobs/:id',  jobController.deleteJobs);
route.put('/api/updateAdmin',jwtMiddleware,multermiddleware.single
  ('profile'),usercontroller.updateAdminDetails);

  route.get('/api/admin-Details', jwtMiddleware, usercontroller.getAdminDetails);
  route.put('/api/makepayment', jwtMiddleware, bookController.makepayment);
// Export the router
module.exports = route;
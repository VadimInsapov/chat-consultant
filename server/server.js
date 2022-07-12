require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/employeeRouter');
const channelRouter = require('./routes/channelRouter');
const app = express();
const authMiddleware = require('./middlewares/authMiddleware');

const messageController = require("./controllers/messageController");
async function a (){
    const s= await messageController.index(15);
    console.log(s);
}
// a();
// messageController.create("Привет", {
//     name: "Олег",
//     lastName: "Иванов",
//     city: "Москва",
// });
// messageController.create("Привет", {
//     userId: 23,
//     chatId: 15,
// });

app.use(express.json());
app.use('/employee', authRouter);
app.use('/channels', channelRouter, authMiddleware);
app.listen(PORT, () => console.log(`server started on port ${PORT}`));




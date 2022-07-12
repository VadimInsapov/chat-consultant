require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/authRouter');
const channelRouter = require('./routes/channelRouter');
const app = express();

const messageController = require("./controllers/messageController");
messageController.create("Привет", {
    name: "Олег",
    lastName: "Иванов",
    city: "Москва",
});
// messageController.create("Привет", {
//     userId: 23,
//     chatId: 15,
// });

app.use(express.json());
app.use('/auth', authRouter);
app.use('/channels', channelRouter);
app.listen(PORT, () => console.log(`server started on port ${PORT}`));




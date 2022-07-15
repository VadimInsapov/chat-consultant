require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/employeeRouter');
const channelRouter = require('./routes/channelRouter');
const cors = require('cors')
const app = express();
const socket = require("socket.io");

const authMiddleware = require('./middlewares/authMiddleware');

const messageController = require("./controllers/messageController");
const employeeModel = require("./models/Employee");

async function a() {
    const s = await messageController.index(15);
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
app.use(express.static(__dirname));
app.use(cors());
app.use(express.json());
app.use('/employee', authRouter);
app.use('/channels', channelRouter, authMiddleware);

const server = app.listen(process.env.PORT, () =>
    console.log(`server started on port ${PORT}`)
);
const io = socket(server, {
    cors: {
        origin: "*",
    },
});
io.on('connection', (socket) => {
    socket.on('greet', async (msg) => {
        const body = msg.body;
        delete msg.body;
        const messageInfo = await messageController.create(body, msg);
        console.log(messageInfo)
        socket.emit('greet', messageInfo);
        io.sockets.emit('greetUser',{});
    });
    socket.on('message', async (msg) => {
        const body = msg.body;
        delete msg.body;
        const messageInfo = await messageController.create(body, msg);
        const allMessageByChat = await messageController.index(msg.chatId);
        io.sockets.emit(msg.chatId, allMessageByChat);
    });
    socket.on('getMessages', async (msg) => {
        console.log(msg.chatId);
        const allMessageByChat = await messageController.index(msg.chatId);
        io.sockets.emit(msg.chatId, allMessageByChat);
    });
    socket.on('getIncomingQuests', async (msg) => {
        const allIncomingQuests = await employeeModel.getIncomingQuests(msg.employeeId);
        io.sockets.emit('incoming', allIncomingQuests);
    });
    socket.on('acceptEmployee', async ({chatId, employeeId}) => {
        employeeModel.addEmployeeChatRelation(employeeId, chatId);
        const allIncomingQuests = await employeeModel.getIncomingQuests(employeeId);
        io.sockets.emit('incoming-accept', allIncomingQuests);
    });
    socket.on('getMyQuests', async ({employeeId}) => {
        console.log(employeeId)
        const allMyQuests = await employeeModel.getMyQuests(employeeId);
        console.log(allMyQuests)
        io.sockets.emit('incomingMyQuests', allMyQuests);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});




require("dotenv").config();
const express = require('express');
const PORT = process.env.PORT || 5000;
const authRouter = require('./routes/authRouter')
const app = express();
app.use(express.json());
app.use('/auth', authRouter);
app.listen(PORT, () => console.log(`server started on port ${PORT}`));

const {USER} = require('./db/tableDenominations');

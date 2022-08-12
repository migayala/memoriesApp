require('dotenv').config();

const
    express = require('express'),
    cookieParser = require('cookie-parser'),
    app = express(),
    cors = require('cors');

require('./config/mongoose.config')(process.env.DB_NAME);

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000"
}));
app.use(cookieParser());
app.use(express.json(),express.urlencoded({ extended: true }));

require('./routes/user.routes')(app);
require('./routes/memory.routes')(app);

app.listen(process.env.DB_PORT, () => console.log(`The server is running on ${process.env.DB_PORT}`));
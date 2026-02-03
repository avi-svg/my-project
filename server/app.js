require('dotenv').config()
console.log("DB ENV:", process.env.DB_URL);

const express = require('express')
const app = express()
const routes = require('./routes/index')
const myMongo = require('./config/mongodb')
const cors = require('cors')
const cookieParser = require("cookie-parser");

app.use(express.json())
app.use(cors({
    origin: true,
    credentials: true,
}
));
app.use(cookieParser());

app.use('/api', routes)

app.use((req, res, next) => {
    res.status(404).json({
        error: 'Rout Not Found',
    })
})
console.log("DB:", process.env.DATABASE_URL?.split("@")[1]);

app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${process.env.PORT}`)
});
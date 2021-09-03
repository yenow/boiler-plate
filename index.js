const express = require('express')   // express 모듈을 가져옴
const app = express()        // 함수를 이용해서 새로운 express app을 만듬
const port = 3000

const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://ysy:ysy@boilerplate.odpmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
    // useCreateIndex : true,
    // useFindAndModify : false
}).then(() => console.log('MongoDB Connected...')).catch(err => console.log(err))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// mongodb+srv://ysy:<password>@boilerplate.odpmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

// test
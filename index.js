const express = require('express')   // express 모듈을 가져옴
const app = express()        // 함수를 이용해서 새로운 express app을 만듬
const port = 3000
const bodyParser = require("body-parser")
const { User } = require("./models/User")

// application/x-www-form-urlencoded 타입을 분석해서 데이터를 가져올 수 있음.
app.use(bodyParser.urlencoded({extended : true}))

// application/json 타입으로 된것을 분석해서 가져올수 있음
app.use(bodyParser.json())

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

app.post('/register',(req,res) => {
    // 회원 가입시 필요한 정보를 cilent에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);
    user.save((err,userInfo)=>{
        if(err) return res.json({success : false,err})
        return res.status(200).json({
            success : true
        })
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// mongodb+srv://ysy:<password>@boilerplate.odpmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb+srv://ysy:<password>@boilerplate.odpmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// test
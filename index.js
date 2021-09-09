const express = require('express')   // express 모듈을 가져옴
const app = express()        // 함수를 이용해서 새로운 express app을 만듬
const port = 3000
const bodyParser = require("body-parser")

const config = require('./config/key')

const { User } = require("./models/User")

// application/x-www-form-urlencoded 타입을 분석해서 데이터를 가져올 수 있음.
app.use(bodyParser.urlencoded({extended : true}))

// application/json 타입으로 된것을 분석해서 가져올수 있음
app.use(bodyParser.json())

const mongoose = require('mongoose')

// useCreateIndex : true
// useFindAndModify : false
mongoose.connect(config.mongoURI,{
    useNewUrlParser : true,
    useUnifiedTopology : true
},function (err) {
    if (err) {
        console.log(err)
        return false;
    }
    console.log('MongoDB Connected...')
})

app.get('/', (req, res) => {
    res.send('Hello World! hihi')
})

app.post('/register',(req,res) => {
    // 회원 가입시 필요한 정보를 cilent에서 가져오면
    // 그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body);

    user.save((err) => {
        if(err) {
            return res.json({success : false,err})
        }
        return res.status(200).json({
            success : true
        })
    })
})

app.post('/login', (req,res) => {

    /* 1. 요청된 이메일을 DB에 있는지 찾는다 */
    User.findOne({ email :  req.body.email }, (err,userInfo) => {
        if (!userInfo) {
            return res.json({
                loginSuccess : false,
                message : "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }

        /* 2. EMAIL이 있다면 비밀번호가 같은지 확인 */
        userInfo.comparePassword(req.body, (err,isMatch) => {
            if (!isMatch) {
                return res.json({
                    loginSuccess : false,
                    message : "비밀번호가 틀렸습니다."
                })
            }

            /* 3. 비밀번호가 맞다면 토큰 생성 */
            userInfo.generateToken((err,user) => {

            })
        })

    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// mongodb+srv://ysy:<password>@boilerplate.odpmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// mongodb+srv://ysy:<password>@boilerplate.odpmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
// 'mongodb+srv://ysy:ysy@boilerplate.odpmo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// test
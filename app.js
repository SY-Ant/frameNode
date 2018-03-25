'use  strict';


const  express  = require('express');
const  bodyParser = require('body-parser');

const  path = require('path');

let  app = express();

let  messages = [{name:'张三',msg:'鸟'}]

app.engine('html',require('express-art-template'));


let  router = express.Router();

router.get('/',(req,res,next)=>{
	res.render(path.join(__dirname,'index.html'),{
		myMsgs:messages
	})
})
.post('/sendMsg',(req,res,next)=>{
	messages.push({
		name:req.body.name,
		msg:req.body.msg
	})
	res.render(path.join(__dirname,'index.html'),{
		myMsgs:messages
	})
})
.all('*',(req,res)=>{
	res.send(`
			你查找的页面去旅行了...
			<a  href='/'>去首页</a>
		`)
})

//解析键值对
app.use(bodyParser.urlencoded({ extended: false }))
//解析json
app.use(bodyParser.json())

app.use(router)

app.listen(9999,()=>{
	console.log('服务器启动了');
})
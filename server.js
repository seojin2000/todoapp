const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient;
app.set('view engine', 'ejs');

var db;
MongoClient.connect('mongodb+srv://dlatjwls:dlatjwls06@cluster0.t0ug0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', function(에러, client){

  db = client.db('todoapp'); 
  
  

  app.listen(8080, function() {
    console.log('listening on 8080')
  })

})



app.use(bodyParser.urlencoded({extended: true}))



app.get('/', function(요청, 응답) { 
  응답.sendFile(__dirname +'/index.html')
});

app.get('/write', function(요청, 응답) { 
    응답.sendFile(__dirname +'/write.html')
});

app.get('/list', function(요청, 응답){
  db.collection('post').find().toArray(function(에러, 결과){
    console.log(결과)
    응답.render('list.ejs', { posts : 결과 })
  })
});



app.post('/add', function(요청, 응답){
  
  db.collection('post').insertOne({ 제목: 요청.body.title, 날짜: 요청.body.date }, function(에러,결과){
    console.log('저장완료');
  });
  
  응답.send('전송완료')
});
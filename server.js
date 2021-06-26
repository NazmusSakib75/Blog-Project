const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb+srv://sakib:sakib123@blog.u1w5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', 
{   useUnifiedTopology: true, 
    useNewUrlParser: true 
}).then(() => { console.log('mongo connected to altas...') })

// mongoose.connect('mongodb+srv://sakib:sakib123@blog.u1w5j.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { 
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => { console.log('mongo connected to altas...') })
// .catch(error => console.log(error));

// mongoose.connection.on('error', err => {
//     console.log('After initial connection error -');
//     console.log(err)
// });

// mongoose.connection.on('connected', err => {
//     console.log('MongnoDB connection established... -');
// });

app.set('view engine','ejs')

app.use(express.urlencoded({extended :false }))
app.use(methodOverride('_method'))




app.get('/',async(req,res)=>{
    const articles = await Article.find().sort({
        createdAt: 'desc'})
    res.render('articles/index',{articles : articles})
})

app.use('/articles',articleRouter)

app.listen(5000)
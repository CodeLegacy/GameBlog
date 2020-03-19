var express = require('express')
var app =express()
var flash = require("connect-flash")
var mongoose=require('mongoose')
Campground = require('./models/campground'),
Comment=require('./models/comment'),
/*seedDB = require('./seeds'),*/
passport = require('passport')
User = require('./models/user')
LocalStrategy = require('passport-local'),
methodOverride = require('method-override')
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index")
/*seedDB()*/
mongoose.connect("mongodb://localhost/yelp_camp_v11",{ useNewUrlParser:true})
var campgrounds = []
var bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride("_method"))
app.use(express.static(__dirname+"/public"))
app.set("view engine","ejs")
app.use(flash())
app.use(require('express-session')({
    secret: 'This is something u shouldn"t see',
    resave: false,
    saveUninitialized: false
}))

app.use(function(req,res,next){
    res.locals.currentUser=req.user
    res.locals.error = req.flash("error")
    res.locals.success=req.flash("success")
    next()
})

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use("/",indexRoutes)
app.use("/campground/:id/comments",commentRoutes)
app.use("/campground",campgroundRoutes)



app.listen(3000,function()
{
    console.log("Yelp Camp Server is on!!!")
})
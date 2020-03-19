var mongoose = require('mongoose')
var Campground = require('./models/campground')
var Comment = require('./models/comment')

data =[
    {
        name:"I was King",
        image:"data:image/jpeg;base64,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",
        description:"I was King, I had no limits, no Restriction but still I was Human"   
    },
    {
        name: "I am Joker",
        image: "https://stmed.net/sites/default/files/the-dark-knight-wallpapers-29998-1448243.jpg",
        description: "I am Joker, my mark on this world is nothing to be looked down on"
    },
    {
        name: "I am Happiness",
        image: "https://wallpapercave.com/wp/wp1838397.jpg",
        description: "I am Happiness , I lit this world with hope amidst darkness"
    }
]
function seedDB()
{
    Campground.deleteMany({},function(err){
        if(err)
        console.log(err)
        console.log('removed')
        data.forEach(function (seed) {
            Campground.create(seed, function (err, data) {
                if (err)
                    console.log(err)
                else
               { 
                    console.log("Campground added")
                    // Comment.create(
                    //     {
                    //         text:"This place is great, but i wish there was internet",
                    //         author:"Homer"
                    //     },function(err,comment){
                    //         if(err)
                    //         console.log(err)
                    //         else
                    //         {
                    //        data.comments.push(comment)
                    //         data.save();
                    //         console.log("Created new comment")
                    //     }
                    // }
                    // )
            }})
        })
    })    
}


module.exports=seedDB
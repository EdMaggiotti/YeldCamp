// you need to install the next repositories:
// npm install init
// npm install express
// npm install body-parser --save

var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
    name:           String,
    image:          String,
    description:    String
});

var Campground = mongoose.model("Campground", campgroundSchema);

/*Campground.create(
    { 
        name : "Salmon greek",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJ-7ThJ7yAdlFVeoMR0wW-K__PpbUsEaYr-_2ll2g8H7L_d4SoQ",
        description: "una tienda sin más"
    }, function(err,campground){
        if(err){
            console.log(err);
        } else{
            console.log("New campground created: " + campground);
        }
    });*/

var campgrounds = [
        { name : "Salmon greek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJ-7ThJ7yAdlFVeoMR0wW-K__PpbUsEaYr-_2ll2g8H7L_d4SoQ"},
        { name : "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIv8pYa-gmQG0E0dKXsmbRuh3YzY8bD-Q686ni6Hgcy5RkIq27w"},
        { name : "Mountain Goats", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr9bYy6w1_KhyKplCnpbJ6WBTaJqjAOltxOSRuFQaRiJ_Uu40QCw"},
        { name : "Salmon greek", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkJ-7ThJ7yAdlFVeoMR0wW-K__PpbUsEaYr-_2ll2g8H7L_d4SoQ"},
        { name : "Granite Hill", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeIv8pYa-gmQG0E0dKXsmbRuh3YzY8bD-Q686ni6Hgcy5RkIq27w"},
        { name : "Mountain Goats", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRr9bYy6w1_KhyKplCnpbJ6WBTaJqjAOltxOSRuFQaRiJ_Uu40QCw"}
    ];

// ROOT PAGE
app.get("/", function(req , res){
    res.render("landing"); 
});

// CAMPGROUND PAGE METHODS
app.get("/campgrounds", function(req , res){
    // GET ALL CAMPGROUNDS FROM DB
    Campground.find({}, function(err,allCampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("index", {campgrounds: allCampgrounds});
        }
    });
    
});

app.post("/campgrounds", function(req , res) {
    var name  =         req.body.name,
        image =         req.body.image,
        description =   req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // CREATE A NEW CAMPGROUND AND SAVE TO DATABASE
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/campgrounds");
        }
    });
});

// CAMPGROUND/NEW PAGE
app.get("/campgrounds/new", function(req , res) {
    res.render("new");
});

// SHOW CAMPGROUND BY ID
app.get("/campgrounds/:id", function(req , res) {
    // FUNCTION OF MONGOOSE TO FIND A DETAIL BY ID
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("detail", {campground: foundCampground});
        }
    });
});

app.listen(process.env.PORT, process.env.ID, function(){
    console.log("YeldCamp server started");
});
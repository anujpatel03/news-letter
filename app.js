const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");
const app=express();
const port=80;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});


app.post("/",(req,res)=>{
    const fname=req.body.fname;
    const lname=req.body.lname;
    const useremail=req.body.useremail;
    const data ={
        members:[
            {
                email_address:useremail,
                status:"subscribed",
                merge_fields:{
                    FNAME: fname,
	                LNAME: lname,
                }
            }
        ]
    }
    const jsondata=JSON.stringify(data);

    const apiKey="80f1e0dbdd8729ba09e0b8e08f7a2296-us9";
    const audienceID="6190615981";
    const url="https://us9.api.mailchimp.com/3.0/lists/6190615981"; // https://us9.api.mailchimp.com/3.0/lists/{audienceID}

    // const apiKey=process.env.ApiKey;
    // const audienceID= process.env.AudienceID;
    // const url= process.env.Url;// https://us9.api.mailchimp.com/3.0/lists/{audienceID}
    const options = {
        method:"POST",
        auth:"anuj:80f1e0dbdd8729ba09e0b8e08f7a2296-us9"
    }
    const request=https.request(url,options,(response)=>{

        if(response.statusCode==200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            // console.log(JSON.parse(data));          // Giving information of data
        })
    })

    request.write(jsondata);
    request.end();
});

app.post("/failure",(req,res)=>{
    res.redirect("/");   // Redirecting to home route
})

app.listen(port,()=>{
    console.log("Server is listening on port 80");
});
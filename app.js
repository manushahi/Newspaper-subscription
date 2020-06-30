const express=require("express");
const bodyParser=require("body-parser");
const request =require ("request");
const https=require("https");
const app=express();

app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res){
  res.sendFile(__dirname +"/sign.html");
});

app.post("/",function (req,res){
  const first=req.body.fName;
  const last=req.body.lName;
  const email=req.body.email;
  // console.log(first,last,email);
  // const data={
  const data={
    members:[
      {
        email_address:email,
        ststus:"subscribed",
        merge_fields:{
          FNAME:first,
          LNAME:last
        }
      }

    ]
  };
  //   members:[
  //     {
  //       email_address:email,
  //       status:"subscribed",
  //       merge_fields:{
  //         FNAME:first,
  //         LNAME:last,
  //       }
  //     }
  //   ]
  // }
  const jsonData=JSON.stringify(data);
  const url="https://us8.api.mailchimp.com/3.0/lists/e54c4c16e4";
  const options={
    method:"POST",
    auth:"manu:45d289ba1d77319d7977c1785ebdb9f8-us8"
  }
  const request = https.request(url,options,function(response){
    if(response.statusCode===200){
      res.sendFile(__dirname+"/success.html");
    }
    else {
      // res.send("please try again");
        res.sendFile(__dirname+"/fail.html");

    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })
  })
// const js=JSON.stringfy(data);
  // const url="https://us8.api.mailchimp.com/3.0/lists/e54c4c16e4";
  // const options={
  //   method:"POST",
  //   auth:"manu:45d289ba1d77319d7977c1785ebdb9f8-us8"
  // }
  //
  // const request=https.request(url,options,function(response){
  //   response.on("data",function(data){
  //     console.log(JSON.parse(data));
  //   })
  // })

  request.write(jsonData);
  request.end();
});

app.post("/fail",function(req,res){
  res.redirect("/");
})
// --data '{"name":"Freddie'\''s Favorite Hats","contact":{"company":"Mailchimp","address1":"675 Ponce De Leon Ave NE","address2":"Suite 5000","city":"Atlanta","state":"GA","zip":"30308","country":"US","phone":""},"permission_reminder":"You'\''re receiving this email because you signed up for updates about Freddie'\''s newest hats.","campaign_defaults":{"from_name":"Freddie","from_email":"freddie@freddiehats.com","subject":"","language":"en"},"email_type_option":true}' \


app.listen(3000|| process.env.PORT,function(){
  console.log("server is running at 3000");
})




// apikey 45d289ba1d77319d7977c1785ebdb9f8-us8

// list id e54c4c16e4

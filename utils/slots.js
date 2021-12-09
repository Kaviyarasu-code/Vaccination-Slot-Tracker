const axios=require('axios');

const table=require('tty-table');

var inquirer = require('inquirer');

const notifier=require('node-notifier');

const {config,options}=require('./config');



module.exports =function(districtid){
  var date=new Date();
  var today=`${date.getDate()}-${String(date.getMonth()+1).padStart(2,"0")}-${date.getFullYear()}`;

  inquirer
  .prompt([{
        type:"list",
        name:"choice",
        message:"Please Choose Age group",
        choices:[
            {
                name:"All ages",
                value:""
            },
            {
                name:"45+",
                value:"45"
            },
            {
                name:"18-45",
                value:"18"
            }
        ]
  }
    
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!

    axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=${districtid}&date=${today}`)
    .then(function(response){
        
       // console.log(response.data.districts);

        let headers=[
            {
                value:"center",
                alias:"Center Name",
                headerColor: "cyan",
                color: "white",
                align: "left",
                width: 40
            },
            {
                value:"address",
                alias:"Center Address",
                headerColor: "cyan",
                color: "white",
                align: "left",
                width: 40
            
            },
            {
                value:"available",
                alias:"Available ",
                headerColor: "cyan",
                color: "white",
                align: "left",
                width: 15
            },
            {
                value:"age",
                alias:"Age",
                headerColor: "cyan",
                color: "white",
                align: "left",
                width: 10
            },
            {
                value:"date",
                alias:"Date",
                headerColor: "cyan",
                color: "white",
                align: "left",
                width: 20
            }

        ];

       
       // console.log(response.data.centers);

        let finalData=[];

       response.data.centers.forEach((items) =>
        {
            districtname=items.district_name;
            items.sessions.forEach((session)=>{
                if(answers.choice==""){
                let ourData={
                    center:items.name,
                    address:items.address,
                    available:session.available_capacity,
                    age:session.min_age_limit,
                    date:session.date
                };
                finalData.push(ourData);
            }
            else if(answers.choice==session.min_age_limit){
                let ourData={
                    center:items.name,
                    address:items.address,
                    available:session.available_capacity,
                    age:session.min_age_limit,
                    date:session.date
                };
                finalData.push(ourData);
            }
            })
       });
       //console.log(finalData);
       const out=table(headers,finalData,options).render();
       console.log(`District -> ${districtname}`);
       console.log(`Date -> ${today}`);
       
       console.log(out);
       notifier.notify({
          title:"COWIN Slots",
          subtitle:"Vaccination",
          message:"Details Fetched Successfully",
          wait:true 
       });
    })
    .catch(function(err)
    {
        console.error(err);
    })
    .then(function()
    {
        //console.log("Process Over");
    });

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });


}
const axios=require('axios');

const table=require('tty-table');


const {config,options}=require('./config');



module.exports =function(stateid){

axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateid}`)
    .then(function(response){
        
       // console.log(response.data.districts);

        let headers=[
            {
                value:"district_id",
                alias:"District_ID",
                headerColor: "cyan",
                color: "white",
                align: "left",
                width: 20
            },
            {
                value:"district_name",
                alias:"District_Name",
                headerColor: "cyan",
                color: "white",
                align: "left",
                width: 40
            
            }
        ];

        const out=table(headers,response.data.districts,options).render();
        console.log(out);
    })
    .catch(function(err)
    {
        console.error(err);
    })
    .then(function()
    {
        //console.log("Process Over");
    });

}
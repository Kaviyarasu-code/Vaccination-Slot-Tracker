const axios = require('axios');
const table = require('tty-table');

const {config,options}=require('./config');

module.exports = function () {


    axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
        .then(function (response) {
            // console.table(response.data.states);

            let header = [{
                value: "state_id",
                headerColor: "cyan",
                color: "white",
                align: "left",
                alias:"State_ID",
                width: 20
            },
            {
                value: "state_name",
                headerColor:"red",
                color: "green",
                align:"left",
                alias:"State_Name",
                width: 40
            }]

            const out = table(header,response.data.states,options).render()
            console.log(out); 

        })

        .catch(function (error) {
            console.error(error);
        })
        .then(function () {

        });

}








//AXIOS Sample Code


// Make a request
// axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states')
//   .then(function (response) {
//     // handle success
//     console.log(response.data.states);
//   })
//   .catch(function (error) {
//     // handle error
//     console.log(error);
//   })
//   .then(function () {
//     // always executed
//     console.log("hi")
//   });

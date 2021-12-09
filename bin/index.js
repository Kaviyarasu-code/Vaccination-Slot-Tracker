#! /usr/bin/env node

const states=require("../utils/states");
const districts=require("../utils/districts");
const slots =require("../utils/slots");

const program=require("commander");

program
  .command('states')
  .description('List Down All the States')
  .action(states);


program
  .command('districts <stateid>')
  .description('Listing  Down All the Districts using State_Id')
  .action(districts);


  program
  .command('slots <districtid>')
  .description('Get All Slots Of A District Using District_ID')
  .action(slots);

  program.parse();

    

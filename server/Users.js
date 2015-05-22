'use strict';

var path       = require('path');
var __         = require('underscore');

var users = [
  {modelId: 1,  name:'Mike'    , address: 'Gumma'},
  {modelId: 5,  name:'Mary'    , address: 'Saitama'},
  {modelId: 7,  name:'Ken'     , address: 'Chiba'},
  {modelId: 9,  name:'Bob'     , address: 'Tokyo'},
  {modelId: 11, name:'Tom'     , address: 'Tochigi'},
  {modelId: 15, name:'Susie'   , address: 'Kanagawa'},
  {modelId: 18, name:'Gorilla' , address: 'Gumma'},
  {modelId: 22, name:'Yasu'    , address: 'Abashiri'},
];

module.exports = function(router){

  router.route('/users')
    .get(function (req, res){
      if(req.accepts('html', 'json')==='json'){

        res.set({'Content-Type': 'application/json',
                 'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
                 'Pragma':        'no-cache',
                 'Expires':       'Sat, 26 Jul 1997 05:00:00 GMT'});
        res.json({
          "list" : users,
        });

      } else {

        res.sendFile('index.html', {
          root: path.join(__dirname, '../app'),
        });

      }
    })
    .post(function (req, res){
      console.log(users);
    });

  router.route('/users/:id')
    .get(function (req, res){
      if(req.accepts('html', 'json')==='json'){
        res.set({'Content-Type': 'application/json',
                 'Cache-Control': 'no-cache, no-store, max-age=0, must-revalidate',
                 'Pragma':        'no-cache',
                 'Expires':       'Sat, 26 Jul 1997 05:00:00 GMT'});

        //res.set({'Content-Type': 'application/json'});
        const model = __.find(users,function(user){
          return parseInt(req.params.id, 10) === user.modelId;
        });
        if( model != undefined ) {
          res.json(model);
        } else {
          res.sendStatus(404);
        }

      } else {

        res.sendFile('index.html', {
          root: path.join(__dirname, '../app'),
        });

      }
    })
    .put(function (req, res){
      console.log(users);
    })
    .delete(function (req, res){
      console.log(users);
    });

};


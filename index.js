'use strict';

const app = require('./app')
var neo4j = require('neo4j-driver').v1;
var driver = neo4j.driver("bolt://hobby-djjfigaajbbfgbkeaecpfepl.dbs.graphenedb.com:24786", neo4j.auth.basic("openlight", "b.6GGBQb5zVyyC.AGcbmyfCH0dLlifb"));

exports.handler = function(event, context, callback) {

  var body = JSON.parse(event.body);
    console.log(body);

    var session = driver.session();
  
    var name = body.name;
    var email = body.email;
    var response;
    session
        .run("CREATE (n:User {name:'"+name+"', email:'"+email+"'}) RETURN n.id")
        .subscribe({
            onNext: function (record) {
              console.log(record.get('n.id'));
            },
            onCompleted: function () {
             callback(null, { statusCode: 201, body: ""});
              session.close();
            },
            onError: function (error) {
              console.log(error);
              callback(null, { statusCode: 500, body: ""});
            }
          });  
}

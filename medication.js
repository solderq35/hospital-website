module.exports = function(){
    var express = require('express');
    var router = express.Router();
	var errormessage = '';
	var errormessage3 = '';
function geterrormessage(res, context, complete){
    
            context.errormessage = errormessage;
            complete();
    }
	
function geterrormessage3(res, context, complete){
    
            context.errormessage3 = errormessage3;
            complete();
    }

    function getPlanets(res, mysql, context, complete){
        mysql.pool.query("SELECT planet_id as id, name FROM bsg_planets", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.planets  = results;
            complete();
        });
    }

    function getPeople(res, mysql, context, complete){
        mysql.pool.query("SELECT medication_id as id, medication_name, manufacturer FROM medication", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.medication = results;
            complete();
        });
    }

    function getPeoplebyHomeworld(req, res, mysql, context, complete){
      var query = "SELECT bsg_people.character_id as id, fname, lname, bsg_planets.name AS homeworld, age FROM bsg_people INNER JOIN bsg_planets ON homeworld = bsg_planets.planet_id WHERE bsg_people.homeworld = ?";
      console.log(req.params)
      var inserts = [req.params.homeworld]
      mysql.pool.query(query, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.people = results;
            complete();
        });
    }

    /* Find people whose fname starts with a given string in the req */
    function getPeopleWithNameLike(req, res, mysql, context, complete) {
      //sanitize the input as well as include the % character
       var query = "SELECT medication_id as id, medication_name, manufacturer FROM medication WHERE medication.medication_name LIKE " + mysql.pool.escape(req.params.s + '%');
      console.log(query)

      mysql.pool.query(query, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.medication = results;
            complete();
        });
    }

    function getPerson(res, mysql, context, id, complete){
        var sql = "select medication_id as id, medication_name, manufacturer FROM medication WHERE medication_id = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.medication = results[0];
            complete();
        });
    }

    /*Display all people. Requires web based javascript to delete users with AJAX*/

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletefunction.js","filterpeople.js","searchfunction.js"];
        var mysql = req.app.get('mysql');
			
        getPeople(res, mysql, context, complete);
        getPlanets(res, mysql, context, complete);
		geterrormessage(res, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('medication', context);
            }

        }
    });

    /*Display all people from a given homeworld. Requires web based javascript to delete users with AJAX*/
    router.get('/filter/:homeworld', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deleteperson.js","filterpeople.js","searchpeople.js"];
        var mysql = req.app.get('mysql');
        getPeoplebyHomeworld(req,res, mysql, context, complete);
        getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('medication', context);
            }

        }
    });

    /*Display all people whose name starts with a given string. Requires web based javascript to delete users with AJAX */
    router.get('/search/:s', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletefunction.js","filterpeople.js","searchfunction.js","updatefunction.js"];
        var mysql = req.app.get('mysql');
		errormessage = "";
        getPeopleWithNameLike(req, res, mysql, context, complete);
        getPlanets(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('medication', context);
            }
        }
    });

    /* Display one person for the specific purpose of updating people */

    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.jsscripts = ["deletefunction.js","searchfunction.js", "updatefunction.js"];
        var mysql = req.app.get('mysql');
		if (req.params.id === "search")
			{
				errormessage = "Invalid Input, please enter a search term.";
				res.redirect('/medication');
			}
			else{
        getPerson(res, mysql, context, req.params.id, complete);
        getPlanets(res, mysql, context, complete);
		geterrormessage3(res, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 3){
                res.render('update-medication', context);
            }

        }
			}
    });

    /* Adds a person, redirects to the people page after adding */

    router.post('/', function(req, res){
        console.log(req.body.medication)
        console.log(req.body)
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO medication (medication_name,manufacturer) VALUES (?,?)";
        var inserts = [req.body.medication_name, req.body.manufacturer];
		if ((!inserts[0]) === true || (!inserts[1]) === true)
		{
			errormessage = "Invalid Input! Please fill in all input fields.";
			res.redirect('/medication');
        }
		
		else{
			errormessage = "";	
			sql = mysql.pool.query(sql,inserts,function(error, results, fields){
				res.redirect('/medication');
		});
    }
	});
    /* The URI that update data is sent to in order to update a person */

    router.put('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE medication SET medication_name=?, manufacturer=? WHERE medication_id = ?";
        var inserts = [req.body.medication_name, req.body.manufacturer, req.params.id];
		if (!inserts[0] === true || !inserts[1] === true)
			{
				errormessage3 = "Invalid Input! Please fill in all input fields.";
				res.redirect(req.get('/medication'));
				console.log(errormessage3);
			}
			else {
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
	}
    });

    /* Route to delete a person, simply returns a 202 upon success. Ajax will handle this. */

    router.delete('/:id', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "DELETE FROM medication WHERE medication_id = ?";
        var inserts = [req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.status(400);
                res.end();
            }else{
                res.status(202).end();
            }
        })
    })

    return router;
}();
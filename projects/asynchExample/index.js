/**
 * 
 */

console.log("hello");

var async = require("async");

//async.series([   -- in order, not in parralel
async.parallel([
      function(callback){
    	  setTimeout(function(){
    		  console.log("Task 1");
    		  callback(null,111);
    	  }, 200);
      },
      function(callback){
    	  setTimeout(function(){
    		  console.log("Task 2");
    		  callback(null,'potato','ah');
    	  }, 100);
      },
      function(callback){
    	  setTimeout(function(){
    		  console.log("Task 3");
    		  callback(null,333);
    	  }, 100);
      }
   ],function(error,results){
		console.log("hmmm");
		console.log(results);
	}
   );

//result from one asynch call is iped to params of next asynch call
async.waterfall([
                function(callback){
              	  setTimeout(function(){
              		  console.log("Task 1");
              		  callback(null,1,'hello');
              	  }, 200);
                },
                function(amount, phrase, callback){
              	  setTimeout(function(){
              		  console.log("Task 2");
              		  console.log(phrase);
              		  phrase += ' world'; 
              		  amount *= 2;
              		  callback(null,amount,phrase,'!!!');
              	  }, 100);
                },
                function(amount, phrase, addendum, callback){
              	  setTimeout(function(){
              		  console.log("Task 3");
              		  console.log(phrase);
             		  phrase += addendum; 
              		  amount *= 2;
              		  callback(null,amount,phrase);
              	  }, 100);
                }
             ],function(error,total, greeting){
          		console.log("FINAL");
          		console.log("total = " + total);
          		console.log(greeting);
          	}
             );

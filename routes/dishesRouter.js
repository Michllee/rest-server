var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var dishesRouter = express.Router();

dishesRouter.use(bodyParser.json());


//dishesRouter.all(function(req, res, next){
//    res.write(200,{'Content-Type':'text/plain'});
//    next();
//})
//.get('/',function(req, res, next) {
//    res.end('Will send all dishes to you!');
//})
//.delete('/', function(req, res, next) {
//    res.end('Delete all dishes');
//})
//.post('/',function(req,res,next){
//    res.end('disheName:' + req.body.disheName + ' some description:' + req.body.description);
//})
//.get('/:disheId', function (req, res, next) {
//    res.end("Will send dishe " + req.params.disheId + ' to you!')
//})
//.put('/:disheId', function (req, res, next) {
//    res.write('Will update dishe: '+ req.params.disheId + '\n');
//    res.end('Will update the dishes: ' + req.body.name + ' with the detail: ' + req.body.decription );
//})
//.delete('/:disheId',function(req,res,next){
//    res.end('Willd delete the dishe: '+ req.params.disheId);
//});

dishesRouter.route('/')
    .get(function (req, res, next) {
        Dishes.find({}, function (err, dish) {
            if (err) throw err;
            res.json(dish);
        })
    })

    .post(function(req, res, next){
        Dishes.create(req.body, function (err, dish) {
            if (err) throw err;
            console.log('Dish created!');
            var id = dish.id;
            res.writeHead(200,{
                'Content-Type':'text/plain'
            });
            res.end('Added the dis with id: ' + id);
        })
    })
    .delete(function (req, res, next) {
        Dishes.remove({}, function(err, resp){
            if (err) throw err;
            res.json(resp);
        });
    });

dishesRouter.route('/:dishId')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId, function(err, dish){
            if(err) throw err;
            res.json(dish);
        })
    })
    .put(function (req, res, next) {
        Dishes.findByIdAndUpdate(req.params.dishId, {
            $set: req.body
        }, {
            new: true
        },function(err, dish){
            if (err) throw err;

            res.json(dish);
        })
    })
    .delete(function(req, res, next){
        Dishes.findByIdAndRemove(req.params.disheId, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        })
    });

dishesRouter.route('/:dishId/comments')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            res.json(dish.comments);
        });
    })
    .post(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                console.log('Updated Comments');
                res.json(dish);
            });
        });
    })
    .delete(function(req, res, next){
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            for (var i = (dish.comments.length - 1); i>=0 ; i--){
                dish.comments.id(dish.comments[i]._id).remove();
            }
            dish.save(function (err, result) {
                if (err) throw err;
                res.writeHead(200, {
                    'Content-type': 'text/plain'
                });
                res.end('Delete all comments!');
            })
        })
    });

dishesRouter.route('/:dishId/comments/:commentId')
    .get(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if (err) throw err;
            res.json(dish.comments.id(req.params.commentId));
        })
    })
    .put(function (req, res, next) {
        Dishes.findById(req.params.dishId, function (err, dish) {
            if(err) throw err;
            dish.comments.id(req.params.commentId).remove();
            dish.comments.push(req.body);
            dish.save(function (err, dish) {
                if (err) throw err;
                console.log('Updated Comments!');
                res.json(dish);
            })
        });
    })
    .delete(function(req, res, next){
        Dishes.findById(req.params.dishId, function (err, dish) {
            dish.comments.id(req.params.commentId).remove();
            dish.save(function (err, resp) {
                if (err) throw err;
                res.json(resp);
            })
        })
    });


module.exports = dishesRouter;
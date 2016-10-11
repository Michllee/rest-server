var express = require('express');

var leaderRouter = express.Router();
module.exports = leaderRouter;

leaderRouter.all('/',function(req, res, next){
    res.writeHead(200,{'Content-Type':'text/plain'});
    next();
})
.get('/',function(req, res, next){
    res.end('Send all leaders to you !');
})
.post('/',function(req, res, next){
    res.end('The name of leader: '+ req.body.name + ' detail of ' + req.body.detail);
})
.delete('/', function(req, res, next) {
    res.end('Delete all leaders');
})
.get('/:leaderId', function(req, res, next){
    res.end('Send the '+ req.params.leaderId + ' to you!');
})
.put('/:leaderId', function(req, res, next){
    res.write('Will update the leader '+ req.params.leaderId + '\n');
    res.end('Update the leader '+ req.body.name + ' detail of ' + req.body.detail);
})

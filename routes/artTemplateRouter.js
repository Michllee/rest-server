var express = require('express');

var artTmlRouter = express.Router();

// artTmlRouter.all(function(req, res, next) {

// }).get('/', function(req, res, next) {
//     var data = {
//         title: '姓名名单-arttemplate',
//         nameList: [{
//             id: '1',
//             name: "lee"
//         }, {
//             id: '2',
//             name: 'zhang'
//         }, {
//             id: '3',
//             name: 'chu'
//         }]
//     };
//     res.render('arttemplate', data);
//     console.log('success');
// });

artTmlRouter.get('/', function(req, res, next) {
    var data = {
        title: '姓名名单-arttemplate',
        nameList: [{
            id: '1',
            name: "lee"
        }, {
            id: '2',
            name: 'zhang'
        }, {
            id: '3',
            name: 'chu'
        }]
    };
    res.render('arttemplate', data);
    console.log('success');
});

module.exports = artTmlRouter;
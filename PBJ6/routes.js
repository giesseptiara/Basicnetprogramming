'use strict';

module.exports = function (app) {
  // Route User
  var routeuser = require('./controller/usercontroller');

  app.route('/user').get(routeuser.showAllUser);
//  app.route('/user/:id').get(routeuser.showUserById);
//  app.route('/user/add').post(routeuser.addUser);
//  app.route('/user/update').put(routeuser.updateUser);
//  app.route('/user/delete').delete(routeuser.deleteUser);
};
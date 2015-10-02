'use strict';
window.app = angular.module('FullstackGeneratedApp', ['ui.router', 'ui.bootstrap', 'fsaPreBuilt', 'js-data']);

app.config(function ($urlRouterProvider, $locationProvider, DSProvider) {
    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
    $urlRouterProvider.otherwise('/');


    DSProvider.defaults.basePath = '/api';
    DSProvider.defaults.idAttribute = '_id';
    /*
    a method to the DSProvider defaults object that automatically
    checks if there is any data in the cache for a given service before
    pinging the database
    */
    DSProvider.defaults.getOrFind = function(service){
      var data = this.getAll();
      if (data.length) return Promise.resolve(angular.copy(data));
      else {
        return this.findAll().then(function(data){
          return angular.copy(data);
        });
      }
    };

    /*
    removes the relations from an object before the request is sent to the DB
    (this is hard!)
    */
     //DSProvider.defaults.serialize = function (resource, data) {
     //  if (resource.relationFields && resource.relationFields.length){
     //    data = angular.copy(data);
     //    resource.relationFields.forEach(function(relation){
     //      if(data[relation] && typeof data[relation] === 'object') data[relation] = data[relation]._id
     //    })
     //  }
     //}

  })
  .config(function(DSProvider) {
    // Mongoose Relation Fix (fixes deserialization)
    // From http://plnkr.co/edit/3z90PD9wwwhWdnVrZqkB?p=preview
    // This was shown to us by @jmdobry, the idea here is that
    // we fix the data coming from Mongoose models in js-data rather than outbound from Mongoose
    function fixRelations(Resource, instance) {
      function fixLocalKeys(i) {
        JSData.DSUtils.forEach(Resource.relationList, function(def) {
          var relationName = def.relation;
          var relationDef = Resource.getResource(relationName);
          if (def.type === 'hasMany') {
            if (i.hasOwnProperty(def.localField)) {
              if (i[def.localField].length && !JSData.DSUtils.isObject(i[def.localField][0])) {
                // Case 1: array of _ids where array of populated objects should be
                i[def.localKeys] = i[def.localField];
                delete i[def.localField];
              } else if (!i[def.localKeys]) {
                // Case 2: array of populated objects, but missing array of _ids'
                i[def.localKeys] = [];
                JSData.DSUtils.forEach(i[def.localField], function(child) {
                  i[def.localKeys].push(child[relationDef.idAttribute]);
                });
              }
            }
          }
          else if (def.type === 'belongsTo') {
            if (i.hasOwnProperty(def.localField)) {
              // if the localfIeld is a popualted object
              if (JSData.DSUtils.isObject(i[def.localField])) {
                i[def.localKey] = i[def.localField]._id;
              }
              // if the localfield is an object id
              else if (!JSData.DSUtils.isObject(i[def.localField])) {
                i[def.localKey] = i[def.localField];
                delete i[def.localField];
              }
            }
          }
        });
      }

      if (JSData.DSUtils.isArray(instance)) {
        JSData.DSUtils.forEach(instance, fixLocalKeys);
      } else {
        fixLocalKeys(instance);
      }
    }


    DSProvider.defaults.deserialize = function(Resource, data) {
      var instance = data.data;
      fixRelations(Resource, instance);
      return instance;
    };
    // End Mongoose Relation fix





});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

    // The given state requires an authenticated user.
    var destinationStateRequiresAuth = function (state) {
        return state.data && state.data.authenticate;
    };

    // $stateChangeStart is an event fired
    // whenever the process of changing a state begins.
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

        if (!destinationStateRequiresAuth(toState)) {
            // The destination state does not require authentication
            // Short circuit with return.
            return;
        }

        if (AuthService.isAuthenticated()) {
            // The user is authenticated.
            // Short circuit with return.
            return;
        }

        // Cancel navigating to new state.
        event.preventDefault();

        AuthService.getLoggedInUser().then(function (user) {
            // If a user is retrieved, then renavigate to the destination
            // (the second time, AuthService.isAuthenticated() will work)
            // otherwise, if no user is logged in, go to "login" state.
            if (user) {
                $state.go(toState.name, toParams);
            } else {
                $state.go('login');
            }
        });

    });

});
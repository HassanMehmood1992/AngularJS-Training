// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'socket'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.backButton.previousTitleText(false).text('');
    $stateProvider


         .state('login', {
             url: "/login",
            // abstract: true,
             templateUrl: "templates/login.html",
             controller: 'LoginController'
         })


  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })

  .state('app.tasks', {
      url: "/tasks",
    views: {
        'tab-tasks': {
            templateUrl: "templates/tasks.html",
            controller: 'TasksCtrl'
      }
    }
  })

  .state('app.subscribe', {
      url: "/subscribe",
    views: {
        'tab-subscribe': {
            templateUrl: "templates/subscribe.html",
            controller: 'SubscribeCtrl'
      }
    }
  })

  .state('app.processes', {
    url: "/processes",
    views: {
        'tab-processes': {
            templateUrl: "templates/processes.html",
            controller: 'ProcessesCtrl'
      }
    }
  })

    .state('app.process', {
        url: "/processes/:processId",
        views: {
            'tab-processes': {
                templateUrl: "templates/process.html",
                controller: 'ProcessCtrl'
            }
        }
       
    })
     .state('app.lookup', {
         url: "/processes/:processId/:lookupid",
         views: {
             'tab-processes': {
                 templateUrl: "templates/lookup.html",
                 controller: 'LookuplistCtrl'
             }
         }
     })
    .state('app.processSettings', {
        url: "/processes/:processId",
        views: {
            'tab-processes': {
                templateUrl: "templates/processSettings.html",
                controller: 'ProcessSettingsCtrl'
            }
        }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

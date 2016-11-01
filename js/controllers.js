angular.module('starter.controllers', [])

.service("freshlypressed",function ($http,$log){
    this.getblogs = function () {

        $http.get('https://az0181d.abbvienet.com/Abbvie.corp.cop.RapidFlow6.0.WCF/CustomOperations.svc/helloworld', { withCredentials: true, async: false}).success(function (data, GetQuoteAsync) {
            console.log(GetQuoteAsync), console.log(data);
        });   
    };
})


.controller('LoginController', function ($scope, $ionicModal, $timeout, $state, socket) {
   
    // Form data for the login modal
    $scope.loginData = {};  
    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {


//        navigator.globalization.getPreferredLanguage(
//    function (language) { alert('language: ' + language.value + '\n');  },
//    function () { alert('Error getting language\n'); }
//);

//        navigator.globalization.getLocaleName(
//    function (locale) { alert('locale: ' + locale.value + '\n'); },
//    function () { alert('Error getting locale\n'); }
//);

//        navigator.globalization.dateToString(
//    new Date(),
//    function (date) { alert('date: ' + date.value + '\n'); },
//    function () { alert('Error getting dateString\n'); },
//    { formatLength: 'short', selector: 'date and time' }
//);

//       // function checkDatePattern() {
//            navigator.globalization.getDatePattern(
//                function (date)
//                {
//                    alert('pattern: ' + date.timezone + '\n');
//                },
//                function ()
//                {
//                    alert('Error getting pattern\n');
//                },

//                {
//                    formatLength: 'full', selector: 'date and time'
//                }
//            );
   
        console.log('Doing login', $scope.loginData);
      
        var credentials = new Object();
        credentials.userName = $scope.loginData.username;
        credentials.password = $scope.loginData.password;
       
      
        socket.sendMessage("AuthenticateUser", credentials, $state);        
        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
   	
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ProcessesCtrl', function ($scope,$state) {
    $scope.ProcessList = [
       { img: "img/process.png", title: 'LEAVE', description: 'Leave Request' },
       { img: "img/process.png", title: 'BTR', description: 'Business Travel Request' },
       { img: "img/process.png", title: 'EPO', description: 'Electronic Purchage Order Request' }
    ]
    $scope.goToProcess = function(process)
    {
        $state.go('app.process', { processId :process.title})
    }
})

.controller('ProcessCtrl', function ($scope, $stateParams, $ionicPopover, $state) {
    //var template = '<ion-popover-view><ion-header-bar> <h1 class="title">Process lookups</h1> </ion-header-bar> <ion-content> Hello! </ion-content></ion-popover-view>';

    //$scope.popover = $ionicPopover.fromTemplate(template, {
    //    scope: $scope
    //});

    // .fromTemplateUrl() method
    $scope.title = $stateParams.processId
   
    $scope.Lookups = [
   { title: 'Employees', id: 1 },
   { title: 'Departments', id: 2 },
   { title: 'organziations', id: 3 }
    ];
  //  $scope.processid = $stateParams.playlistId;
    $ionicPopover.fromTemplateUrl('templates/popover/processlookup.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });
    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
    $scope.gotolookup = function (lookupid) {
        $scope.popover.hide();
        $state.go('app.lookup', { processId: $stateParams.processId, lookupid: lookupid })
    };
   
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
        // Execute action
    });

    $scope.goToProcessSettings = function () {
        $state.go('app.processSettings', { processId: $stateParams.processId })
    }
})
.controller('LookuplistCtrl', function ($scope, $stateParams) {
    $scope.lookuptitle = $stateParams.lookupid

})
.controller('TasksCtrl', function ($scope, $stateParams, $ionicPopover) {
    $scope.AllTasks = [
        { img: "img/process.png", title: 'Make up Leave', description: 'Mehmood, Hassan' },
        { img: "img/process.png", title: 'Sick Leave', description: 'Zubair, Ismail X' },
        { img: "img/process.png", title: 'Annual Leave', description: 'Hussain, Majid' },
        { img: "img/process.png", title: 'BTR', description: 'Travel to Dubai Hussain, Majid' }
    ]
    $ionicPopover.fromTemplateUrl('templates/popover/task.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });
    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
   

    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.popover.remove();
    });
    // Execute action on hide popover
    $scope.$on('popover.hidden', function () {
        // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function () {
        // Execute action
    });
    $scope.Comments = "hassan2"

    
})
.controller('SubscribeCtrl', function ($scope, $stateParams) {
    //$scope.lookuptitle = $stateParams.lookupid
    $scope.AllProcesses = [
        { img: "img/process.png", title: 'LEAVE', description: 'Leave Request' },
        { img: "img/process.png", title: 'BTR', description: 'Business Travel Request' },
        { img: "img/process.png", title: 'EPO', description: 'Electronic Purchage Order Request' },
        { img: "img/process.png", title: 'RPDM', description: 'RapidFlow Service Delivery Management Project' }
    ]
    
})

.controller('ProcessSettingsCtrl', function ($scope, $stateParams) {
    $scope.ProcessSettingTitle = $stateParams.processId + " Settings"


})
.controller('TaskPopoverCtrl', function ($scope, $stateParams, $ionicPopup) {
    
    $scope.showalert = function(value)
    {
        var title = ""
        var msg = ""
        switch (value)
        {
            case "approved":
                title = "Approved"
                msg = 'Task has been approved'
                break;
        }
        

        var alertPopup = $ionicPopup.alert({
            title: title,
            template: msg
        });

        alertPopup.then(function (res) {
            console.log('Thank you for not eating my delicious ice cream cone');
        });
    }
    
});

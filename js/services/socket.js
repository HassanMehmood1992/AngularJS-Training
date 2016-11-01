angular.module('socket', [])

.factory('socket', function () {

    var state;
    //var scope;
    var connection = new WebSocket("ws://az0181d.abbvienet.com"
           + "/WcfWSChatForWeb/WSChatService.svc");
    connection.onopen = function () {
        console.log("connected");
    };


    connection.sendMessage = function (methodName, parameterObj, $state, $scope) {
        if (connection.readyState == WebSocket.OPEN) {
            var payload = new Object();
            payload.methodName = methodName;
            payload.parameterObj = JSON.stringify(parameterObj);
            connection.send(JSON.stringify(payload));
            state = $state;
            scope = $scope;
       }
    }

    connection.onmessage = function (evt) {
        if (evt.data == "true") {
            state.go('app.processes');

           // scope.credentialsMessage = "";
        }
        else {
            alert("Invalid UserName or Password");
        }
        console.log(evt.data);
       // var chatter = JSON.parse(evt.data);
       // addMessageToList(chatter.nickname, true, chatter.message);
    };
    connection.onerror = function (evt) {
        console.log(evt.message);
    };
    connection.onclose = function () {
        console.log("disconnected");
    };

    return connection;
});
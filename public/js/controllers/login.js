app.controller('LoginCtrl', function ($scope, $http, toastr, $location, $rootScope) {
    $scope.membro = {};
    $scope.autenticar = function () {
        $http.post('api/login', $scope.membro).then(function(res) {
            localStorage.setItem("token", res.data);
            $rootScope.isAuth = true;
            $location.path('/');
        }).catch(function (err) {});
    };
});

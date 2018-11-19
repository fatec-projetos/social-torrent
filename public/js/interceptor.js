(function(){
    "use strict";
    app.factory("Interceptor", ["$injector", Interceptor]);

    function Interceptor($injector) {
        var $q = $injector.get('$q');
        var $rootScope = $injector.get('$rootScope');
        var $location = $injector.get('$location');
        return {
            request: function(config) {
                if(localStorage.getItem('token')) {
                    config.headers['x-access-token'] = localStorage.getItem('token');
                }
                return config;
            },
            responseError: function(error) {
                if (error.status === 401 || error.status === 403) {
                    localStorage.removeItem("token");
                    $rootScope.isAuth = false;
                    $rootScope.toastr.error(error.data);
                    $location.path('/login');
                }
                return $q.reject(error);
            }
        };
    }
})();

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('Interceptor');     
}]);
// criando o módulo do angular
var app = angular.module('SocialTorrentApp', ['ngRoute', 'ngSanitize', 'ngAnimate', 'toastr']);

// configurando as rotas da aplicação
app.config(function ($routeProvider, toastrConfig, $sceProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'template/inicio.html',
            controller: 'InicioCtrl'
        })
        .when('/login', {
            templateUrl: 'template/login.html',
            controller: 'LoginCtrl'
        })
        .when('/cadastro', {
            templateUrl: 'template/cadastro.html',
            controller: 'CadastroCtrl'
        })
        .when('/comentarios/:id/:titulo', {
            templateUrl: 'template/comentarios.html',
            controller: 'ComentarioCtrl'
        })
        .when('/meu-magnet', {
            templateUrl: 'template/meu-magnet.html',
            controller: 'MeuMagnetCtrl'
        })
        .otherwise({
            templateUrl: 'template/nao-encontrado.html'
        });

    // configuração para o tostr
    angular.extend(toastrConfig, {
        autoDismiss: true,
        containerId: 'toast-container',
        maxOpened: 10,
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
        preventDuplicates: false,
        preventOpenDuplicates: true,
        target: 'body'
    });
}).run(function ($rootScope, $location) {
    // fica escultando as mudanças de rota
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if (!localStorage.getItem("token")) {
            // verificando próximo template a ser carregado.
            if (next.templateUrl != "template/login.html" && next.templateUrl != "template/cadastro.html") {
                $location.path("/login");
            }
        } else {
            $rootScope.isAuth = true;
        }
    });
});

app.controller('PrincipalCtrl', function ($scope, $location, $rootScope, toastr) {
    $rootScope.toastr = toastr;

    $scope.logout = function () {
        if (confirm('Deseja realmente sair do sistema?')) {
            localStorage.removeItem('token');
            $rootScope.isAuth = false;
            $location.path('/login');
        }
    };
});
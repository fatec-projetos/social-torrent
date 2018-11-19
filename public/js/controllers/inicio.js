// criando controller para login
app.controller('InicioCtrl', function ($scope, $http, $sce) {
    $scope.magnets = [];
    
    $scope.init = function() {
        $http.get('api/magnet/' + ($scope.term ? $scope.term : 'all')).then(function(res) {
            for(let i = 0; i < res.data.length; i++) {
                res.data[i].link_magnetico = $sce.trustAs($sce.URL, res.data[i].link_magnetico);
            }
            $scope.magnets = res.data.reverse();
        }).catch(function (err) {});
    };

    $scope.filtrarPorUsuario = function(nome) {
        $scope.q = nome;
        window.scrollTo(0, 0);
    }
});
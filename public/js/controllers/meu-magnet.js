app.controller('MeuMagnetCtrl', function ($scope, $http, $sce, toastr) {
    $scope.form = {};
    $scope.list = [];
    $scope.init = function () {
        $scope.form = {};
        $http.get('api/magnet-user').then(function(res) {
            for(let i = 0; i < res.data.length; i++) {
                res.data[i].link_magnetico = $sce.trustAs($sce.URL, res.data[i].link_magnetico);
            }
            $scope.list = res.data.reverse();
        }).catch(function (err) {});
    };

    $scope.editar = function (magnet) {
        $scope.form = magnet;
    };

    $scope.salvar = function () {
        var caller = $http.post;
        if($scope.form.id) {
            caller = $http.put;
        }

        caller('api/magnet', $scope.form).then(function(res) {
            $scope.init();
            toastr.success(res.data);            
        }).catch(function (err) {});
    };

    $scope.deletar = function (id) {
        if(confirm('Deseja realmente remover esse conteúdo?')) {
            $http.delete('api/magnet/' + id).then(function(res) {
                $scope.init();
                toastr.success(res.data);
            }).catch(function (err) {});
        }
    }
});

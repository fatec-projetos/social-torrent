app.controller('CadastroCtrl', function ($scope, toastr, $http, $location) {
    $scope.novoMembro = {};
    $scope.cadastraUsuario = function () {
        if(!$scope.novoMembro.nome || !$scope.novoMembro.nomedeusuario || !$scope.novoMembro.senha || !$scope.novoMembro.resenha) {
            toastr.warning('Preencha todos os dados para prosseguir.');
            return;
        } else if($scope.novoMembro.senha != $scope.novoMembro.resenha) {
            toastr.warning('As senhas não coincidem.');
            return;
        }

        $http.post('api/cadastrar', $scope.novoMembro).then(function(res) {
            toastr.info(res.data);
            $location.path('/login');
        }).catch(function (error) {
            toastr.error(error.data);
        });
    };
});
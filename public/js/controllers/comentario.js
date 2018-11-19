app.controller('ComentarioCtrl', function ($scope, $http, $routeParams, toastr) {
    $scope.comentarios = [];
    $scope.novoComentario = {};
    $scope.idUsuario = 0;
    $scope.init = function () {
        $scope.idUsuario = JSON.parse(atob(localStorage.getItem("token").split(".")[1])).id;
        $scope.titulo = $routeParams.titulo;
        $scope.novoComentario = {};
        $scope.novoComentario['id_link-magnetico'] = $routeParams.id;

        $http.get('api/comentario/' + $routeParams.id).then(function(res) {
            for(let i = 0; i < res.data.length; i++) {
                res.data[i].estrelas = $scope.getArray(res.data[i].estrelas);
                res.data[i].estrelasRestante = $scope.getArray(5 - res.data[i].estrelas);
            }
            $scope.comentarios = res.data.reverse();
        }).catch(function (e) {});
    };

    $scope.toggleComentario = function () {
        $scope.novoComentario = {};
        $scope.novoComentario['id_link-magnetico'] = $routeParams.id;
        $scope.showComentarioBox = !$scope.showComentarioBox
    };

    $scope.salvarComentario = function () {
        if(!$scope.novoComentario.comentario) {
            return toastr.warning('É necessário escrever sua opnião para prosseguir.');
        }
        if($scope.novoComentario.estrelas < 1 || $scope.novoComentario.estrelas > 5) {
            return toastr.warning('Sua nota deve estar entre 1 e 5.');
        }

        $http.post('api/comentario', $scope.novoComentario).then(function(res) {
            toastr.success(res.data);
            $scope.toggleComentario();
            $scope.init();
        }).catch(function(e) {});
    };

    $scope.apagar = function (id) {
        if(confirm('Deseja realmente apagar seu comentário?')) {
            $http.delete('api/comentario/'+id, $scope.novoComentario).then(function(res) {
                toastr.success(res.data);
                $scope.toggleComentario();
                $scope.init();
            }).catch(function(e) {});
        }
    };

    $scope.getArray = function (estrelas) {
        let a = [];
        for(let i = 0; i < estrelas; i++) {
            a.push({});
        }
        return a;
    };
});
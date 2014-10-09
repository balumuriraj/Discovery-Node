'use strict';

/**
 * @ngdoc function
 * @name discoveryApp.controller:AdminCtrl
 * @description
 * # AdminCtrl
 * Controller of the discoveryApp
 */

app.controller('AdminCtrl', ['$scope', '$location', 'labsFactory',
    function ($scope, $location, labsFactory) {

        function init() {
            labsFactory.getAllLabs()
                .success(function (responsedata) {
                    $scope.labs = responsedata;
                })
                .error(function (data) {
                    $scope.servicerror = true;
                });
        };

        init();

        $scope.createlab = function(){
            $location.path('/admin/lab/create');
        }

        $scope.editlab = function(id){
            $location.path('/admin/lab/'+id);
        }

        $scope.deletelab = function(lab){
            labsFactory.deleteLab(lab)
                .success(function(responsedata){

                    init();

                    var block = $('#successmsg');
                    block.css({
                        'visibility': 'visible',
                        'opacity': '1'
                    });

                    setTimeout(function(){
                        block.css({
                            'visibility': 'hidden',
                            'opacity': '0'
                        });
                    }, 5000);
                })
                .error(function(data) {
                    init();

                    var block = $('#failuremsg');
                    block.css({
                        'visibility': 'visible',
                        'opacity': '1'
                    });

                    setTimeout(function(){
                        block.css({
                            'visibility': 'hidden',
                            'opacity': '0'
                        });
                    }, 5000);
                });
        }
}]);

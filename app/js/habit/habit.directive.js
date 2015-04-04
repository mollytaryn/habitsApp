angular
  .module('habitracker')
  .directive('editInPlace', editInPlace);

function editInPlace() {
  return {
        restrict: 'E',
        scope: {
            value: '='
        },
        controller: 'HabitController',
        template: '<span ng-click="edit()" ng-bind="value"></span><input ng-model="value"></input>',
        link: function ($scope, element, attrs, habitFactory) {
            var inputElement = angular.element(element.children()[1]);
            element.addClass('edit-in-place');
            $scope.editing = false;

            $scope.edit = function() {
              $scope.editing = true;
              element.addClass('active');
              inputElement[0].focus();
              habitFactory.edit(this.description, function(res) {
                console.log('edit');
              });
            };

            inputElement.prop('onblur', function () {
              $scope.editing = false;
              element.removeClass('active');
              // habitFactory.edit(this.description, function(res) {
              //   console.log('edit');
              // });
            });
        }
    };
}

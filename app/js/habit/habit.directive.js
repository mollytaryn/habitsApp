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
        template: '<span ng-click="edit(id)" ng-bind="value"></span><input ng-model="value"></input>',
        link: function ($scope, element, attrs, habitFactory) {

            var inputElement = angular.element(element.children()[1]);
            element.addClass('edit-in-place');
            $scope.editing = false;

            $scope.edit = function() {
              $scope.editing = true;
              element.addClass('active');
              inputElement[0].focus();
            };

            inputElement.prop('onblur', function(id) {
              $scope.editing = false;
              element.removeClass('active');
              debugger;
              habitFactory.editMore(id);
            });
        }
    };
}

;(function(){
'use strict';

  // People controller
  angular
    .module('people')
    .controller('PeopleDetailController', PeopleDetailController);

  /* @inject */
  function PeopleDetailController(resolvedDetail, $scope, $stateParams, $state, People, logger) {

    $scope.remove = remove;
    $scope.update = update;
    $scope.person = resolvedDetail;

    //////////////////////

    // Remove existing Person
    function remove(person) {
      var person = person || $scope.person;
      People.destroy(person._id)
        .then( function(){
          angular.forEach($scope.people, function(item, i) {
            if (item === person) {
              $scope.people.splice(i, 1);
            }
          });
          $state.go('listPeople');
        });

    }

    // Update existing Person
    function update() {
      var person = $scope.person;
      People.update(person._id, person)
        .then( function ( data ){
          logger.logSuccess('Person Updated');
          $state.go('viewPerson', {personId: person._id});
        })
        .catch( function (error){
          logger.logError('Error Updating Person');
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);
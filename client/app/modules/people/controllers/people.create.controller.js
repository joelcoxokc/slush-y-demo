;(function(){
'use strict';

  // People controller
  angular
    .module('people')
    .controller('PeopleCreateController', PeopleCreateController);

  /* @inject */
  function PeopleCreateController($scope, $state, People, logger) {

    $scope.create = create;

    //////////////////////

    // Create new Person
    function create() {
      People.create({name:this.name})
        .then( function (response){
          logger.logSuccess('Person Saved!!')
          // Redirect after save
          $state.go('viewPerson', {personId: response.data._id});

        })
        .catch( function (error){
          logger.logError('Person not saved')
          $scope.error = error.data.message;
        })
      // Clear form fields
      this.name = '';
    }


  }
}).call(this);
;(function(){
'use strict';

  // People controller
  angular
    .module('people')
    .controller('PeopleController', PeopleController);

  /* @inject */
  function PeopleController(resolvedList, $scope, $stateParams, $state, People, logger) {

    $scope.find = find;
    $scope.findOne = findOne;
    $scope.people = resolvedList;


    //////////////////////

    // Find a list of People
    function find() {
      People.all()
        .then( function ( response ){
          $scope.people = response.data;
        })
    }

    // Find existing Person
    function findOne() {
      People.one($stateParams.personId)
        .then( function ( response ){
          $scope.person = response.data[0];
        });
    }
  }
}).call(this);
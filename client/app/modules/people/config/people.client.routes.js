;(function(){
'use strict';

  //Setting up route
  angular
    .module('people')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // People state routing

    /*changed state names*/
    $stateProvider
      .state('people', {
        url: '/people',
        templateUrl: 'app/modules/people/views/people.view.html',
        controller: 'PeopleController',
        resolve: {
          resolvedList: resolvedPerson
        }
      })
      .state('people.create', {
        url: '/create',
        templateUrl: 'app/modules/people/views/create-person.client.view.html',
        controller: 'PeopleCreateController'
      })
      .state('people.detail', {
        url: '/:personId',
        templateUrl: 'app/modules/people/views/view-person.client.view.html',
        controller: 'PeopleDetailController',
        resolve: {
          resolvedDetail: resolvedPeople
        }
      })
      .state('people.edit', {
        url: '/:personId/edit',
        templateUrl: 'app/modules/people/views/edit-person.client.view.html',
        controller: 'PeopleUpdateController',
        resolve: {
          resolvedDetail: resolvedPeople
        }
      });

    ////////////////
    /*changed name*/
    function resolvedPerson($stateParams, People){
      return People.one($stateParams.personId)
        .then( function ( response ){
          return response.data;
        })
    }

    function resolvedPeople(People){
      return People.all()
        .then( function ( response ){
          return response.data;
        })
    }
  }
}).call(this);
;(function(){
'use strict';

  //Setting up route
  angular
    .module('people')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // People state routing
    $stateProvider
      .state('listPeople', {
        url: '/people',
        templateUrl: 'app/modules/people/views/list-people.client.view.html',
        controller: 'PeopleController',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('createPerson', {
        url: '/people/create',
        templateUrl: 'app/modules/people/views/create-person.client.view.html',
        controller: 'PeopleCreateController'
      })
      .state('viewPerson', {
        url: '/people/:personId',
        templateUrl: 'app/modules/people/views/view-person.client.view.html',
        controller: 'PeopleDetailController',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('editPerson', {
        url: '/people/:personId/edit',
        templateUrl: 'app/modules/people/views/edit-person.client.view.html',
        controller: 'PeopleDetailController',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      });

    ////////////////
    function resolvedDetail($stateParams, People){
      return People.one($stateParams.personId)
        .then( function ( response ){
          return response.data;
        })
    }
    function resolvedList(People){
      return People.all()
        .then( function ( response ){
          return response.data;
        })
    }
  }
}).call(this);
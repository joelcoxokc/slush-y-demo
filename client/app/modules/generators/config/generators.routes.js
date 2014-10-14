;(function(){
'use strict';

  //Setting up route
  angular
    .module('generators')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Generators state routing
    $stateProvider
      .state('listGenerators', {
        url: '/generators',
        templateUrl: 'app/modules/generators/views/list-generators.view.html',
        controller: 'GeneratorsController as vm',
        resolve: {
          resolvedList: resolvedList
        }
      })

      .state('listGenerators.detail', {
        url: '/:generatorId',
        templateUrl: 'app/modules/generators/views/view-generator.view.html',
        controller: 'GeneratorsDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })


    ////////////////
    function resolvedDetail($stateParams, Generators){
      return Generators.one($stateParams.generatorId).get()
        .then( function ( response ){
          return response;
        })
    }
    function resolvedList(Generators){
      return Generators.getList()
        .then( function ( response ){
          return response;
        })
    }
  }
}).call(this);
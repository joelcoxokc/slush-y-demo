;(function(){
'use strict';

  //Setting up route
  angular
    .module('articles')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Articles state routing
    $stateProvider
      .state('articles', {
        url: '/articles',
        templateUrl: 'app/modules/articles/views/articles.view.html',
        controller: 'ArticlesController',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('articles.create', {
        url: '/create',
        templateUrl: 'app/modules/articles/views/create-article.client.view.html',
        controller: 'ArticlesCreateController'
      })
      .state('articles.detail', {
        url: '/:articleId',
        templateUrl: 'app/modules/articles/views/view-article.client.view.html',
        controller: 'ArticlesDetailController',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('articles.edit', {
        url: '/:articleId/edit',
        templateUrl: 'app/modules/articles/views/edit-article.client.view.html',
        controller: 'ArticlesDetailController',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      });

    ////////////////
    function resolvedDetail($stateParams, Articles){
      return Articles.one($stateParams.articleId)
        .then( function ( response ){
          return response.data;
        })
    }
    function resolvedList(Articles){
      return Articles.all()
        .then( function ( response ){
          return response.data;
        })
    }
  }
}).call(this);
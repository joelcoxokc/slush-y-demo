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
        controller: 'ArticlesController as vm',
        resolve: {
          resolvedList: resolvedList
        }
      })
      .state('articles-create', {
        url: '/articles/create',
        templateUrl: 'app/modules/articles/views/articles.create.view.html',
        controller: 'ArticlesCreateController as vm'
      })
      .state('article-detail', {
        url: '/articles/:articleId',
        templateUrl: 'app/modules/articles/views/article.detail.view.html',
        controller: 'ArticlesDetailController as vm',
        resolve: {
          resolvedDetail: resolvedDetail
        }
      })
      .state('article-edit', {
        url: '/articles/:articleId/edit',
        templateUrl: 'app/modules/articles/views/article.edit.view.html',
        controller: 'ArticlesDetailController as vm',
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
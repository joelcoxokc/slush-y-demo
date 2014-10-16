;(function(){
'use strict';

  // Articles controller
  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  /* @inject */
  function ArticlesController(resolvedList, $scope, $stateParams, $state, Articles, logger) {

    $scope.articles = resolvedList;
    $scope.showArticle = showArticle;
    $scope.isActive = isActive;
    $scope.shown = {};
    //////////////////////
    console.log($state)
    // Find a list of Articles
    function isActive(state) {
      // console.log(state === $state.params.articleId)
      return $state.includes('articles', {articleId: state});
    }


    function showArticle(article){
      console.log(article)
        if(article._id === $scope.shown._id){
          $state.go('articles');
          $scope.showDetail = false;
          $scope.shown = {};
        } else {
          $state.go('articles.detail', {articleId: article._id});
          $scope.shown = article;
          $scope.showDetail = true;
        }
    }
  }
}).call(this);
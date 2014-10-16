;(function(){
'use strict';

  // Articles controller
  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  /* @inject */
  function ArticlesController(resolvedList, $scope, $stateParams, $state, Articles, logger) {

    $scope.find = find;
    $scope.findOne = findOne;
    $scope.articles = resolvedList;

    $scope.isActive = isActive;

    //////////////////////
    console.log($state)
    // Find a list of Articles
    function isActive(state) {
      // console.log(state === $state.params.articleId)
      return $state.includes('articles', {articleId: state});
    }

    // Find existing Article
    function findOne() {
      Articles.one($stateParams.articleId)
        .then( function ( response ){
          $scope.article = response.data[0];
        });
    }
  }
}).call(this);
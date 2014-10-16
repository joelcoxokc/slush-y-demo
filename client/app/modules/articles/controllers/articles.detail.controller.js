;(function(){
'use strict';

  // Articles controller
  angular
    .module('articles')
    .controller('ArticlesDetailController', ArticlesDetailController);

  /* @inject */
  function ArticlesDetailController(resolvedDetail, $scope, $stateParams, $state, Articles, logger) {

    $scope.remove = remove;
    $scope.update = update;
    $scope.article = resolvedDetail;

    //////////////////////

    // Remove existing Article
    function remove(article) {
      var article = article || $scope.article;
      Articles.destroy(article._id)
        .then( function(){
          angular.forEach($scope.articles, function(item, i) {
            if (item === article) {
              $scope.articles.splice(i, 1);
            }
          });
          $state.go('listArticles');
        });

    }

    // Update existing Article
    function update() {
      var article = $scope.article;
      Articles.update(article._id, article)
        .then( function ( data ){
          logger.logSuccess('Article Updated');
          $state.go('viewArticle', {articleId: article._id});
        })
        .catch( function (error){
          logger.logError('Error Updating Article');
          $scope.error = error.data.message;

        });
    }
  }
}).call(this);
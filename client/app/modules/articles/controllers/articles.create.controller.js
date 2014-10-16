;(function(){
'use strict';

  // Articles controller
  angular
    .module('articles')
    .controller('ArticlesCreateController', ArticlesCreateController);

  /* @inject */
  function ArticlesCreateController($scope, $state, Articles, logger) {

    $scope.create = create;

    //////////////////////

    // Create new Article
    function create() {
      Articles.create({name:this.name})
        .then( function (response){
          logger.logSuccess('Article Saved!!')
          // Redirect after save
          $state.go('viewArticle', {articleId: response.data._id});

        })
        .catch( function (error){
          logger.logError('Article not saved')
          $scope.error = error.data.message;
        })
      // Clear form fields
      this.name = '';
    }


  }
}).call(this);
;(function(){
'use strict';

  // Articles controller
  angular
    .module('articles')
    .controller('ArticlesDetailController', ArticlesDetailController);

  /* @inject */
  function ArticlesDetailController(resolvedDetail, $scope, $stateParams, $state, Articles, logger) {
    var vm = this;
    vm.remove = remove;
    vm.update = update;
    vm.article = resolvedDetail;

    //////////////////////



    // Remove existing Article
    function remove(article) {
      var article = article || vm.article;
      Articles.destroy(article._id)
        .then( function(){
          $state.go('articles');
        });
    }

    // Update existing Article
    function update() {
      var article = vm.article;
      Articles.update(article._id, article)
        .then( function ( data ){
          $state.go('article-detail', {articleId: article._id});
        })
        .catch( function (error){
          vm.error = error.data.message;
        });
    }
  }
}).call(this);
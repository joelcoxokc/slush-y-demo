;(function(){
'use strict';

  // Articles controller
  angular
    .module('articles')
    .controller('ArticlesCreateController', ArticlesCreateController);

  /* @inject */
  function ArticlesCreateController($scope, $state, Articles, logger) {
    var vm = this;
    vm.create = create;

    $scope.$emit('child:opened');

    //////////////////////

    // Create new Article
    function create() {
      Articles.create(vm.newArticle)
        .then( function (response){
          // Redirect after save
          $state.go('article-detail', {articleId: response.data._id});
        })
        .catch( function (error){
          vm.error = error.data.message;
        })
    }

  }
}).call(this);
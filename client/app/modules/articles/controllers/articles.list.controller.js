;(function(){
'use strict';

  // Articles controller
  angular
    .module('articles')
    .controller('ArticlesController', ArticlesController);

  /* @inject */
  function ArticlesController(resolvedList, $scope, $stateParams, $state, Articles, logger, socket) {

    var vm = this;
    vm.articles = resolvedList;
    vm.showArticle = showArticle;
    vm.isActive = isActive;
    vm.shown = {};

    socket.syncUpdates('articles', vm.articles);
    //////////////////////


    function isActive(state) {
      // console.log(state === $state.params.articleId)
      return $state.includes('articles', {articleId: state});
    }

    function showArticle(article){
        if(article._id === vm.shown._id){
          $state.go('articles');
          vm.showDetail = false;
          vm.shown = {};
        } else {
          $state.go('articles.detail', {articleId: article._id});
          vm.shown = article;
          // vm.showDetail = true;
        }
    }

    /*
        Event emitted from child states.
     */
    $scope.$on('child:closed', function ( event ){
      vm.shown = {};
      vm.showDetail = false;
    });
    $scope.$on('child:opened', function ( event ){
      vm.shown = {};
      vm.showDetail = true;
    });
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('articles');
    });
  }
}).call(this);
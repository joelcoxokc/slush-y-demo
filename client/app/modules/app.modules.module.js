;(function(){
'use strict';
  angular
    .module('app.modules', [
      'authentication',
      'administration',
      'generators',
      'people',
      'articles'
    ]);

}).call(this);
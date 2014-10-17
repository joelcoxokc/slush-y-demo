;(function(){
'use strict';
  angular
    .module('core')
    .controller('Contrl', Contrl)
    .factory('$storage', Storage);


  function Storage(server, s1, s2, s3){
    var instance = {
      search: search,
    };

    return instance;

    /////////////////////////

    function search(username){
      var q1 = $q.defer();
      var q2 = $q.defer();

      return firbase
        .$loading(username)
        .then(function (data){
          data.num = 1;
          return StatsPromised.resolve(data);
        })
        .then(function (data){
          data.num ++;
          return StubsPomise.resolve(data);
        })
        .then(function (data){
          data.num ++;
          return StubsPomise.resolve(data);
        })
        .then(function (data){

          return StubsPomise.resolve(data);
        })

    }

    function setServices(value){
      s1.set(value)
      s2.set(value)
      s3.set(value)
    }
  }

  function s1($scope){

    this.data = {}

    this.set = function(value){
      this.data = value;
      $scope.$emit('newData');

    }
    this.get = function(parms){
      return this.data;
    }
  }


}).call(this);
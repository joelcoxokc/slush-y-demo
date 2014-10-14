;(function(){
  'use strict';
  //Setting up route
  angular
    .module('administration')
    .config( Configuration );

  /* @inject */
  function Configuration($stateProvider) {
    // Administration state routing
    $stateProvider
      .state('admin', {
        url: '/admin',
        templateUrl: 'app/modules/Administration/views/admin.view.html',
        abstract:true,
      })
      .state('admin.profile', {
        url: '/profile',
        templateUrl: 'app/modules/Administration/views/profile/profile.view.html',
        controller: 'ProfileController as vm',
        authenticate:true,
        resolve: {
          Resolved: Resolved
        }
      })
      .state('admin.profile-edit', {
        url: '/profile-edit',
        templateUrl: 'app/modules/Administration/views/profile/edit-profile.view.html',
        controller: 'ProfileController as vm',
        authenticate:true,
        resolve: {
          Resolved: Resolved
        }
      })
      .state('admin.settings', {
        url: '/settings',
        templateUrl: 'app/modules/Administration/views/settings/change-password.view.html',
        controller: 'SettingsController as vm',
        authenticate:true,
        resolve: {
          Resolved: Resolved
        }
      })
      .state('admin.accounts-list', {
        url: '/accounts',
        templateUrl: 'app/modules/Administration/views/accounts/accounts.list.view.html',
        controller: 'AccountsController as vm',
        authenticate:true,
        resolve: {
          resolvedAccounts: resolvedUsers
        }
      })
      .state('admin.account-detail', {
        url: '/accounts/:id',
        templateUrl: 'app/modules/Administration/views/accounts/account.detail.view.html',
        controller: 'AccountDetailController as vm',
        authenticate:true,
        resolve: {
          ResolvedAccount: ResolvedAccount
        }
      })
      .state('admin.account-edit', {
        url: '/accounts/:id/edit',
        templateUrl: 'app/modules/Administration/views/accounts/account.edit.view.html',
        controller: 'AccountDetailController as vm',
        authenticate:true,
        resolve: {
          ResolvedAccount: ResolvedAccount
        }
      })


    ////////////////////


    /* @inject */
    function resolvedUsers(User){
      return User.all()
        .then( function ( response ){
          return response.data;
        });
    }

    /* @inject */
    function Resolved(User, $storage){
      return User.getMe()
        .then(function ( response ){
          return response.data;
        });
    }

    /* @inject */
    function ResolvedAccount(User, $stateParams){
      return User.one($stateParams.id)
        .then(function ( response ){
          return response.data;
        });
    }

  }

}).call(this);
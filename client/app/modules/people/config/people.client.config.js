;(function(){
'use strict';


  // Configuring the Articles module
  angular
    .module('people')
    .run( Run );

  /* @inject */
  function Run(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'People', 'people');
    Menus.addMenuItem('topbar', 'New Person', 'people/create');
  }

}).call(this);
'use strict';

angular.module('splytApp')
  .controller('SearchPageCtrl', function ($scope, search, manage, Auth, $modalInstance, $window) {
    $scope.SCResults;
    $scope.YTResults;
    $scope.playlist_tabs = [];
    $scope.youtube = false;
    $scope.soundcloud = false;
    $scope.progress = false;
    $scope.media_width = $window.innerWidth;

    var playlistPromise = manage.getPlaylists();
    playlistPromise.success(function(playlists) {
      $scope.playlists = [];
      for (var i = 0; i < playlists.length; i++) {
        if (i !== 1 && i !== 2) {
          $scope.playlist_tabs.push(playlists[i]);
        }
      }
    });

      $scope.$watch(function(){
         return $window.innerWidth;
      }, function(value) {
         $scope.media_width = value;
   });

    $scope.chooseYT = function(){
      $scope.soundcloud = false;
      $scope.youtube = true;
    }

    $scope.chooseSC = function(){
      $scope.youtube = false;
      $scope.soundcloud = true;
    }

      //search bar stuff.
  $scope.searchSC = function(query) {
    $scope.progress = true;
    $scope.YTResults = null;
    search.searchSC(query, function(data) {
      $scope.SCResults = data;
      $scope.search.SCquery= "";
      $scope.$apply();
      $scope.progress = false;
    });
  }

  $scope.searchYT = function(query) {
    $scope.progress = true;
    $scope.SCResults = null;
    search.searchYT(query, function(data) {
      $scope.YTResults = data.items;
      $scope.search.YTquery= "";
      $scope.progress = true;
    });
  }

  $scope.addYTSong = function(playlist, song) {
    console.log('adding song');
    search.addYT(song, playlist, function(data) {
    });
  }

  $scope.addSCSong = function(playlist, song) {
    search.addSC(song, playlist, function(data) {
    });
  }

  $scope.ok = function () {
    $modalInstance.close();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});

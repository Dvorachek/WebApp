var app = angular.module('uploadApp', []);

app.controller('uploadController', function($scope) {
    $scope.firstName= "John";

    let port = PortIdService.port
    let url = `https://info3103.cs.unb.ca:${port}/songs`
    $scope.goodToUpload = false;

    $(document).on('change', ':file', function() {
      var input = $(this),
          numFiles = input.get(0).files ? input.get(0).files.length : 1,
          label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
  });

    $(document).ready( function() {
        $(':file').on('fileselect', function(event, numFiles, label) {
            console.log(numFiles);
            console.log(label);
            $scope.fileName = label
            $scope.$apply()
            console.log($scope.fileName)
        });
    });

    // upload on file select or drop
    $scope.upload = function (file) {

        var albumId = parseInt($scope.choice.album)
        var artistId = parseInt($scope.choice.artist)

        console.log($scope.newAlbumModel)
        console.log($scope.newAlbumModel)
        if ($scope.newAlbumModel != undefined)
            albumId = undefined
        if ($scope.newArtistModel != undefined)
            artistId = undefined

        Upload.upload({
            url: url,
            data: {file: file,
                    'title': $scope.songName,
                    "length": 200,
                    "genre": $scope.songGenre,
                    "albumId": albumId,
                    "artistId": artistId,
                    "newArtist": $scope.newArtistModel,
                    "newAlbum" : $scope.newAlbumModel}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            $scope.uploadingSong = false
            $scope.fileUploaded = true
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            $scope.uploadingSong = true
            $scope.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + $scope.progressPercentage + '% ' + evt.config.data.file.name);
        });
    };

});

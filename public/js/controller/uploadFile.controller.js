// myApp.controller('myCtrl', ['$scope', 'fileUpload', function($scope, fileUpload) {
//     $scope.uploadFile = function() {
//         var file = $scope.myFile;

//         console.log('file is ');
//         console.dir(file);

//         var uploadUrl = "/fileUpload";
//         fileUpload.uploadFileToUrl(file, uploadUrl);
//     };
// }]);

myapp.controller('MainCtrl', function($scope) {
    $scope.showContent = function($fileContent) {
        $scope.content = $fileContent.split(",");

        var elevatorData = $scope.content[0].split("\n")
        var md = elevatorData.pop()

        
 
        $scope.content.shift()
        $scope.content.push(md)
    

        $scope.answer = elevator(elevatorData[0], elevatorData[1],elevatorData[2], $scope.content)

       function elevator(elevators, floors, capacity, people) {
          const newArray = people.sort((a, b) => a - b);
          let totalTime = 0;
          let log = "";
          do {
            totalTime += getTime(newArray)
            log += (`Time per elevator trip: ${totalTime} sec\n`)
          }
          while (newArray.length)

          function getTime(newArray) {
            let time = 0;
            let check;
            let uniqueArray;
            check = newArray.splice(0, capacity)
            uniqueArray = check.filter((item, pos) => check.indexOf(item) == pos)

            time += Math.max(...uniqueArray) * 2 + Math.max(...uniqueArray)
            return time;
          }
          const secs = totalTime / elevators;

          function secondsToTime(secs) {
            secs = Math.round(secs);
            const hours = Math.floor(secs / (60 * 60));

            const divisor_for_minutes = secs % (60 * 60);
            const minutes = Math.floor(divisor_for_minutes / 60);

            const divisor_for_seconds = divisor_for_minutes % 60;
            const seconds = Math.ceil(divisor_for_seconds);
            return `Total Time : ${hours}:${minutes}:${seconds}\n`;
          }
          return ([secondsToTime(secs), log])
        }
    };
    $scope.save = function(answer) {
        var blob = new Blob([$scope.answer], {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "output.txt");
    };

});

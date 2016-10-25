<div ng-controller="MainCtrl" class="container">
  <h1>Select text file</h1>
  <input type="file" on-read-file="showContent($fileContent)" />
  <div ng-if="content">
    <h2>File content is:</h2>
    <pre>{{answer[0] }}</pre>
<pre>{{ answer[1] }} </pre>
    <button ng-click="save(answer)">Save file</button>
  </div>
</div>


var myapp = angular.module('myapp', []);

myapp.controller('MainCtrl', function($scope) {
  $scope.showContent = function($fileContent) {
    $scope.content = $fileContent.split("\n");
    $scope.floors = $scope.content[3].split(",")
    $scope.answer = elevator($scope.content[0], $scope.content[1], $scope.content[2], $scope.floors)

    function elevator(elevators, floors, capacity, people) {
      const newArray = people.sort((a, b) => a - b);
      let totalTime = 0;
		let log = "";
      do {
        totalTime += getTime(newArray)
        log += (`Time per elevator trip in seconds: ${totalTime} sec\n`)
      }
      while (newArray.length)
console.log(log)
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
$scope.save = function(answer){
 var blob = new Blob([$scope.answer], {type: "text/plain;charset=utf-8"});
  saveAs(blob, "output.txt");
};

});

myapp.directive('onReadFile', function($parse) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
      var fn = $parse(attrs.onReadFile);

      element.on('change', function(onChangeEvent) {
        var reader = new FileReader();

        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {
              $fileContent: onLoadEvent.target.result
            });
          });
        };

        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
});

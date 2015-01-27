var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
	$scope.filterBacklog = {
		sprint: "backlog"
	};
	$scope.filterCompleted = {
		sprint: "complete"
	};
	
	function getURLParameter(sParam) {
		var sPageURL = window.location.search.substring(1);
		var sURLVariables = sPageURL.split('&');
		for (var i = 0; i < sURLVariables.length; i++) {
			var sParameterName = sURLVariables[i].split('=');
			if (sParameterName[0] == sParam) {
				return sParameterName[1];
			}
		}
	}
	
	function resetNewTaskForm() {
		$scope.itemSection = "";
		$scope.itemDetails = "";
		$scope.itemAssignee = "";
		$scope.itemSprint = "backlog";
		$scope.itemColor = "blue";
	}
	
	resetNewTaskForm();
	
	var teamID = getURLParameter('team');
	
	$http.get('../data/teams/' + teamID).success(function(data) {
		$scope.team = data;
	});
	
	$scope.addModalClosed = function() {
		// Add new team to MongoDB database.
		
		var textColor = "black";
		if (($scope.itemColor == "blue") || ($scope.itemColor == "red") || ($scope.itemColor == "purple")) {
			textColor = "white";
		}
		
		if (($scope.itemSection != "") && ($scope.itemDetails != "") && ($scope.itemAssignee != "")) {
			var Task = {
				section: $scope.itemSection,
				details: $scope.itemDetails,
				assignee: $scope.itemAssignee,
				sprint: $scope.itemSprint,
				color: $scope.itemColor,
				textColor: textColor
			};
		
			$http.post('../data/teams/' + teamID + '/tasks', Task).
			success(function(data, status, headers, config) {
				$('#new-item-modal').modal('hide');
				resetNewTaskForm();
		
				$http.get('../data/teams/' + teamID).success(function(data) {
					$scope.team = data;
				});
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
	};
}]);
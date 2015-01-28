var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
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
		$scope.itemId = "";
		$scope.itemSection = "";
		$scope.itemDetails = "";
		$scope.itemAssignee = "";
		$scope.itemSprint = "backlog";
		$scope.itemColor = "blue";
	}
	
	resetNewTaskForm();
	
	var teamID = $("#teamID").val();
	
	$http.get('../data/teams/' + teamID).success(function(data) {
		$scope.team = data;
	});
	
	$scope.addModalClosed = function() {
		// Add new team to MongoDB database.
		
		var textColor = "black";
		if (($scope.itemColor == "blue") || ($scope.itemColor == "red") || ($scope.itemColor == "purple") || ($scope.itemColor == "green")) {
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
	
	$scope.editModalClosed = function() {
		// Edit existing task.
		
		var textColor = "black";
		if (($scope.itemColor == "blue") || ($scope.itemColor == "red") || ($scope.itemColor == "purple") || ($scope.itemColor == "green")) {
			textColor = "white";
		}
		
		if (($scope.itemSection != "") && ($scope.itemDetails != "") && ($scope.itemAssignee != "")) {
			var Task = {
				id: $scope.itemId,
				section: $scope.itemSection,
				details: $scope.itemDetails,
				assignee: $scope.itemAssignee,
				sprint: $scope.itemSprint,
				color: $scope.itemColor,
				textColor: textColor
			};
		
			$http.put('../data/teams/' + teamID + '/tasks/' + $scope.itemId, Task).
			success(function(data, status, headers, config) {
				$('#edit-item-modal').modal('hide');
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
	
	$scope.taskDeleted = function() {
		// Delete existing task.
		
		$http.delete('../data/teams/' + teamID + '/tasks/' + $scope.itemId).
		success(function(data, status, headers, config) {
			$('#edit-item-modal').modal('hide');
			resetNewTaskForm();
	
			$http.get('../data/teams/' + teamID).success(function(data) {
				$scope.team = data;
			});
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};
	
	$scope.openEditModal = function(indexOfSelectedTask) {
		var selectedTask = $scope.team.scrumTasks[indexOfSelectedTask];
		
		$scope.itemId = selectedTask._id;
		$scope.itemSection = selectedTask.section;
		$scope.itemDetails = selectedTask.details;
		$scope.itemAssignee = selectedTask.assignee;
		$scope.itemSprint = selectedTask.sprint;
		$scope.itemColor = selectedTask.color;
		
		$('#edit-item-modal').modal('show');
	};
	
	$scope.openNewModal = function() {
		resetNewTaskForm();
		$('#new-item-modal').modal('show');
	};
	
	$scope.getNumber = function(num) {
		var ret = new Array(num);
		for (var i = 0; i < num; i++) {
			ret[i] = i+1;
		}
		return ret;
	};
	
	$scope.filterSprints = function(num) {
		var ret = {
			sprint: num
		};
		return ret;
	};
	
	$scope.getAsHTML = function(html) {
		return $sce.trustAsHtml(html);
	}
}]);
var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
	function resetTeamForm() {
		$scope.teamId = "";
		$scope.teamName = "";
		$scope.teamMembers = "";
		$scope.teamDescription = "";
		$scope.teamSecret = "";
		$scope.teamBacklog = false;
		$scope.teamCompleted = false;
		$scope.teamSprints = 3;
	}
	
	resetTeamForm();
	
	$http.get('./data').success(function(data) {
		$scope.teams = data;
	});
	
	$scope.addModalClosed = function() {
		// Add new team to MongoDB database.
		
		if (($scope.teamName != "") && ($scope.teamMembers != "") && ($scope.teamDescription != "") && ($scope.teamSecret != "")) {
			var Team = {
				name: $scope.teamName,
				members: $scope.teamMembers,
				description: $scope.teamDescription,
				secret: $scope.teamSecret,
				backlog: $scope.teamBacklog,
				completed: $scope.teamCompleted,
				sprints: $scope.teamSprints
			};
		
			$http.post('./data/teams', Team).
			success(function(data, status, headers, config) {
				$('#new-team-modal').modal('hide');
				resetTeamForm();
		
				$http.get('./data').success(function(data) {
					$scope.teams = data;
				});
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
	};
	
	$scope.editModalClosed = function() {
		// Update existing team.
		
		if (($scope.teamName != "") && ($scope.teamMembers != "") && ($scope.teamDescription != "") && ($scope.teamSecret != "")) {
			var Team = {
				id: $scope.teamId,
				name: $scope.teamName,
				members: $scope.teamMembers,
				description: $scope.teamDescription,
				secret: $scope.teamSecret,
				backlog: $scope.teamBacklog,
				completed: $scope.teamCompleted,
				sprints: $scope.teamSprints
			};
		
			$http.put('./data/teams/' + $scope.teamId, Team).
			success(function(data, status, headers, config) {
				$('#edit-team-modal').modal('hide');
				resetTeamForm();
		
				$http.get('./data').success(function(data) {
					$scope.teams = data;
				});
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
	};
	
	$scope.teamDeleted = function() {
		// Delete existing team.
		
		$http.delete('./data/teams/' + $scope.teamId).
		success(function(data, status, headers, config) {
			$('#edit-team-modal').modal('hide');
			resetTeamForm();
	
			$http.get('./data').success(function(data) {
				$scope.teams = data;
			});
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};
	
	$scope.openEditModal = function(indexOfSelectedTeam) {
		var selectedTeam = $scope.teams[indexOfSelectedTeam];
		
		$scope.teamId = selectedTeam._id;
		$scope.teamName = selectedTeam.name;
		$scope.teamMembers = selectedTeam.members;
		$scope.teamDescription = selectedTeam.description;
		$scope.teamSecret = selectedTeam.secret;
		$scope.teamBacklog = selectedTeam.backlog;
		$scope.teamCompleted = selectedTeam.completed;
		$scope.teamSprints = selectedTeam.sprints;
		
		$('#edit-team-modal').modal('show');
	};
	
	$scope.openNewModal = function() {
		resetTeamForm();
		$('#new-team-modal').modal('show');
	};
	
	$scope.openTeamBoard = function(id) {
		// Use this function to open the board and pass the selected team's id.
		window.location = "./board?team=" + id;
	};
	
	$scope.getAsHTML = function(html) {
		return $sce.trustAsHtml(html);
	}
}]);
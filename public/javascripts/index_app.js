var app = angular.module('app', ['socket.io']);
app.config(['$socketProvider', function ($socketProvider) {
	$socketProvider.setConnectionUrl('http://' + document.domain + ':3001');
	$socketProvider.setTryMultipleTransports(false);
}]);
app.controller('MainCtrl', ['$scope', '$http', '$sce', '$socket', function($scope, $http, $sce, $socket) {
	$scope.displaySecretError = { display: 'none' };
	
	function resetTeamForm() {
		$scope.teamId = "";
		$scope.teamName = "";
		$scope.teamMembers = "";
		$scope.teamDescription = "";
		$scope.teamSecret = "";
		$scope.teamOldSecret = "";
		$scope.teamNewSecret = "";
		$scope.teamBacklog = false;
		$scope.teamCompleted = false;
		$scope.teamSprints = 3;
	}
	
	function reloadAllTeams() {
		$http.get('./data').success(function(data) {
			$scope.teams = data;
		});
	}
	
	resetTeamForm();
	reloadAllTeams();
	
	$socket.on('teams.modified', function (data) {
		reloadAllTeams();
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
			}).
			error(function(data, status, headers, config) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
			});
		}
	};
	
	$scope.editModalClosed = function() {
		// Update existing team.
		
		if ($scope.teamOldSecret == $scope.teamSecret) {
			if (($scope.teamName != "") && ($scope.teamMembers != "") && ($scope.teamDescription != "")) {
				if ($scope.teamNewSecret != "") {
					$scope.teamSecret = $scope.teamNewSecret;
				}
				
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
					$scope.secretError = "";
					$scope.displaySecretError = { display: 'none' };
					resetTeamForm();
				}).
				error(function(data, status, headers, config) {
					// called asynchronously if an error occurs
					// or server returns response with an error status.
				});
			}
		}
		else {
			if ($scope.teamOldSecret == "")
				$scope.secretError = "Please enter the team secret, you can only modify team settings if you enter the correct team secret.";
			else
				$scope.secretError = "Incorrect secret, please try again!";
			$scope.displaySecretError = { display: 'block' };
		}
	};
	
	$scope.teamDeleted = function() {
		// Delete existing team.
		
		if ($scope.teamOldSecret == $scope.teamSecret) {
			$('#edit-team-modal').modal('hide');
			$('#delete-team-modal').modal('show');
		}
		else {
			if ($scope.teamOldSecret == "")
				$scope.secretError = "Please enter the team secret, you can only delete a team if you enter the correct team secret.";
			else
				$scope.secretError = "Incorrect secret, please try again!";
			$scope.displaySecretError = { display: 'block' };
		}
	};
	
	$scope.teamDeleteConfirmed = function() {
		$http.delete('./data/teams/' + $scope.teamId).
		success(function(data, status, headers, config) {
			$('#delete-team-modal').modal('hide');
			resetTeamForm();
		}).
		error(function(data, status, headers, config) {
			// called asynchronously if an error occurs
			// or server returns response with an error status.
		});
	};
	
	$scope.teamDeleteCancelled = function() {
		$('#delete-team-modal').modal('hide');
		resetTeamForm();
	};
	
	$scope.openEditModal = function(indexOfSelectedTeam) {
		var selectedTeam = $scope.teams[indexOfSelectedTeam];
		
		$scope.teamId = selectedTeam._id;
		$scope.teamName = selectedTeam.name;
		$scope.teamMembers = selectedTeam.members;
		$scope.teamDescription = selectedTeam.description;
		$scope.teamSecret = selectedTeam.secret;
		$scope.teamOldSecret = "";
		$scope.teamNewSecret = "";
		$scope.teamBacklog = selectedTeam.backlog;
		$scope.teamCompleted = selectedTeam.completed;
		$scope.teamSprints = selectedTeam.sprints;
		
		$scope.secretError = "";
		$scope.displaySecretError = { display: 'none' };
		
		$('#edit-team-modal').modal('show');
	};
	
	$scope.openNewModal = function() {
		resetTeamForm();
		$('#new-team-modal').modal('show');
	};
	
	$scope.openTeamBoard = function(id) {
		// Use this function to open the board and pass the selected team's id.
		window.location = "./boards/" + id;
	};
	
	$scope.getAsHTML = function(html) {
		return $sce.trustAsHtml(html);
	}
}]);
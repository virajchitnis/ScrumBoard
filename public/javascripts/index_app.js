var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
	function resetNewTeamForm() {
		$scope.teamName = "";
		$scope.teamMembers = "";
		$scope.teamDescription = "";
		$scope.teamSecret = "";
		$scope.teamBacklog = false;
		$scope.teamCompleted = false;
		$scope.teamSprints = 3;
	}
	
	resetNewTeamForm();
	
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
				resetNewTeamForm();
		
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
	
	$scope.openTeamBoard = function(id) {
		// Use this function to open the board and pass the selected team's id.
		window.location = "./board?team=" + id;
	};
}]);
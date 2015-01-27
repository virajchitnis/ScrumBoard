var app = angular.module('app', []);

app.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
	$http.get('./data').success(function(data) {
		$scope.teams = data;
	});
	$scope.clickNavLink = function(elementID) {
		var elementOffset = $("#" + elementID).offset().top;
		$('html, body').animate({
			scrollTop: (elementOffset - (10 + $("#contents-nav-fixed").height()))
		}, 1000);
	};
	$scope.scrollToTop = function() {
		$('html, body').animate({scrollTop: '0px'}, 1000);
	}
}]);
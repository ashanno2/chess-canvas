function PieceEditorCtrl($scope,$http) {

	$scope.canvasZoom = "1.0";
	$scope.alpha = "10";
	$scope.drawSize = "10";

	$scope.alphaChange = function(){
		$scope.a = ($scope.alpha * 10)/100;
	}

	$scope.$on("selectedColor", function(event,color){
		$scope.drawColor = color;
	});

	$scope.$on("selectedPiece", function(event,src){
		$scope.imgURL = src;
	});
}

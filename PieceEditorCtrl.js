function PieceEditorCtrl($scope,$http) {

	$scope.canvasZoom = "1.0";
	$scope.alpha = "10";
	$scope.drawSize = "10";

	$scope.alphaChange = function(){
		//alpha syntax is decimal from 0 to 1.0
		$scope.a = ($scope.alpha * 10)/100;
	}

	$scope.$on("selectedColor", function(event,color){
		$scope.drawColor = color;
	});

	$scope.$on("selectedPiece", function(event,src){
		//load url to hidden img so that canvas can read it
		$scope.imgURL = src;
	});

}

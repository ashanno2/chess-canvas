function PieceEditorCtrl($scope,$http) {

	//$scope.Math
	$scope.alpha = "100";
	$scope.drawSize = "100";
	$scope.alphaChange = function(){
		$scope.a = $scope.alpha/100;
	}

	$scope.$on("selectedColor", function(event,color){
		$scope.drawColor = color;
	});

	$scope.$on("selectedPiece", function(event,src){
		//var q = src.split("?");
		$scope.imgURL = src;
		//document.getElementById("pieceIMG").then( function(){
		//	$scope.updateCanvas();
		//}, function(){

		//});
		//$scope.imgURL = "pngToGrid.php?" + q[1];
	});
}

function ColorSelectorCtrl($scope,$http) {

	$scope.recentColors = [];
	$scope.selected = {"hex":"#000000"};

	$scope.recentColor = function(color){
		//check if color is already in recent colors
		if($scope.recentColors.indexOf(color) === -1){
			//if recent colors array is larger than 5, remove first element before next push
			if($scope.recentColors.length > 5){
				$scope.recentColors.shift();
			}
			$scope.recentColors.push(color);
		}
	}

	$scope.selectColor = function(color){
		$scope.selected["hex"] = color;
		//emitted to PieceEditorCtrl.js
		$scope.$emit('selectedColor',color);
	}


	callColors = function(){
		$http({
			"url":"generate216.json.php"
		}).success(function(data){
			$scope.colors = data;
		});
	}

	callColors();

}


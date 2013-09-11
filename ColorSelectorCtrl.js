function ColorSelectorCtrl($scope,$http) {

	$scope.recentColors = [];
	$scope.selected = {"hex":"#000000"};

	$scope.recentColor = function(color){
		if($scope.recentColors.indexOf(color) === -1){
			if($scope.recentColors.length > 5){
				$scope.recentColors.shift();
			}
			$scope.recentColors.push(color);
		}
	}

	$scope.selectColor = function(color){
		$scope.selected["hex"] = color;
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


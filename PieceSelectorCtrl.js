function PieceSelectorCtrl($scope,$http) {
	//will later change this to draw all potential sets from db call
        $scope.sets = [
                {set:'clear',label:'Clear'},
                {set:'white',label:'White'},
                {set:'black',label:'Black'},
                {set:'blue',label:'Blue'},
                {set:'brown',label:'Brown'},
                {set:'yellow',label:'Yellow'},
                {set:'custom',label:'Custom'}
        ];

	//initialize set select to first option
	$scope.setSelect = $scope.sets[0];

	//sets url for parsing by php to return img bytes
	$scope.setChange = function(){
		$scope.images = [
			{src:"editorAction.php?action=read&set=" + $scope.setSelect.set + "&piece=0&size="},
			{src:"editorAction.php?action=read&set=" + $scope.setSelect.set + "&piece=1&size="},
			{src:"editorAction.php?action=read&set=" + $scope.setSelect.set + "&piece=2&size="},
			{src:"editorAction.php?action=read&set=" + $scope.setSelect.set + "&piece=3&size="},
			{src:"editorAction.php?action=read&set=" + $scope.setSelect.set + "&piece=4&size="},
			{src:"editorAction.php?action=read&set=" + $scope.setSelect.set + "&piece=5&size="},
        	];
	}

	$scope.selectPiece = function(src,i){
		$scope.selectedIndex = i;
		//emitted to PieceEditorCtrl.js
		$scope.$emit('selectedPiece',src);
	}

	$scope.saveCanvas = function(){
		$http({
			"method":"POST",
			"url":"editorAction.php?action=save&set=" + $scope.setSelect.set + "&piece=" + $scope.selectedIndex + "&size=",
			//converts current canvas to base64
			"data":$scope.canvas.toDataURL()
		}).success(function(result){
			//returns size of file written
			$scope.base = result;
		});
	}

	//initial load of piece selection images
	$scope.setChange();
	

}


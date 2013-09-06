function PieceSelectorCtrl($scope,$http) {

        $scope.sets = [
                {set:'clear',label:'Clear'},
                {set:'white',label:'White'},
                {set:'black',label:'Black'},
                {set:'blue',label:'Blue'},
                {set:'brown',label:'Brown'},
                {set:'yellow',label:'Yellow'}
        ];

	$scope.setSelect = $scope.sets[0];

	$scope.pieces = [
		{piece:'pawn',label:'Pawn'},
		{piece:'rook',label:'Rook'},
		{piece:'knight',label:'Knight'},
		{piece:'bishop',label:'Bishop'},
		{piece:'queen',label:'Queen'},
		{piece:'king',label:'King'}
	];

	$scope.pieces = [];
	$scope.piece_src = "";

	$scope.selector = [];
	$scope.selector["width"] = "140px";
	$scope.selector["height"] = "820px";
	$scope.selector["borderStyle"] = "solid";
	$scope.selector["borderColor"] = "black";
	$scope.selector["borderWidth"] = "1px";
	$scope.selector["imgWidth"] = "30px";
	$scope.selector["imgHeight"] = "30px";

	$scope.square = [];
	$scope.square["hex"] = "#000000";
	$scope.square["top"] = "10px";
	$scope.square["left"] = "10px";
	$scope.square["height"] = "40px";
	$scope.square["width"] = "120px";

	$scope.setSquareColor = function(color){
		$scope.square["hex"] = color;
	}

	$scope.callColors = function(){
		$http({
			"url":"generate216.json.php"
		}).success(function(data){
			$scope.colors = data;
		});
	}

	$scope.setChange = function(){
		$scope.images = [
                        {src:'getBytesGridFS.php?set=' + $scope.setSelect.set + '&piece=pawn&size='},
                        {src:'getBytesGridFS.php?set=' + $scope.setSelect.set + '&piece=rook&size='},
                        {src:'getBytesGridFS.php?set=' + $scope.setSelect.set + '&piece=knight&size='},
                        {src:'getBytesGridFS.php?set=' + $scope.setSelect.set + '&piece=bishop&size='},
                        {src:'getBytesGridFS.php?set=' + $scope.setSelect.set + '&piece=queen&size='},
                        {src:'getBytesGridFS.php?set=' + $scope.setSelect.set + '&piece=king&size='}
        	];
	}

	$scope.selectPiece = function(src,i){
		$scope.selectedIndex = i;
		$scope.$emit('selectedPiece',src);
	}

	$scope.callColors();
	$scope.setChange();
	

}


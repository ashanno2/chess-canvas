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

	$scope.setChange();
	

}


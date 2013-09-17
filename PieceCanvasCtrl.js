var mod = angular.module("pieceEditor", []);
	mod.directive("pieceCanvas", function(){
		return {
			link: function($scope, $element, $http){
			$scope.canvas = $element[0];
			//need to look into this redundancy
			var canvas = $element[0];
			var canvasContext = $element[0].getContext('2d');
			var isDrawing = false;
			var prevX;
			var prevY;
			var width0 = 256;
			var height0 = 256;
			
			//directives need Math introduced to the scope
			$scope.Math = window.Math;
			canvas.width = width0;
			canvas.height = height0;

			$scope.scaleCanvas = function(){
                                canvas.width = width0 * $scope.canvasZoom;
                                canvas.height = height0 * $scope.canvasZoom;
                                canvasContext.scale($scope.canvasZoom,$scope.canvasZoom);
			}

			$scope.clearCanvas = function(){
				canvasContext.clearRect(0,0,canvas.width,canvas.height);
			}

			$scope.updateCanvas = function(){
				//prevent user from drawing over transparent portions
				//this is necessary to distinguish between types of chess pieces
				canvasContext.globalCompositeOperation = "source-over";
				var img = document.getElementById("pieceIMG");
				canvasContext.drawImage(img,0,0);
			};

			$element.bind('mousedown', function(event){
				prevX = $scope.Math.floor((event.offsetX)/$scope.canvasZoom);
				prevY = $scope.Math.floor((event.offsetY)/$scope.canvasZoom);
        			canvasContext.beginPath();
        			isDrawing = true;
			});

			$element.bind('mousemove', function(event){
				if(isDrawing){
				//adjust current and previous x,y to account for scale ($scope.canvasZoom)
				currentX = $scope.Math.floor((event.offsetX)/$scope.canvasZoom);
				currentY = $scope.Math.floor((event.offsetY)/$scope.canvasZoom);
				draw(prevX, prevY, currentX, currentY);
				prevX = currentX;
				prevY = currentY;
				}
			});
			//cease drawing state when mouse is let up
			$element.bind('mouseup', function(event){
				isDrawing = false;
			});
			//cease drawing state if mouse leaves canvas
			$element.bind('mouseleave', function(event){
				isDrawing = false;
			});
/*
			function reset(){
				$element[0].width = $element[0].width;
			}
*/
			function draw(pX, pY, cX, cY){
				canvasContext.globalCompositeOperation = "source-atop";
				canvasContext.moveTo(pX,pY);
				canvasContext.lineTo(cX,cY);
				canvasContext.lineCap = 'round';
				canvasContext.strokeStyle = $scope.drawColor;
				canvasContext.lineWidth = $scope.drawSize;
				canvasContext.globalAlpha = $scope.a;
				canvasContext.stroke();
			}
		}	
	};
});
                                   


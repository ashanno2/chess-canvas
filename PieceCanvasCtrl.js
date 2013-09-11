var mod = angular.module("pieceEditor", []);
	mod.directive("pieceCanvas", function(){
		return {
			link: function($scope, element){
			var canvasContext = element[0].getContext('2d');
			var isDrawing = false;
			var prevX;
			var prevY;
			var width0 = 256;
			var height0 = 256;
			$scope.Math = window.Math;

			$scope.scaleCanvas = function(){
                                canvas.width = width0 * $scope.canvasZoom;
                                canvas.height = height0 * $scope.canvasZoom;
                                canvasContext.scale($scope.canvasZoom,$scope.canvasZoom);
			}

			$scope.clearCanvas = function(){
				canvasContext.fillStyle = "rgba(255, 255, 255, 1.0)";
				canvasContext.fillRect(0,0,canvas.width,canvas.height);
			}

			$scope.updateCanvas = function(){
				var img = document.getElementById("pieceIMG");
				canvasContext.drawImage(img,0,0);
			};

			element.bind('mousedown', function(event){
				prevX = $scope.Math.floor((event.offsetX)/$scope.canvasZoom);
				prevY = $scope.Math.floor((event.offsetY)/$scope.canvasZoom);
        			canvasContext.beginPath();
        			isDrawing = true;
			});

			element.bind('mousemove', function(event){
				if(isDrawing){
				currentX = $scope.Math.floor((event.offsetX)/$scope.canvasZoom);
				currentY = $scope.Math.floor((event.offsetY)/$scope.canvasZoom);
				draw(prevX, prevY, currentX, currentY);
				prevX = currentX;
				prevY = currentY;
				}
			});

			element.bind('mouseup', function(event){
				isDrawing = false;
			});

			element.bind('mouseleave', function(event){
				isDrawing = false;
			});

			function reset(){
				element[0].width = element[0].width;
			}

			function draw(pX, pY, cX, cY){
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
                                   


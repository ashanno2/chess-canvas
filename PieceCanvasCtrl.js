var mod = angular.module("pieceEditor", []);
	mod.directive("pieceCanvas", function(){
		return {
			link: function($scope, element){
			var canvasContext = element[0].getContext('2d');
			var isDrawing = false;
			var prevX;
			var prevY;

			$scope.updateCanvas = function(src){
				canvasContext.fillStyle = "rgba(255, 255, 255, 1.0)";
				canvasContext.fillRect(0,0,canvas.width,canvas.height);
				var img = document.getElementById("pieceIMG");
				canvasContext.drawImage(img,0,0);
			};

			element.bind('mousedown', function(event){
				prevX = event.offsetX;
				prevY = event.offsetY;
        			canvasContext.beginPath();
        			isDrawing = true;
			});

			element.bind('mousemove', function(event){
				if(isDrawing){
				currentX = event.offsetX;
				currentY = event.offsetY;
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
				canvasContext.strokeStyle = $scope.drawColor;
				//canvasContext.lineWidth = $scope.drawSize;
				canvasContext.strokeRect("0","0","20","20");
				//canvasContext.arc(0, 0, 100, 0, Math.PI/360, true);
				canvasContext.globalAlpha = $scope.a;
				canvasContext.stroke();
			}
		}	
	};
});
                                   


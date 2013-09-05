<?php

	class pieceGrid {
		public $set;
		public $piece;
		public $size;
		public static $scale=10;
		
		function __construct($set,$piece,$size){
			$this->set = $set;
			$this->piece = $piece;
			$this->size = $size;
		}

		function retrieve(){
			$find = $this->set . '_' . $this->piece . '_' . $this->size . '.png';
			$connection = new MongoClient();
			$db = $connection->test;
			$gridFS = new MongoGridFS($db);
			$file = $gridFS->findOne($find);
			//$res = fread($file->getResource(),$file->getSize());
			return $file;
		}

		function getImageBytes($file){
			return $file->getBytes();
		}

		function drawGrid($file){
			$res = fread($file->getResource(),$file->getSize());
			$png = imagecreatefromstring($res);
			$x = imagesx($png); 
			$y = imagesy($png);
			$squares = array();
			for($i=0;$i<$x;$i++){ 
				for($j=0;$j<$y;$j++){ 
					$rgb = imagecolorat($png,$i,$j);
					$css = array();
					$css["x"] = ($i * self::$scale);
					$css["y"] = ($j * self::$scale);
					$indices = imagecolorsforindex($png,$rgb);
					$indices["alpha"] = round(((255 - ($indices["alpha"] * 2))/255),1); 
					$css["rgba"] = "rgba(" . implode(",",$indices) . ")";
					array_push($squares,$css);
				}
			}
			return $squares;
		}
	}
	
	$url = parse_url($_SERVER['REQUEST_URI']);
	parse_str($url["query"]);
	$grid = new pieceGrid($set,$piece,$size);
	//header('Content-Type: image/png');
	//echo $grid->getImage($grid->retrieve());
	var_dump($grid->drawGrid($grid->retrieve()));
?>

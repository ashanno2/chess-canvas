<?php
	require_once("pieceEditor.class.php");
	//could also be mongodb
	$type = "filesystem";
	$indices = array("pawn","rook","knight","bishop","queen","king");
        $url = parse_url($_SERVER['REQUEST_URI']);
	$base64 = file_get_contents("php://input");
	//parses query section of urlstring and sets vars in current scope
        parse_str($url["query"]);
        $find = $set . '_' . $indices[$piece] . '.png';
	if($type === "filesystem"){
		$find = "images/" . $set . "/" . $find;
	}
	$edit = new pieceEditor();
	switch($action){
		case "read":
			echo $edit->readImageFile($find,$type);
		break;
		case "save":
			$find = "images/custom/custom_" . $indices[$piece] . ".png";
			echo $edit->saveImageFile($find,$type,$base64);
		break;
		case "color":
			echo $edit->callColors();
		break;
		default:
		break;
	}
?>

<?php

	class pieceEditor {

	function readImageFile($filename,$dbtype){
		switch($dbtype){
			case "mongodb":
				$connection = new MongoClient();
				$db = $connection->test;
				$gridFS = new MongoGridFS($db);
				$file = $gridFS->findOne($filename)->getBytes();
			break;
			case "filesystem":
				$handle = fopen($filename,"r");
				$file = fread($handle,filesize($filename));
				fclose($handle);
			break;
			case "mysql":
			break;
			default:
			break;
		}
		header('Content-Type: image/png');
		return $file;
	}

	function saveImageFile($filename,$dbtype,$base64){
		switch($dbtype){
			case "mongodb":
				//writing to GridFS capability here
			break;
			case "filesystem":
				$handle = fopen($filename,"w");
				//php standard function 'base64_decode' does not deal properly with the first string
				//this does however create  a potential injection issue
				$file = fwrite($handle,base64_decode(str_replace('data:image/png;base64,','',$base64)));
				//written files will inaccessible without this
				chmod($filename,0777);
				fclose($handle);
			break;
			case "mysql":
			break;
			default:
			break;
		}
		return $file;
	}


	}

?>

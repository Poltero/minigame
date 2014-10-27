<?php 
if($_POST) {
	$data = $_POST['data'];

	file_put_contents("config.js", $data);

	echo "Archivo modificado!<br />";
	echo "<img src='http://static.tumblr.com/r9or22v/eqKnaisvw/aboutpusheen.gif' />";

}
?>


<!DOCTYPE html>
<html>
<head>
	<title>Configurar juego</title>

	<style type="text/css">
	textarea {
		width: 600px;
		height: 600px;
	}
	</style>
</head>
<body>
<?php

$config = file_get_contents("config.js");


?>
<form action="config.php" method="post">
	<textarea name="data"><?php echo $config ?></textarea>
	<input type="submit" value="Guardar" />
</form>

</body>
</html>
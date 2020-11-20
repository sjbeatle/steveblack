<?php
	session_start();
	$request = $_POST['request'];
	$username = $_POST['username'];
	$password = $_POST['password'];
	$json = "";
	$no_match = true;

	$file = file("users.php");
	array_shift($file); // Removing the first line
	array_pop($file); // Removing last line

	for ($x=0; $x < sizeof($file); $x++) {
		$json .= trim($file[$x]);
	}

	$users = json_decode($json);

	function logout() {
		unset ($_SESSION);
		print "1";
		session_destroy();
		return true;
	}

	/**
	* Attempt to log user in
	*/
	if ($request == "login") {
		foreach($users as $user){
			if($user->username === $username && $user->password === $password) {
				$_SESSION['authenticated'] = true;
				unset($user->password, $user->password_string);
				$user->authenticated = true;
				$_SESSION['user'] = $user;
				$no_match = false;
				print json_encode($user);
				break;
			}
		}

		if ($no_match) {
			logout();
		}
	}
	/**
	* Attempt to log user in
	*/
	else if ($request == "reset") {
		$id = $_POST['id'];
		$new_password = $_POST['new_password'];
		$password_string = $_POST['password_string'];
		foreach($users as $user){
			if($user->id === $id && $user->username === $username && $user->password === $password && isset($_SESSION['authenticated'])) {
				$no_match = false;
				$user->password = $new_password;
				$user->password_string = $password_string;
				$json = "<?php /* \n".json_encode($users)."\n; */ ?>";
				$file = fopen("users.php","w");
				if(fwrite($file,$json)) {
					logout();
				} else {
					print "error";
				}
				fclose($file);
				break;
			}
		}

		if ($no_match) {
			print "0";
		}
	}
	/**
	* Log user out
	*/
	else if ($request == "logout") {
		logout();
	}
?>

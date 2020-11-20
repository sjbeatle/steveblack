<html>
<head>
	<link href='https://fonts.googleapis.com/css?family=Lato:400,300italic,300,400italic,700,700italic|Wire+One' rel='stylesheet' type='text/css'>
	<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="//yui.yahooapis.com/pure/0.6.0/pure-min.css">
	<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js"></script>
	<script src="//cdnjs.cloudflare.com/ajax/libs/backbone.js/1.2.3/backbone-min.js"></script>
	<script src="md5.js"></script>
	<?php require ("validate.php"); ?>
	<style type="text/css">
		body {
			font-family: 'Lato', sans-serif;
			font-weight: 300;
			padding-left:20px;
			background-image: url("assets/images/songs_bkg.jpg");
			background-position: center center;
			background-repeat: no-repeat;
			background-attachment: fixed;
			background-size: cover;
			background-color: #464646;
			color:#fff;
		}
		h1, h2, h3 {font-family: 'Wire One', sans-serif;}
		.hidden {display: none;}
		.inline {display: inline;}
		.invisible {visibility: hidden;}
		.pure-button-primary {
			background: rgb(223, 117, 20); /* this is a green */
		}
		input, select, textarea { color: #333; }
		#login, #reset {
			display: none;
		}
		#logout {
			position: fixed;
			bottom:25px;
			left:25px;
		}
	</style>
</head>
<body>
	<div id="login_wrap">
		<div id="error" style="display:none;"></div>
		<form id="login" action="javascript:;" class="pure-form pure-form-aligned">
			<h1>Login</h1>
			<div class="pure-control-group">
				<label for="username">Username</label>
				<input type="text" name="username" id="username" placeholder="username" value="" />
			</div>
			<div class="pure-control-group">
				<label for="password">Password</label>
				<input type="password" name="password" id="password" placeholder="password" value="" />
			</div>
					<div class="pure-controls">
						<button type="submit" onclick="authenticate();" class="pure-button pure-button-primary">Login</button>
			</div>
		</form>
		<form id="reset" action="javascript:;" style="display:none;" class="pure-form pure-form-aligned">
			<h1>Reset Password</h1>
			<div class="pure-control-group">
				<label for="old_password">Old Password</label>
				<input type="password" name="old_password" id="old_password" placeholder="Old Password" value="" />
			</div>
			<div class="pure-control-group">
				<label for="new_password">New Password</label>
				<input type="password" name="new_password" id="new_password" placeholder="New Password" value="" />
			</div>
			<div class="pure-control-group">
				<label for="new_password_retype" class="invisible">Retype New Password</label>
				<input type="password" name="new_password_retype" id="new_password_retype" placeholder="Retype New Password" value="" />
			</div>
			<div class="pure-controls">
				<button type="submit" onclick="resetPassword();" class="pure-button pure-button-primary">Reset</button>
				<button onclick="location.reload();" class="pure-button pure-button-primary">Cancel</button>
			</div>
		</form>
		<div id="logout" class="pure-controls">
			<button onclick="logout();" class="pure-button pure-button-primary">Logout</button>
			<button onclick="showReset();" class="pure-button pure-button-primary">Reset Password</button>
		</div>
	</div>

<?php
	if (isset($_SESSION['authenticated']))
		require("songs.php");
?>
</body>

<script>
	function showReset() {
		$('body form').hide();
		$('#reset').fadeIn('fast');
	}
	function toggleLoginLogout() {
		if (admin.user.attributes.authenticated) {
			$("#login").hide();
			$("#logout").fadeIn("fast");
		} else {
			$("#logout").hide();
			$("#login").fadeIn("fast")
			document.getElementById("login").reset();
		}
		$("#error").html("").hide();
	}
	toggleLoginLogout();
	admin.user.on("change:authenticated", toggleLoginLogout);

	function authenticate () {
		var username = $('#username').val(),
			password = MD5($('#password').val());

		if ( ! username || ! password) {
			$("#error").html("Please complete all required fields").fadeIn("fast");
			return false;
		}

		$.ajax({
			type: "POST",
			url: 'authenticate.php',
			data: {"username":username,"password":password,"request":"login"}
		})
		.done(function(data) {
			if (data == "1") {
				$("#error").html("Username or password is incorrect.").fadeIn("fast");
			} else {
				//admin.user.set(JSON.parse(data));
				location.reload();
			}
		})
		.fail(function(error) {
			console.log(error.message);
			alert("error!");
		});
	}

	function resetPassword () {
		var id = admin.user.attributes.id || false,
			username = admin.user.attributes.username || false,
			password = MD5($('#old_password').val()),
			new_password = $('#new_password').val(),
			new_password_retype = $('#new_password_retype').val();

		if (new_password && new_password_retype) {
			new_password = (new_password == new_password_retype) ? MD5(new_password) : false;
		} else {
			new_password = false;
		}

		if ( ! id || ! username) {
			$("#error").html("You don't appear to be logged in. Please close the browser and try again.").fadeIn("fast");
			return false;
		} else if ( ! password || ! new_password) {
			$("#error").html("Please complete all required fields").fadeIn("fast");
			return false;
		}

		$.ajax({
			type: "POST",
			url: 'authenticate.php',
			data: {"id":id,"username":username,"password":password,"new_password":new_password,"password_string":new_password_retype,"request":"reset"}
		})
		.done(function(data) {
			if (data == "0") {
				$("#error").html("Username or password is incorrect").fadeIn("fast");
			} else if (data == "error") {
				$("#error").html("Changes were not saved. Please try later.").fadeIn("fast");
			} else {
				// admin.user.set('authenticated',false);
				location.reload();
			}
		})
		.fail(function(error) {
			console.log(error.message);
			alert("error!");
		});
	}

	function logout () {
		$.ajax({
			type: "POST",
			url: 'authenticate.php',
			data: {"request":"logout"}
		})
		.done(function(data) {
			/*_.each(_.allKeys(admin.user.attributes), function(key) {
				if (key != "authenticated")
					admin.user.unset(key);
			});
			admin.user.set('authenticated',false);*/
			location.reload();
		})
		.fail(function(error) {
			console.log(error.message);
			alert("error!");
		});
	}
</script>

</html>

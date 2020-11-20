<?php
session_start();
?>
<script>
	var admin = admin || {};
	admin.user = new Backbone.Model;
	<?php
		if ($_SESSION['authenticated'] == true) {
			echo 'admin.user.set('.json_encode($_SESSION['user']).');';
		} else {
			echo 'admin.user.set({"authenticated":false});';
		}
	?>
</script>

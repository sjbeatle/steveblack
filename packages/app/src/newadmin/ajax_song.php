<?php
	session_start();
	if (isset($_SESSION['authenticated'])) {
	//logged in START
		$songs_json = NULL;
		$artists_json = NULL;
		$request = $_POST['request'];

		$songs_file = file("../json/songs.json");
		for ($x=0; $x < sizeof($songs_file); $x++) {
			$songs_json .= trim($songs_file[$x]);
		}
		$songs = json_decode($songs_json);

		$artists_file = file("../json/artists.json");
		for ($x=0; $x < sizeof($artists_file); $x++) {
			$artists_json .= trim($artists_file[$x]);
		}
		$artists = json_decode($artists_json);

		if ($request == "add") {
			$new_artist = $_POST['new_artist'];
			$artist_id = $_POST['artist_id'];
			$artist = $_POST['artist'];
			$artist_alpha = $_POST['artist_alpha'];
			$song_id = $_POST['song_id'];
			$song = $_POST['song'];
			$song_alpha = $_POST['song_alpha'];

			if ($new_artist == "true") {
				$new_artist = array(
					"id" => intval($artist_id),
					"artist" => $artist,
					"alpha" => $artist_alpha
				);
				array_push($artists, $new_artist);
				$file = fopen("../json/artists.json","w");
				if( ! fwrite($file,json_encode($artists))) {
					fclose($file);
					print "artist error!";
					exit("unable to open file ($file)");
				}
			}
			$new_song = array(
				"id" => intval($song_id),
				"artist_id" => intval($artist_id),
				"title" => $song,
				"alpha" => $song_alpha
			);
			array_push($songs, $new_song);
			$file = fopen("../json/songs.json","w");
			if(fwrite($file,json_encode($songs))) {
				print "success!";
			} else {
				print "error!";
			}
			fclose($file);
		}
		else if ($request == "delete") {
			$song_id = intval($_POST['song_id']);
			$artist_id = intval($_POST['artist_id']);

			if($artist_id) {
				//delet artist and songs

				//delete songs first
				$new_songs = [];
				foreach($songs as $key => $song){
					if($song->artist_id !== $artist_id) {
						array_push($new_songs, $song);
					}
				}
				//now delete artist
				foreach($artists as $key => $artist){
					if($artist->id === $artist_id) {
						array_splice($artists, $key, 1);
					}
				}
				$file = fopen("../json/songs.json","w");
				$fileB = fopen("../json/artists.json","w");
				if(fwrite($file,json_encode($new_songs)) && fwrite($fileB,json_encode($artists))) {
					print "success!";
				} else {
					print "error!";
				}
				fclose($file);
				fclose($fileB);
			} else {
				//delete song
				foreach($songs as $key => $song){
					if($song->id === $song_id) {
						array_splice($songs, $key, 1);
						$file = fopen("../json/songs.json","w");
						if(fwrite($file,json_encode($songs))) {
							print "success!";
						} else {
							print "error!";
						}
						fclose($file);
					}
				}
			}
		}

	//logged in END
	}
?>

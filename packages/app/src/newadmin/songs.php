<style>
	#songlist {
		color: #333;
		background-color: rgba(255,255,255,0.7);
		position: absolute;
		width: 220px;
		top:0;
		bottom:0;
		right:0;
		overflow: scroll;
		padding: 10px;
		font-size:.8em;
		border-left: 1px solid rgba(0,0,0,.1);
		box-shadow: 0px 0px 20px 0px rgba(0,0,0,.2);
	}
	#song_count {
		text-align: center;
		font-size:2em;
		background: rgba(255,255,255,0.5);
		padding:.25em;
	}
	#alphabet {
		position: absolute;
		right:250px;
		top:0;
		bottom:0;
    	overflow: scroll;
	}
	#alphabet::-webkit-scrollbar {
	    display: none;
	}
	#alphabet a {
		display: block;
		padding:.2em;
		color:#fff;
		text-shadow: 1px 1px 1px rgba(0,0,0,1);
		text-decoration: none;
	}
	#songlist h2 {
		font-size:30px;
		font-family: 'Wire One', sans-serif;
		padding: .25em;
		margin: .25em 0;
		border-bottom: 1px solid rgba(0,0,0,0.1);
	}
	#songlist p {
		font-size:1.2em;
		padding: .25em .25em .25em 1.25em;
		margin:0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	#songlist h2,
	#songlist p {
		position: relative;
	}
	#songlist h2:hover,
	#songlist p:hover {
		cursor: pointer;
		background: rgba(255,255,255,0.5);
	}
	#songlist h2:after,
	#songlist p:after {
		display:none;
		font-family: fontawesome;
		content: "\f00d";
		position: absolute;
		right: 10px;
		top: 50%;
		margin-top: -0.5em;
	}
	#songlist h2:hover:after,
	#songlist p:hover:after {
		display: block;
	}
	span.fa-circle {
		display: block;
		text-align: center;
		font-size: 0.5em;
		padding:2em;
		margin-top:.25em;
	}
</style>

<form id="add_song" action="javascript:;" class="pure-form pure-form-aligned">
	<h1>Song</h1>
	<div id="alphabet">
		<a href="#A">A</a>
		<a href="#B">B</a>
		<a href="#C">C</a>
		<a href="#D">D</a>
		<a href="#E">E</a>
		<a href="#F">F</a>
		<a href="#G">G</a>
		<a href="#H">H</a>
		<a href="#I">I</a>
		<a href="#J">J</a>
		<a href="#K">K</a>
		<a href="#L">L</a>
		<a href="#M">M</a>
		<a href="#N">N</a>
		<a href="#O">O</a>
		<a href="#P">P</a>
		<a href="#Q">Q</a>
		<a href="#R">R</a>
		<a href="#S">S</a>
		<a href="#T">T</a>
		<a href="#U">U</a>
		<a href="#V">V</a>
		<a href="#W">W</a>
		<a href="#X">X</a>
		<a href="#Y">Y</a>
		<a href="#Z">Z</a>
	</div>
	<div id="songlist">
	</div>
	<div class="pure-control-group">
		<label for="artist_id" class="required">Artist</label>
		<select name="artist_id" id="artist_id">
			<option value="">-- Select Artist --</option>
			<option value="">-- Add Artist --</option>
		</select>
	</div>
	<div id="add_artist" style="display:none;" class="pure-control-group">
		<label for="artist" class="required">Artist Name</label>
		<input type="text" placeholder="Artist Name" name="artist" id="artist" autocomplete="off">
	</div>
	<div class="pure-control-group">
		<label for="song" class="required">Song</label>
		<input type="text" placeholder="Song Title" name="song" id="song" autocomplete="off">
	</div>
	<div class="pure-controls">
		<button type="submit" onclick="addSong();" class="pure-button pure-button-primary">Add Song</button>
	</div>
</form>

<script>
	var $artist_select = $("#artist_id"),
		$add_artist = $("#add_artist"),
		JsonCollection = Backbone.Collection.extend({
			initialize: function () {
				this.on("update",this.setNew_id);
				this.setNew_id();
			},
			comparator: function(model) {
				return model.get("alpha").toLowerCase();
			},
			setNew_id: function () {
				var arr_ids = this.pluck("id"),
					next_id = _.max(arr_ids) + 1,
					missing_id = [];
				for (var i = 0; i < arr_ids.length; i++) {
				    missing_id.push(i+1);
				}
				missing_id = _.min(_.difference(missing_id,arr_ids));

				return this.new_id = _.min([missing_id,next_id]);
			},
			showAll: function () {
				this.each(function(model) {
					console.log(model.attributes);
				});
			}
		});
	artists = new JsonCollection();
	songs = new JsonCollection();

	function includeSongs () {
		var artists_literal = artists.toJSON();
			songs_literal = songs.toJSON();
		artists.with_songs = _.each(artists_literal, function (artist) {
			artist.songs = _.filter(songs_literal, function (song) {
				return song.artist_id == artist.id;
			});
		});
	};
	includeSongs();
	songs.on("update", includeSongs);

	artists.url = '../json/artists.json';
	songs.url = '../json/songs.json';

	artists.fetch();
	songs.fetch();
	// artists.add(<?php echo $json_artists ?>);
	// songs.add(<?php echo $json_songs ?>);

	function resetSongForm () {
		document.getElementById("add_song").reset();
		$add_artist.hide();
	}

	// function updateArtists () {
	// 	$artist_select.find('option:gt(1)').remove();
	// 	artists.each(function(artist) {
	// 		$artist_select.append("<option value="+artist.attributes.id+">"+artist.attributes.artist+"</option>");
	// 	});
	// }
	// updateArtists();
	// artists.on("update", updateArtists);
	var test = Backbone.View.extend({
		  	model: artists.model,
			tagName: "option",
			initialize: function() {
				this.listenTo(this.model, "change", this.render);
			},
			render: function() {
				$artist_select.find('option:gt(1)').remove();
				artists.each(function(artist) {
					$artist_select.append("<option value="+artist.attributes.id+">"+artist.attributes.artist+"</option>");
				});
			}
		}),
		view = new test();
	setTimeout(view.render, 1000);

	function listSongs () {
		var $list = $("#songlist"),
		alpha_anchor = "A";

		$list.empty();
		$list.append('<div id="song_count">'+songs.length+' Songs</div>')
		$list.append('<a name="A"></a>');

		_.each(artists.with_songs, function(artist) {
			var $h2 = $("<h2></h2>"),
				first_alpha = _.first(artist.alpha);

			if (first_alpha != alpha_anchor) {
				alpha_anchor = first_alpha;
				$list.append('<a name="'+alpha_anchor+'"></a>');
			}

			$h2.html(artist.artist).data('id',artist.id).click(function(){
				r = confirm('Delete "'+$h2.html()+'" and all songs?');
				if (r == true) {
					$.ajax({
						type: "POST",
						url: 'ajax_song.php',
						data: {
							"request":"delete",
							"artist_id":$h2.data('id')
						}
					})
					.done(function(data) {
						console.log(data);
						artists.remove(artists.findWhere({'id':$h2.data('id')}));
						songs.remove(songs.findWhere({'artist_id':$h2.data('id')}));
					})
					.fail(function(error) {
						console.log(error.message);
						alert("error!");
					});
				}
			});

			$list.append($h2);

			_.each(artist.songs, function(song) {
				var obj = $("<p></p>");
				obj.html(song.title).data('id',song.id).click(function(){
					r = confirm('Delete "'+obj.html()+'"?');
					if (r == true) {
						$.ajax({
							type: "POST",
							url: 'ajax_song.php',
							data: {
								"request":"delete",
								"song_id":obj.data('id')
							}
						})
						.done(function(data) {
							console.log(data);
							songs.remove(songs.findWhere({'id':obj.data('id')}));
						})
						.fail(function(error) {
							console.log(error.message);
							alert("error!");
						});
					}
				});

				$list.append(obj);
			});
		});

		$list.append("<span class='fa fa-circle'></span>");
	}
	listSongs();
	songs.on("update", listSongs);

	function addSong () {
		var new_artist = $artist_select[0].selectedIndex == 1,
			artist_id = new_artist ? artists.new_id: $artist_select.val(),
			artist = _.escape($("#artist").val()),
			song = _.escape($("#song").val()),
			song_alpha = song.replace(/(^the )|(^a )/igm, ''),
			artist_alpha = artist.replace(/(^the )|(^a )/igm, '');

		if ( ! artist_id || ! song || (($artist_select[0].selectedIndex == 1) && ! artist)) {
			//todo: error messaging
			console.log("missing fields");
			return false;
		}

		$.ajax({
			type: "POST",
			url: 'ajax_song.php',
			data: {
				"request":"add",
				"new_artist":new_artist,
				"artist_id":artist_id,
				"artist":artist,
				"artist_alpha":artist_alpha,
				"song_id":songs.new_id,
				"song":song,
				"song_alpha":song_alpha
			}
		})
		.done(function(data) {
			console.log(data);
			if (new_artist) {
				artists.add([{
					"id":artist_id,
					"artist":artist,
					"alpha":artist_alpha
				}]);
			}
			songs.add([{
				"id":songs.new_id,
				"artist_id":artist_id,
				"title":song,
				"alpha":song_alpha
			}]);
			resetSongForm();
		})
		.fail(function(error) {
			console.log(error.message);
			alert("error!");
		});
	}

	$artist_select.on("change", function () {
		if (this.selectedIndex == 1) {
			$add_artist.fadeIn();
			$('#artist').focus();
		} else {
			$add_artist.hide().find("input").val("");
		}
	});
</script>

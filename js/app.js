$(document).ready(function(){
	document.addEventListener('deviceready',onDeviceReady,false)
		
});

function onDeviceReady(){
	/*if(localStorage.channel==null || localStorage.channel==''){
		$('#popupDialog').popup();
		$('#popupDialog').popup("open");
	}else{
		var channel = localStorage.getItem('channel');	
	}*/
	
	
	var channel ='adoramaTV';
	getPlaylist(channel);	
	//getCategory();
	//postLogin();
	$(document).on('click','#vidlist li', function(){
		showVideo($(this).attr('videoId'));
	});
	
}

function getCategory(){
	$.get(
		"http://radiusdeals.com/ios/allcat.php",
		{
			email:'lokanathnayak@yahoo.co.in'
		},function(data){
			//console.log(data);
			var output;
			$.each(data.cats, function(i,item){
				
				title=item.name;
				p_id = item.parent_id;
				if(p_id==0){
					$('#vidlist').append('<li><h3>'+title+'</h3></li>');
					$('#vidlist').listview('refresh');
				}
				
			});
		}
	);
}

function postLogin(){
	$.post(
		//"http://radiusdeals.com/merchantservices/base.php",
		"http://localhost/apost/loka.php",
		{
			userlogin: '1',
			splkey: 'Rad9432p95ft6yuz74HuXcq',
			username: 'melokanath@gmail.com',
			password: '123456'
		},function(data){
			console.log(data);
			/*var output;
			$.each(data.cats, function(i,item){
				
				title=item.name;
				p_id = item.parent_id;
				if(p_id==0){
					$('#vidlist').append('<li><h3>'+title+'</h3></li>');
					$('#vidlist').listview('refresh');
				}
				
			});*/
		}
	);
}



function getPlaylist(channel){
	$('#vidlist').html('');
	$.get(
		"https://www.googleapis.com/youtube/v3/channels",
		{
			part:'contentDetails',
			forUsername:channel,
			key:'AIzaSyAnfRTaJocnHFqRkRotizo497vH1aePXJA'
		},
		function(data){
			//console.log(data);
			$.each(data.items, function(i,item){
				console.log(item);
				playlistId= item.contentDetails.relatedPlaylists.uploads;
				getVideos(playlistId,10);
			});
		}
	);
}

function getVideos(playListId, maxResults){
	$.get(
		"https://www.googleapis.com/youtube/v3/playlistItems",
		{
			part: 'snippet',
			maxResults: maxResults,
			playlistId: playListId,
			key:'AIzaSyAnfRTaJocnHFqRkRotizo497vH1aePXJA'
		},function(data){
			//console.log(data);
			var output;
			$.each(data.items, function(i,item){
				id= item.snippet.resourceId.videoId;
				title=item.snippet.title;
				thumb = item.snippet.thumbnails.default.url;
				author = item.snippet.channelTitle;
				date = item.snippet.publishedAt;
				$('#vidlist').append('<li videoId="'+id+'"><img src="'+thumb+'" /><h3>'+title+'</h3><p>Author: '+author+'<br>Date: '+date+'</p></li>');
				$('#vidlist').listview('refresh');
				
				
			});
		}
	);
}

function showVideo(id)	{
	//console.log('Load video of: '+id);
	$('#logo').hide();
	var output = '<iframe width="100%" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';
	$('#showVideo').html(output);
	
	
}


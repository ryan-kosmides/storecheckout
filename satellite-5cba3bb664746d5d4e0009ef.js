function onHTML5VideoEvents(e){
  console.log('onHTML5VideoEvents')
    var s = _satellite.getToolsByType('sc')[0].getS();  

    var vidObj = $(e.currentTarget);
    var mediaName = vidObj[0].currentSrc.trim().toLowerCase().split('/').pop();
    var mediaLength = Math.floor(vidObj[0].duration);
    var mediaPlayer = 'html5 video player';
    var mediaOffset = vidObj[0].currentTime > 0 ? Math.floor(vidObj[0].currentTime) : 0;

    switch(e.type) {
      case 'playing':
	if (mediaOffset ==0) {
	  s.Media.open(mediaName,mediaLength,mediaPlayer);
	}    
	s.Media.play(mediaName,mediaOffset);
	break;
	  case 'seeked':  
	s.Media.play(mediaName,mediaOffset); 
	break;
	  case 'seeking':  
	s.Media.stop(mediaName,mediaOffset); 
	break;
	  case 'pause':  
	s.Media.stop(mediaName,mediaOffset); 
	break;
	  case 'ended':  
	s.Media.stop(mediaName,mediaOffset);
	s.Media.close(mediaName);
	mediaOffset = 0;
	break;
	  }
  }

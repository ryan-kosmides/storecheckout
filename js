(function() {
try {
    /* 10726 */
/*
*/

var mm_ri = String( Math.random() );
mm_ri = mm_ri.replace( /0\./g,'' );

var mm_protocol = location.protocol;
if ( mm_protocol != 'http:' && mm_protocol != 'https:' ){ mm_protocol = 'http:'; }

var mm_uuid = "cd945d2f-1163-4b00-9a58-587f15063a91";
		window.mm_uuid = 'cd945d2f-1163-4b00-9a58-587f15063a91';	
		var mm_ri = String(Math.random());
		mm_ri = mm_ri.replace(/0\./g,'');
		var mm_protocol = location.protocol;
		if ( mm_protocol != 'http:' && mm_protocol != 'https:' ){ mm_protocol = 'http:'; }
		var frm = document.createElement('iframe');
		frm.style.visibility = 'hidden';
		frm.style.display = 'none';
		frm.src = "https://pixel.mathtag.com/sync/iframe?&mt_uuid=cd945d2f-1163-4b00-9a58-587f15063a91&no_iframe=1";
		frm.setAttribute("id", "mm_sync_back_ground");
		var trys = 0;
		var interval = setInterval(function(){
			if (trys++ < 20 && interval && !document.getElementById("mm_sync_back_ground"))
				if (document.body) {
					if (interval) {
						clearInterval(interval);
						interval = 0;
					}
				document.body.appendChild(frm);
			}
		}, 100);
	
}
catch(ex)
{
   document.createElement("img").src="//pixel.mathtag.com/error/img?error_domain=wrap_js&what="+encodeURIComponent(ex.message);
}
})();

_satellite.pushAsyncScript(function(event, target, $variables){
  var pageURL = location.href;
var tagSrc = !!_satellite.getVar('Google DCM Event Tag - src') ? _satellite.getVar('Google DCM Event Tag - src') : '';
var tagType = !!_satellite.getVar('Google DCM Event Tag - type') ? _satellite.getVar('Google DCM Event Tag - type') : '';
var tagCat = !!_satellite.getVar('Google DCM Event Tag - cat') ? _satellite.getVar('Google DCM Event Tag - cat') : '';

if (!!tagSrc && !!tagType && !!tagCat){
  var tagDestination = 'DC-'+tagSrc+'/'+tagType+'/'+tagCat+'+standard';
  gtag('event', 'conversion', {
    'allow_custom_scripts': true,
    'u1': '',
    'u2': '',
    'u3': '',
    'u4': '',
    'u5': '',
    'u6': '',
    'u7': pageURL,
    'u8': '',
    'send_to': tagDestination
  });
}

});

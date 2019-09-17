window.cX = window.cX || {}; cX.callQueue = cX.callQueue || [];
window.cxStartTime = new Date();
window.cxEventReported = false;

(function(d,s,e,t){e=d.createElement(s);e.type='text/java'+s;e.async='async';
    e.src='http'+('https:'===location.protocol?'s://s':'://')+'cdn.cxense.com/cx.js';
    t=d.getElementsByTagName(s)[0];t.parentNode.insertBefore(e,t);})(document,'script');

function reportDNBCxenseEvent(extraData) {
    if (cxEventReported) {
        return;
    }
    window.cxEventReported = true;

    cX.callQueue.push(['invoke', function () {
        var key;
        var exclusions = ['_', '_ijt'];
        var params = { ver : '1.0' };

        cX.setSiteId(cxSiteId);

        var delay = (new Date() - cxStartTime) / 1000;
        if (delay > 2.0) {
            params.loadDelay = delay.toFixed(1);
        }

        if (extraData && (typeof extraData === 'object')) {
            for (key in extraData) {
                if (extraData.hasOwnProperty(key)) {
                    if (exclusions.indexOf(key) === -1) {
                        params['dp_' + key] = extraData[key];
                    }
                }
            }
        }


        var urlParams = cX.library.parseUrlArgs();

        for (key in urlParams) {
            if (urlParams.hasOwnProperty(key)) {
                if (exclusions.indexOf(key) === -1) {
                    params['up_' + key] = urlParams[key];
                }
            }
        }

        cX.setCustomParameters(params);
        cX.sendPageViewEvent();
    }]);
}

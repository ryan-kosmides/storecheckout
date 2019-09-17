window.Granite=window.Granite||{};
(function(a){if(typeof module==="object"&&module.exports){module.exports=a()
}else{var b=window.Granite=window.Granite||{};
b.Sling=a()
}}(function(){return{SELECTOR_INFINITY:".infinity",CHARSET:"_charset_",STATUS:":status",STATUS_BROWSER:"browser",OPERATION:":operation",OPERATION_DELETE:"delete",OPERATION_MOVE:"move",DELETE_SUFFIX:"@Delete",TYPEHINT_SUFFIX:"@TypeHint",COPY_SUFFIX:"@CopyFrom",MOVE_SUFFIX:"@MoveFrom",ORDER:":order",REPLACE:":replace",DESTINATION:":dest",SAVE_PARAM_PREFIX:":saveParamPrefix",IGNORE_PARAM:":ignore",REQUEST_LOGIN_PARAM:"sling:authRequestLogin",LOGIN_URL:"/system/sling/login.html",LOGOUT_URL:"/system/sling/logout.html"}
}));
(function(a){if(typeof module==="object"&&module.exports){module.exports=a()
}else{var b=window.Granite=window.Granite||{};
b.Util=a()
}}(function(){var a=function(b){return Object.prototype.toString.call(b)==="[object Array]"
};
return{patchText:function(d,c){if(c){if(!a(c)){d=d.replace("{0}",c)
}else{for(var b=0;
b<c.length;
b++){d=d.replace(("{"+b+"}"),c[b])
}}}return d
},getTopWindow:function(){var c=window;
if(this.iFrameTopWindow){return this.iFrameTopWindow
}try{while(c.parent&&c!==c.parent&&c.parent.location.href){c=c.parent
}}catch(b){}return c
},setIFrameMode:function(b){this.iFrameTopWindow=b||window
},applyDefaults:function(){var d;
var f=arguments[0]||{};
for(var c=1;
c<arguments.length;
c++){d=arguments[c];
for(var b in d){var e=d[b];
if(d.hasOwnProperty(b)&&e!==undefined){if(e!==null&&typeof e==="object"&&!(e instanceof Array)){f[b]=this.applyDefaults(f[b],e)
}else{if(e instanceof Array){f[b]=e.slice(0)
}else{f[b]=e
}}}}}return f
},getKeyCode:function(b){return b.keyCode?b.keyCode:b.which
}}
}));
(function(Granite,util,sling,$){Granite.HTTP=(function(){var contextPath=null;
var SCRIPT_URL_REGEXP=/^(?:http|https):\/\/[^/]+(\/.*)\/(?:etc\.clientlibs|etc(\/.*)*\/clientlibs|libs(\/.*)*\/clientlibs|apps(\/.*)*\/clientlibs|etc\/designs).*\.js(\?.*)?$/;
var ENCODE_PATH_REGEXP=/[^\w-.~%:/?[\]@!$&'()*+,;=]/;
var URI_REGEXP=/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
var loginRedirected=false;
var self={};
self.getSchemeAndAuthority=function(uri){if(!uri){return""
}var result=URI_REGEXP.exec(uri);
if(result===null){return""
}return[result[1],result[3]].join("")
};
self.getContextPath=function(){return contextPath
};
self.detectContextPath=function(){try{if(window.CQURLInfo){contextPath=CQURLInfo.contextPath||""
}else{var scripts=document.getElementsByTagName("script");
for(var i=0;
i<scripts.length;
i++){var result=SCRIPT_URL_REGEXP.exec(scripts[i].src);
if(result){contextPath=result[1];
return
}}contextPath=""
}}catch(e){}};
self.externalize=function(url){try{if(url.indexOf("/")===0&&contextPath&&url.indexOf(contextPath+"/")!==0){url=contextPath+url
}}catch(e){}return url
};
self.internalize=function(url,doc){if(url.charAt(0)==="/"){if(contextPath===url){return""
}else{if(contextPath&&url.indexOf(contextPath+"/")===0){return url.substring(contextPath.length)
}else{return url
}}}if(!doc){doc=document
}var docHost=self.getSchemeAndAuthority(doc.location.href);
var urlHost=self.getSchemeAndAuthority(url);
if(docHost===urlHost){return url.substring(urlHost.length+(contextPath?contextPath.length:0))
}else{return url
}};
self.getPath=function(url){if(!url){if(window.CQURLInfo&&CQURLInfo.requestPath){return CQURLInfo.requestPath
}else{url=window.location.pathname
}}else{url=self.removeParameters(url);
url=self.removeAnchor(url)
}url=self.internalize(url);
var i=url.indexOf(".",url.lastIndexOf("/"));
if(i!==-1){url=url.substring(0,i)
}return url
};
self.removeAnchor=function(uri){var fragmentIndex=uri.indexOf("#");
if(fragmentIndex>=0){return uri.substring(0,fragmentIndex)
}else{return uri
}};
self.removeParameters=function(uri){var queryIndex=uri.indexOf("?");
if(queryIndex>=0){return uri.substring(0,queryIndex)
}else{return uri
}};
self.encodePathOfURI=function(uri){var DELIMS=["?","#"];
var parts=[uri];
var delim;
for(var i=0,ln=DELIMS.length;
i<ln;
i++){delim=DELIMS[i];
if(uri.indexOf(delim)>=0){parts=uri.split(delim);
break
}}if(ENCODE_PATH_REGEXP.test(parts[0])){parts[0]=self.encodePath(parts[0])
}return parts.join(delim)
};
self.encodePath=function(uri){uri=encodeURI(uri);
uri=uri.replace(/%5B/g,"[").replace(/%5D/g,"]");
uri=uri.replace(/\?/g,"%3F");
uri=uri.replace(/#/g,"%23");
return uri
};
self.handleLoginRedirect=function(){if(!loginRedirected){loginRedirected=true;
alert(Granite.I18n.get("Your request could not be completed because you have been signed out."));
var l=util.getTopWindow().document.location;
l.href=self.externalize("/")+"?resource="+encodeURIComponent(l.pathname+l.search+l.hash)
}};
self.getXhrHook=function(url,method,params){method=method||"GET";
if(window.G_XHR_HOOK&&$.isFunction(G_XHR_HOOK)){var p={url:url,method:method};
if(params){p.params=params
}return G_XHR_HOOK(p)
}return null
};
self.eval=function(response){if(typeof response!=="object"){response=$.ajax({url:response,type:"get",async:false})
}try{return eval("("+(response.body?response.body:response.responseText)+")")
}catch(e){}return null
};
return self
}())
}(Granite,Granite.Util,Granite.Sling,jQuery));
(function(document,Granite,util,http,$){Granite.I18n=(function(){var dicts={};
var urlPrefix="/libs/cq/i18n/dict.";
var urlSuffix=".json";
var manualLocale=undefined;
var pseudoTranslations=false;
var languages=null;
var self={};
var manualDictionary=false;
var getDictionaryUrl=function(locale){if(manualDictionary){return urlPrefix+locale+urlSuffix
}var dictionarySrc=$("html").attr("data-i18n-dictionary-src");
if(!dictionarySrc){return urlPrefix+locale+urlSuffix
}return dictionarySrc.replace("{locale}",encodeURIComponent(locale)).replace("{+locale}",locale)
};
self.LOCALE_DEFAULT="en";
self.PSEUDO_LANGUAGE="zz";
self.PSEUDO_PATTERN_KEY="_pseudoPattern_";
self.init=function(config){config=config||{};
this.setLocale(config.locale);
this.setUrlPrefix(config.urlPrefix);
this.setUrlSuffix(config.urlSuffix)
};
self.setLocale=function(locale){if(!locale){return
}manualLocale=locale
};
self.getLocale=function(){if($.isFunction(manualLocale)){manualLocale=manualLocale()
}return manualLocale||document.documentElement.lang||self.LOCALE_DEFAULT
};
self.setUrlPrefix=function(prefix){if(!prefix){return
}urlPrefix=prefix;
manualDictionary=true
};
self.setUrlSuffix=function(suffix){if(!suffix){return
}urlSuffix=suffix;
manualDictionary=true
};
self.getDictionary=function(locale){locale=locale||self.getLocale();
if(!dicts[locale]){pseudoTranslations=(locale.indexOf(self.PSEUDO_LANGUAGE)===0);
try{var response=$.ajax(getDictionaryUrl(locale),{async:false,dataType:"json"});
dicts[locale]=$.parseJSON(response.responseText)
}catch(e){}if(!dicts[locale]){dicts[locale]={}
}}return dicts[locale]
};
self.get=function(text,snippets,note){var dict;
var newText;
var lookupText;
dict=self.getDictionary();
lookupText=pseudoTranslations?self.PSEUDO_PATTERN_KEY:note?text+" (("+note+"))":text;
if(dict){newText=dict[lookupText]
}if(!newText){newText=text
}if(pseudoTranslations){newText=newText.replace("{string}",text).replace("{comment}",note?note:"")
}return util.patchText(newText,snippets)
};
self.getVar=function(text,note){if(!text){return null
}return self.get(text,null,note)
};
self.getLanguages=function(){if(!languages){try{var json=http.eval("/libs/wcm/core/resources/languages.overlay.infinity.json");
$.each(json,function(name,lang){if(lang.language){lang.title=self.getVar(lang.language)
}if(lang.title&&lang.country&&lang.country!=="*"){lang.title+=" ("+self.getVar(lang.country)+")"
}});
languages=json
}catch(e){languages={}
}}return languages
};
self.parseLocale=function(langCode){if(!langCode){return null
}var pos=langCode.indexOf("_");
if(pos<0){pos=langCode.indexOf("-")
}var language;
var country;
if(pos<0){language=langCode;
country=null
}else{language=langCode.substring(0,pos);
country=langCode.substring(pos+1)
}return{code:langCode,language:language,country:country}
};
return self
}())
}(document,Granite,Granite.Util,Granite.HTTP,jQuery));
(function(a){if(typeof module==="object"&&module.exports){module.exports=a(require("jquery"))
}else{var b=window.Granite=window.Granite||{};
b.TouchIndicator=a(window.jQuery)
}}(function(d){var b={visibility:"hidden",position:"absolute",width:"30px",height:"30px","-webkit-border-radius":"20px","border-radius":"20px",border:"5px solid orange","-webkit-user-select":"none","user-select":"none",opacity:"0.5","z-index":"2000","pointer-events":"none"};
var c={};
var a=[];
return{debugWithMouse:false,init:function(){var e=this;
var f=".touchindicator";
d(document).on("touchstart"+f+"touchmove"+f+"touchend"+f,function(h){var g=h.originalEvent.touches;
e.update(g);
return true
});
if(this.debugWithMouse){d(document).on("mousemove"+f,function(g){g.identifer="fake";
e.update([g]);
return true
})
}},update:function(h){var f={};
for(var g=0;
g<h.length;
g++){var k=h[g];
var j=k.identifier;
var e=c[j];
if(!e){e=a.pop();
if(!e){e=d(document.createElement("div")).css(b);
d("body").append(e)
}}f[j]=e;
e.offset({left:k.pageX-20,top:k.pageY-20});
e.css("visibility","visible")
}for(j in c){if(c.hasOwnProperty(j)&&!f[j]){e=c[j];
e.css("visibility","hidden");
a.push(e)
}}c=f
}}
}));
(function(a,b){a.OptOutUtil=(function(){var c={};
var d=[];
var e=[];
c.init=function(f){if(f){d=f.cookieNames?f.cookieNames:d;
e=f.whitelistCookieNames?f.whitelistCookieNames:e
}};
c.getCookieNames=function(){return d
};
c.getWhitelistCookieNames=function(){return e
};
c.isOptedOut=function(){var h=document.cookie.split(";");
for(var g=0;
g<h.length;
g++){var f=h[g];
var j=b.trim(f.split("=")[0]);
if(b.inArray(j,c.getCookieNames())>-1){return true
}}return false
};
c.maySetCookie=function(f){return !(c.isOptedOut()&&b.inArray(f,c.getWhitelistCookieNames())===-1)
};
return c
}())
}(Granite,jQuery));
Granite.OptOutUtil.init(window.GraniteOptOutConfig);
Granite.HTTP.detectContextPath();
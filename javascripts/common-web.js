(function(){var e={pageviewsEventName:"pageviews",inputChangeEventName:"input-changes",clicksEventName:"clicks",formSubmissionsEventName:"form-submissions",callbackTimeout:1000,globalProperties:{page_url:window.location.href,referrer_url:document.referrer}};var f={options:e};f.addGlobalProperties=function(h){$.extend(f.options.globalProperties,h)};f.trackSession=function(m,l){if(typeof(m)!=="string"){m="common_web_guid"}var k=document.cookie.split("; ");var h=null;for(var j=0;j<k.length;j++){cookieParts=k[j].split("=");if(cookieParts[0]===m){h=cookieParts[1];break}}if(h===null){if(typeof(l)==="string"){h=l}else{genSub=function(){return Math.floor((1+Math.random())*65536).toString(16).substring(1)};h=genSub()+genSub()+"-"+genSub()+"-"+genSub()+"-"+genSub()+"-"+genSub()+genSub()+genSub()}expiration_date=new Date();expiration_date.setFullYear(expiration_date.getFullYear()+1);cookie_string=m+"="+h+"; path/; expires="+expiration_date.toGMTString();document.cookie=cookie_string}f.addGlobalProperties({guid:h});return h};f.trackPageview=function(j){var h=f.options.globalProperties;var i=$.extend(true,{},h,a(j));f.Callback(f.options.pageviewsEventName,i)};f.trackClicks=function(i,h){if(typeof i==="undefined"){i=$("a")}$.each(i,function(j,k){$(k).on("click",function(n){var p=f.options.callbackTimeout;var m=g(n,k,h);var o=k.href&&k.target!=="_blank"&&!c(n);var l=function(){};if(o){l=function(){window.location.href=k.href};n.preventDefault();setTimeout(function(){window.location.href=k.href},p)}f.Callback(e.clicksEventName,m,l)})})};f.trackClicksPassive=function(i,h){$.each(i,function(j,k){$(k).on("click",function(m){var l=g(m,k,h);f.Callback(e.clicksEventName,l)})})};f.trackFormSubmissions=function(i,h){if(typeof i==="undefined"){i=$("form")}$.each(i,function(j,k){var m=f.options.callbackTimeout;var l=false;$(k).on("submit",function(p){var o=d(p,k,h);var q=true;var n=function(){};if(q){n=function(){if(!l){l=true;k.submit()}};p.preventDefault();setTimeout(function(){l=true;k.submit()},m)}f.Callback(e.formSubmissionsEventName,o,n)})})};f.trackInputChanges=function(i,h){if(typeof i==="undefined"){i=$("input, textarea, select")}$.each(i,function(j,k){var l=$(k).val();$(k).on("change",function(n){var m=b(n,k,l,h);f.Callback(e.inputChangeEventName,m);l=$(k).val()})})};f.Transformations={eventToProperties:function(i){var h={};h.timestamp=i.timestamp;h.type=i.type;h.metaKey=i.metaKey;return h},elementToProperties:function(j,k){var i=k||{};i.tagName=j.tagName;if(j.tagName==="A"){i.text=j.innerText}$(j.attributes).each(function(m,l){i[l.nodeName]=l.value});var h=$(j).attr("class");if(h){i.classes=h.split(/\s+/)}i.path=$(j).getPath();return i},formElementToProperties:function(h){var i={};i.form_values=$(h).serializeArray();return this.elementToProperties(h,i)},inputElementToProperties:function(j){var i={value:$(j).val()};var h=$(j).closest("form");if(h.size()>0){i.form=this.elementToProperties(h[0])}return this.elementToProperties(j,i)}};function g(m,k,l){var i=f.options.globalProperties;var j=$.extend(true,{},i,a(l,[m,k]));var n={element:f.Transformations.elementToProperties(k,null)};var h={event:f.Transformations.eventToProperties(m)};return $.extend(true,{},j,n,h)}function b(n,l,i,m){var j=f.options.globalProperties;var k=$.extend(true,{},j,a(m,[n,l]));var o={element:f.Transformations.inputElementToProperties(l)};if(i&&i!==""){o.element.previousValue=i}var h={event:f.Transformations.eventToProperties(n)};return $.extend(true,{},k,o,h)}function d(m,k,l){var i=f.options.globalProperties;var j=$.extend(true,{},i,a(l,[m,k]));var n={element:f.Transformations.formElementToProperties(k)};var h={event:f.Transformations.eventToProperties(m)};return $.extend(true,{},j,n,h)}function a(i,h){if(typeof i==="function"){return i.apply(window,h)}else{return i}}function c(h){return h.metaKey||h.altKey||h.ctrlKey||h.shiftKey}jQuery.fn.extend({getPath:function(i){if(typeof i=="undefined"){i=""}if(this.is("html")){return"html"+i}var j=this.get(0).nodeName.toLowerCase();var k=this.attr("id"),h=this.attr("class");if(typeof k!="undefined"){j+="#"+k}if(typeof h!="undefined"){j+="."+h.split(/[\s\n]+/).join(".")}return this.parent().getPath(" > "+j+i)}});f.Keen={Client:null,Debug:false,Callback:function(i,h,j){f.Keen.Client.addEvent(i,h,function(){if(f.Keen.Debug){console.log(i+": "+JSON.stringify(h))}if(j){j()}})},globalProperties:{keen:{addons:[{name:"keen:ip_to_geo",input:{ip:"ip_address"},output:"ip_geo_info"},{name:"keen:ua_parser",input:{ua_string:"user_agent"},output:"parsed_user_agent"},{name:"keen:url_parser",input:{url:"page_url"},output:"parsed_page_url"},{name:"keen:referrer_parser",input:{referrer_url:"referrer_url",page_url:"page_url"},output:"referrer_info"}]},ip_address:"${keen.ip}",user_agent:"${keen.user_agent}"}};window.CommonWeb=f})();
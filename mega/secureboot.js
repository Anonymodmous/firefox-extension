﻿var b_u=0;
var ie9=0;

if (document.location.href.indexOf('preview.mega.co.nz') > -1)
{
	localStorage.staticpath = 'http://preview.mega.co.nz/';
	localStorage.dd=1;
}


if (document.getElementsByTagName('html')[0].className == 'ie8') b_u=true;
else if (document.getElementsByTagName('html')[0].className == 'ie9') ie9=true;

var maintenance=false;
var ua = window.navigator.userAgent.toLowerCase();
var is_chrome_firefox = document.location.protocol === 'chrome:' && document.location.host === 'mega';
function isMobile()
{
	if (is_chrome_firefox) return false;
	mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
	for (var i in mobile) if (ua.indexOf(mobile[i]) > 0) return true;
	return false;
}




if (isMobile() && document.location.hostname == 'mega.co.nz' && (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) && (ua.indexOf('crios') > -1))
{
	if (document.location.hash.substr(0,5) == '#blog' || document.location.hash.substr(0,8) == '#confirm') document.location = 'https://eu.static.mega.co.nz/' + document.location.hash;
	else document.location = 'https://eu.static.mega.co.nz/';		
	stopexecute();
}

if (ua.indexOf('chrome') > -1 && ua.indexOf('mobile') == -1 && parseInt(window.navigator.appVersion.match(/Chrome\/(\d+)\./)[1], 10) < 22) b_u = 1;
else if (ua.indexOf('firefox') > -1 && typeof DataView == 'undefined') b_u = 1;
else if (ua.indexOf('opera') > -1 && typeof window.webkitRequestFileSystem == 'undefined') b_u = 1;
var myURL = window.URL || window.webkitURL;
if (!myURL) b_u=1;

var firefoxv = '2.0.0';

if (b_u) document.location = 'update.html';

try
{
	if (is_chrome_firefox)
	{
		var Cc = Components.classes, Ci = Components.interfaces, Cu = Components.utils;

		Cu['import']("resource://gre/modules/Services.jsm");
		Cu['import']("resource://gre/modules/NetUtil.jsm");

		(function(global) {
			global.loadSubScript = function(file,scope) {
				Services.scriptloader.loadSubScript(file,scope||global);
			};
		})(this);

		try {
			var mozBrowserID =
			[	Services.appinfo.vendor,
				Services.appinfo.name,
				Services.appinfo.platformVersion,
				Services.appinfo.platformBuildID,
				Services.appinfo.OS,
				Services.appinfo.XPCOMABI].join(" ");

			loadSubScript('chrome://mega/content/strg.js');

			if(!(localStorage instanceof Ci.nsIDOMStorage)) {
				throw new Error('Initialization failed.');
			}
		} catch(e) {
			alert('Error setting up DOM Storage instance:\n\n'
				+ e + '\n\n' + mozBrowserID);

			throw new Error("FxEx");
		}
	}
	if (typeof localStorage == 'undefined')
	{
	  b_u = 1;
	  var staticpath = 'https://eu.static.mega.co.nz/';
	}
	else
	{
		var staticpath = localStorage.staticpath || 'https://eu.static.mega.co.nz/';
		var apipath = localStorage.apipath || 'https://eu.api.mega.co.nz/';

		var contenterror = 0;
		var nocontentcheck = localStorage.dd;
	}
}
catch(e)
{
	if(e.message != 'FxEx') {
		alert('Your browser does not allow data to be written. Please make sure you use default browser settings.');
	}
	b_u = 1;
	var staticpath = 'https://eu.static.mega.co.nz/';
}
var bootstaticpath = staticpath;
var urlrootfile = '';
if (document.location.href.substr(0,19) == 'chrome-extension://')
{
	bootstaticpath = chrome.extension.getURL("mega/");
	urlrootfile = 'mega/secure.html';
	//nocontentcheck=true;
}

if (is_chrome_firefox)
{
	bootstaticpath = 'chrome://mega/content/';
	urlrootfile = 'secure.html';
	nocontentcheck=true;

	staticpath = 'https://eu.static.mega.co.nz/';

	if(!b_u) try {
		loadSubScript(bootstaticpath + 'fileapi.js');
	} catch(e) {
		b_u = 1;
		Cu.reportError(e);
		alert('Unable to initialize core functionality:\n\n'
			+ e + '\n\n' + mozBrowserID);
	}
}

window.URL = window.URL || window.webkitURL;

var ln ={}; ln.en = 'English'; ln.cn = '简体中文';  ln.ct = '中文繁體'; ln.ru = 'Pусский'; ln.es = 'Español'; ln.fr = 'Français'; ln.de = 'Deutsch'; ln.it = 'Italiano'; ln.br = 'Português Brasil'; ln.mi = 'Māori'; ln.vn = 'Tiếng Việt'; ln.nl = 'Nederlands'; ln.kr = '한국어';   ln.ar = 'العربية'; ln.jp = '日本語'; ln.pt = 'Português'; ln.he = 'עברית'; ln.pl = 'Polski'; ln.ca = 'Català'; ln.eu = 'Euskara'; ln.sk = 'Slovenský'; ln.af = 'Afrikaans'; ln.cz = 'Čeština'; ln.ro = 'Română'; ln.fi = 'Suomi'; ln.no = 'Norsk'; ln.se = 'Svenska'; ln.bs = 'Bosanski'; ln.hu = 'Magyar'; ln.sr = 'српски'; ln.dk = 'Dansk'; ln.sl = 'Slovenščina'; ln.tr = 'Türkçe'; ln.sq = 'Shqipe'; ln.id = 'Indonesia';  ln.hr = 'Hrvatski';  ln.el = 'ελληνικά'; ln.uk = 'Українська'; ln.gl = 'Galego'; ln.sr = 'српски'; ln.lt = 'Lietuvos'; ln.th = ' ภาษาไทย'; ln.et = 'Eesti'; ln.lv = 'Latviešu'; ln.bg = 'български';

//ln.uz = 'Ўзбек';
//ln.mk = 'македонски';

var ln2 ={}; ln2.en = 'English'; ln2.cn = 'Chinese';  ln2.ct = 'Traditional Chinese'; ln2.ru = 'Russian'; ln2.es = 'Spanish'; ln2.fr = 'French'; ln2.de = 'German'; ln2.it = 'Italian'; ln2.br = 'Brazilian Portuguese'; ln2.mi = 'Maori'; ln2.vn = 'Vietnamese'; ln2.nl = 'Dutch'; ln2.kr = 'Korean';   ln2.ar = 'Arabic'; ln2.jp = 'Japanese'; ln2.pt = 'Portuguese'; ln2.he = 'Hebrew'; ln2.pl = 'Polish'; ln2.ca = 'Catalan'; ln2.eu = 'Basque'; ln2.sk = 'Slovak'; ln2.af = 'Afrikaans'; ln2.cz = 'Czech'; ln2.ro = 'Romanian'; ln2.fi = 'Finnish'; ln2.no = 'Norwegian'; ln2.se = 'Swedish'; ln2.bs = 'Bosnian'; ln2.hu = 'Hungarian'; ln2.sr = 'Serbian'; ln2.dk = 'Danish'; ln2.sl = 'Slovenian'; ln2.tr = 'Turkish'; ln2.sq = 'Albanian'; ln2.id = 'Indonesian'; ln2.hr = 'Croatian'; ln2.el = 'Greek'; ln2.uk = 'Ukrainian'; ln2.gl = 'Galician'; ln2.sr = 'Serbian'; ln2.lt = 'Lithuanian'; ln2.th = 'Thai'; ln2.et = 'Estonian'; ln2.lv = 'Latvian'; ln2.bg = 'Bulgarian';

//ln2.uz = 'Uzbek';
//ln2.mk = 'Macedonian';

var sjcl_sha_js = 'var sjcl_sha={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message};this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message};this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message};this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message};this.message=a}}};if(typeof module!="undefined"&&module.exports)module.exports=sjcl_sha;sjcl_sha.bitArray={bitSlice:function(a,b,c){a=sjcl_sha.bitArray.g(a.slice(b/32),32-(b&31)).slice(1);return c===undefined?a:sjcl_sha.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return((b+c-1^b)&-32?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(a.length===0||b.length===0)return a.concat(b);var c=a[a.length-1],d=sjcl_sha.bitArray.getPartial(c);return d===32?a.concat(b):sjcl_sha.bitArray.g(b,d,c|0,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;if(b===0)return 0;return(b-1)*32+sjcl_sha.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(a.length*32<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;b&=31;if(c>0&&b)a[c-1]=sjcl_sha.bitArray.partial(b,a[c-1]&2147483648>>b-1,1);return a},partial:function(a,b,c){if(a===32)return b;return(c?b|0:b<<32-a)+a*0x10000000000},getPartial:function(a){return Math.round(a/0x10000000000)||32},equal:function(a,b){if(sjcl_sha.bitArray.bitLength(a)!==sjcl_sha.bitArray.bitLength(b))return false;var c=0,d;for(d=0;d<a.length;d++)c|=a[d]^b[d];return c===0},g:function(a,b,c,d){var e;e=0;if(d===undefined)d=[];for(;b>=32;b-=32){d.push(c);c=0}if(b===0)return d.concat(a);for(e=0;e<a.length;e++){d.push(c|a[e]>>>b);c=a[e]<<32-b}e=a.length?a[a.length-1]:0;a=sjcl_sha.bitArray.getPartial(e);d.push(sjcl_sha.bitArray.partial(b+a&31,b+a>32?c:d.pop(),1));return d},i:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}};sjcl_sha.codec.utf8String={fromBits:function(a){var b="",c=sjcl_sha.bitArray.bitLength(a),d,e;for(d=0;d<c/8;d++){if((d&3)===0)e=a[d/4];b+=String.fromCharCode(e>>>24);e<<=8}return decodeURIComponent(escape(b))},toBits:function(a){var b=[],c,d=0,e;for(c=0;c<a.length;c++){e=a.charCodeAt(c);if(e&-256)return false;d=d<<8|e;if((c&3)===3){b.push(d);d=0}}c&3&&b.push(sjcl_sha.bitArray.partial(8*(c&3),d));return b}};sjcl_sha.hash.sha256=function(a){this.d[0]||this.h();if(a){this.c=a.c.slice(0);this.b=a.b.slice(0);this.a=a.a}else this.reset()};sjcl_sha.hash.sha256.hash=function(a){return(new sjcl_sha.hash.sha256).update(a).finalize()};sjcl_sha.hash.sha256.prototype={blockSize:512,reset:function(){this.c=this.f.slice(0);this.b=[];this.a=0;return this},update:function(a){if(typeof a==="string"&&!(a=sjcl_sha.codec.utf8String.toBits(a)))return[];var b,c=this.b=sjcl_sha.bitArray.concat(this.b,a);b=this.a;a=this.a=b+sjcl_sha.bitArray.bitLength(a);for(b=512+b&-512;b<=a;b+=512)this.e(c.splice(0,16));return this},finalize:function(){var a,b=this.b,c=this.c;b=sjcl_sha.bitArray.concat(b,[sjcl_sha.bitArray.partial(1,1)]);for(a=b.length+2;a&15;a++)b.push(0);b.push(Math.floor(this.a/4294967296));for(b.push(this.a|0);b.length;)this.e(b.splice(0,16));this.reset();return c},f:[],d:[],h:function(){function a(e){return(e-Math.floor(e))*0x100000000|0}var b=0,c=2,d;a:for(;b<64;c++){for(d=2;d*d<=c;d++)if(c%d===0)continue a;if(b<8)this.f[b]=a(Math.pow(c,0.5));this.d[b]=a(Math.pow(c,1/3));b++}},e:function(a){var b,c,d=a.slice(0),e=this.c,n=this.d,l=e[0],f=e[1],h=e[2],j=e[3],g=e[4],k=e[5],i=e[6],m=e[7];for(a=0;a<64;a++){if(a<16)b=d[a];else{b=d[a+1&15];c=d[a+14&15];b=d[a&15]=(b>>>7^b>>>18^b>>>3^b<<25^b<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+d[a&15]+d[a+9&15]|0}b=b+m+(g>>>6^g>>>11^g>>>25^g<<26^g<<21^g<<7)+(i^g&(k^i))+n[a];m=i;i=k;k=g;g=j+b|0;j=h;h=f;f=l;l=b+(f&h^j&(f^h))+(f>>>2^f>>>13^f>>>22^f<<30^f<<19^f<<10)|0}e[0]=e[0]+l|0;e[1]=e[1]+f|0;e[2]=e[2]+h|0;e[3]=e[3]+j|0;e[4]=e[4]+g|0;e[5]=e[5]+k|0;e[6]=e[6]+i|0;e[7]=e[7]+m|0}}; function sha256(d) { h = new sjcl_sha.hash.sha256(); for (var i = 0; i < d.length; i += 131072) h = h.update(d.substr(i,131072)); return h.finalize(); }';

function evalscript(text)
{
	var script = document.createElement('script');
	script.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(script);
	script.text = text;
}

function evalscript_url(jarray)
{
	try
	{
		var blob = new Blob(jarray, { type: "text/javascript" });
	}
	catch(e)
	{
		window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
		var bb = new BlobBuilder();
		for (var i in jarray) bb.append(jarray[i]);
		var blob = bb.getBlob('text/javascript');
	}
	var script = document.createElement('script');
	script.type = "text/javascript";
	document.getElementsByTagName('head')[0].appendChild(script);
	var url = window.URL.createObjectURL(blob);
	script.src = url;
	return url;
}

if (!nocontentcheck)
{
	if (window.URL) evalscript_url([sjcl_sha_js]);
	else evalscript(sjcl_sha_js);
}

var sh = [];
var sh1 = [];
var lv = [];
sh1['lang/af_4.json'] = [717594886,585335397,1318040459,173654742,-415967596,158910721,-853355968,-337464650];
sh1['lang/ar_5.json'] = [-548354204,-1467422981,1628750956,-448918535,-1643778055,1458657542,-826766961,-1682075876];
sh1['lang/bg_4.json'] = [1540611785,400438402,1546632718,-1758291875,568361187,1173969649,-1308989112,-1738929271];
sh1['lang/br_5.json'] = [-335103857,1487109743,1626450738,1110742241,-2130697471,-1658833117,-2063489094,-1718251042];
sh1['lang/bs_4.json'] = [467574717,413412821,-1797970584,91060784,677528932,98905898,72722517,-270872443];
sh1['lang/ca_5.json'] = [-1824301094,1621585008,709050541,-523046182,-1977931804,-874964807,318332497,-2059987091];
sh1['lang/cn_4.json'] = [-353354935,-1554555709,114962249,-2031231473,-370916076,-519255018,-1694957786,-204893001];
sh1['lang/ct_6.json'] = [500424806,1760612643,340497524,-616639645,-1306375334,1457797716,1395505178,1146324227];
sh1['lang/cz_8.json'] = [2056137692,-424784296,-2096827303,1322074598,1783757962,-1727070305,48092395,-409955743];
sh1['lang/de_5.json'] = [-1855574353,1252550242,552488327,863170220,132599970,-1023396837,-622189374,-673272190];
sh1['lang/dk_4.json'] = [1302310994,-242587141,677154967,-1418675128,144353727,-947440268,1852110391,1200980843];
sh1['lang/el_6.json'] = [758154910,761427739,-1378886350,-722112904,1403154419,-1855673791,-831484996,1974015493];
sh1['lang/en_5.json'] = [-294935167,-242821257,-1840381024,427432914,185627261,-437836782,213374063,504609762];
sh1['lang/es_7.json'] = [-980999346,539652060,-1020038897,-564615785,-1510497702,-216052711,168718841,-328348256];
sh1['lang/et_4.json'] = [-530515035,-751068895,12646904,-34478044,-1664206301,2072675539,1357832742,2043631206];
sh1['lang/eu_4.json'] = [-1047407117,-28343894,-328233353,601601573,-482250136,-173145391,-1359278444,-2136918581];
sh1['lang/fi_5.json'] = [-909309766,1358911817,1079513773,1214472483,831181324,-1905635244,1461058288,1500504700];
sh1['lang/fr_7.json'] = [-1185046056,-1972469886,-1178094604,-316455406,-2111545915,-2063467290,434955171,-1929578547];
sh1['lang/gl_5.json'] = [1240412696,2021793073,-511892225,-1876637232,443497472,-1845252714,-1665972343,-1581815244];
sh1['lang/he_4.json'] = [-1662266259,1140671235,-1965033016,-1704970841,-318560783,-850576121,-1749358638,-497669646];
sh1['lang/hr_5.json'] = [-1630025465,1254653082,-1332948024,-1191176576,432937974,-1999364919,2017787543,-1485785181];
sh1['lang/hu_6.json'] = [-1285443101,1561764907,-1811751331,424894815,336449662,1696568058,1727006861,1959775103];
sh1['lang/id_5.json'] = [944158486,-2047474545,1195380050,-1362643950,-768141883,-1726308553,1773450152,984095416];
sh1['lang/it_7.json'] = [-151546666,1858741805,-1771248227,-917117591,-1942103188,-715834194,-208420675,403860447];
sh1['lang/jp_6.json'] = [137487817,-1957646604,1172016246,418955349,-391154391,1243654258,205858958,1695425157];
sh1['lang/kr_7.json'] = [-645644846,1593179483,-1479998072,-1430676030,-706077525,782750433,-301765403,837776909];
sh1['lang/lt_4.json'] = [-503532423,-1197560872,1540382146,1391174135,1404730257,-1197406963,665268967,-1832338231];
sh1['lang/lv_6.json'] = [-1515282784,1495020770,-1891396993,-1062530073,-1313941233,-191017878,-1637774594,772129827];
sh1['lang/mi_5.json'] = [125050361,-2022888382,-1289166101,1454475485,1209000246,-1906339156,2098499632,-1954313661];
sh1['lang/nl_4.json'] = [493576794,808190943,-1621900353,2019966297,-1320269684,-1211731190,-419033734,-415333043];
sh1['lang/no_6.json'] = [1905855175,-246487098,1252296772,-1694511482,-369340853,-1482105623,-1602245290,499337243];
sh1['lang/pl_6.json'] = [-1057656839,1853483741,1028515366,-1400025912,1503811923,1626616780,-319718238,905998028];
sh1['lang/pt_4.json'] = [576986052,-1736765191,-1023900613,-1529680196,-1627819992,-1967613916,1986099486,-2073976656];
sh1['lang/ro_6.json'] = [-1322643048,1800429805,-858830045,-1105212099,-686868343,-397079865,-1617478706,1641215833];
sh1['lang/ru_5.json'] = [-1504475984,1704968402,-2082802996,-1200066634,1046077793,-1183712544,-1248512694,-556087097];
sh1['lang/se_5.json'] = [-26122834,-773918950,-1289841468,-1936906483,1211408815,-1596855038,-171466778,-352829022];
sh1['lang/sk_6.json'] = [-897304093,-2046354456,1412082411,-971582460,1928783301,-338561354,988496448,944380561];
sh1['lang/sl_4.json'] = [2086689663,1465298202,-1778105045,515281442,-1577976098,-329957443,489517806,-1614862188];
sh1['lang/sq_5.json'] = [2136828337,-1986233062,2041962379,2094804488,2051660567,-2080267455,1003517671,783822485];
sh1['lang/sr_6.json'] = [-475704148,2134569270,960261316,-1572633040,850105614,-1072342364,912957021,1609047496];
sh1['lang/th_4.json'] = [47417567,448658679,-57732816,762010261,-1599024762,404605230,324952242,1926571399];
sh1['lang/tr_4.json'] = [-383989123,1667026744,-910426804,-374167226,-652564821,-1539377719,-1373943406,-497671040];
sh1['lang/uk_5.json'] = [-1787795918,-1786231498,-1101166234,1638479620,-1231961681,-98672771,803428291,-760850087];
sh1['lang/vn_5.json'] = [-1955091163,-393152663,-284769842,972652233,173105119,-1257596398,767623380,171577881];
sh1['js/crypto_8.js'] = [-2083942981,-352781488,1905141871,1829872565,238924260,-1794021162,-1978802583,719918583];
sh1['js/hex_1.js'] = [-536915967,1050992997,-349767130,933847197,-1115174222,701434549,2060891637,583948869];
sh1['js/functions_4.js'] = [-307767713,488596685,-51054452,1757786365,-191973717,1969390226,1193906061,-322846429];
sh1['sjcl_1.js'] = [-171772505,-264193555,357626960,-1993441797,930271978,2002120912,114344546,1757807051];
sh1['js/rsa_1.js'] = [2001167291,-526423915,1610203002,735871105,-288977147,281057591,529538147,-1392450329];
sh1['js/keygen_1.js'] = [1782191324,1257655688,1757987168,-20394106,600299018,741954078,-1296374862,880480498];
sh1['js/mouse_2.js'] = [704468117,-520233928,1564408184,1625453246,-846587607,-1166411136,1428346823,1399194307];
sh1['js/jquery-min-1_1.8_1.1_1.js'] = [325457984,-43550062,2044894907,922904144,-1468381584,445981752,-632967819,-1006647006];
sh1['js/jquery-ui_1.js'] = [1462813645,450465327,-1041974747,-1180593380,866136131,842776979,1980446596,73731112];
sh1['js/base64_1.js'] = [1377965723,-820855789,-623852925,-619566876,-131428866,-1938828440,320381032,94642301];
sh1['js/filedrag_4.js'] = [1030166352,-1441757272,-1573496023,1550614650,97565169,2102910738,-1068204844,1597819671];
sh1['js/jquery_1.mousewheel_1.js'] = [419443382,498952370,-461812839,-1430788648,-1729264621,-733690579,-26655758,-1219979266];
sh1['js/jquery_1.jscrollpane_1.min_1.js'] = [583598005,462966044,1887098753,-1983543464,-242256649,-1811511069,-672958697,539968991];
sh1['js/mDB_4.js'] = [-1280972677,-329303552,1976366293,-165683391,884499681,-1892368289,1016101620,205237120];
sh1['js/cleartemp_1.js'] = [-1435315431,-504958400,-1299986533,-2131880267,1621215344,-260309969,1783791614,-1041076437];
sh1['js/download_15.js'] = [-1446307874,-298663837,-413021552,963439142,-611447016,-1584741169,2014655995,-1826352428];
sh1['js/upload_10.js'] = [-2103548243,1373775050,1359300510,1306817097,-1725550578,-926943061,951447283,330657911];
sh1['js/thumbnail_2.js'] = [-1374392450,-904154590,1711512951,-526743088,-1976306196,512553139,-765919582,-1125834143];
sh1['js/exif_1.js'] = [2127927006,1524719511,1400765672,1465825710,200238308,-1521506870,-1440098631,1093047888];
sh1['js/megapix_1.js'] = [-2074411783,2020004429,1567898609,1572790112,1765406939,1129455141,-1408675606,376735130];
sh1['js/user_2.js'] = [2044887248,-344935328,930620334,262271192,-465133229,1405603524,965941236,-2030823455];
sh1['js/mega_28.js'] = [1815700905,-1064450070,544157312,106600357,-280026735,1738913579,-1130336393,1616737508];
sh1['js/fm_28.js'] = [-2044665835,-1047843111,2032729435,1208058703,2076287828,1147081373,2125609573,-15002147];
sh1['js/filetypes_2.js'] = [-1917187443,-457112069,-524491192,1551179979,-685045582,-1956517230,1113761487,292075913];
sh1['index_11.js'] = [-673104044,1243160959,857563367,-2146819281,1509131634,-700495763,1850506720,275515807];
sh1['html/start_1.html'] = [-115483490,-1988371591,623765306,1373860361,-1360669345,-1736966814,1562448017,152309359];
sh1['html/megainfo_1.html'] = [1283161678,-378542460,-1112156493,-1449961420,-1938669644,1416380795,-1948258844,296655369];
sh1['html/js/start_2.js'] = [-592492848,375152620,-791072191,910951958,-436683953,-391896453,723058460,-1878099312];
sh1['html/bottom2_1.html'] = [-964138930,-483821979,843200327,631311603,521726985,-241711007,1244894497,-1668791946];
sh1['html/key_1.html'] = [2073871108,-1170173593,-1681422239,-1612935810,292954242,1935183806,1529842427,-1432697760];
sh1['html/js/key_1.js'] = [-189079361,-607572500,-1700213714,-1617472324,978540679,412066146,-1558174918,-1753270867];
sh1['html/pro_2.html'] = [854823061,-1460397308,-1096249573,525392674,1328205941,-828110322,-1229861903,-2047293783];
sh1['html/js/pro_2.js'] = [1800282821,1767088810,1739562962,-836516463,-947293395,1018225766,1253095211,1187883723];
sh1['html/login_1.html'] = [-323140112,2000331877,549652845,1191881735,-1414747763,-1634455397,-2027137434,192521104];
sh1['html/js/login_1.js'] = [705215750,1492569094,316818685,1730603368,-1401228850,1022674831,1488664594,-276404406];
sh1['html/fm_8.html'] = [-53439873,-823057776,99044206,1580798813,1839686632,-1318930820,2073908699,-1610077388];
sh1['html/top_2.html'] = [-1770478820,1726274722,-2114972594,2103677983,517685593,-408565231,-1906509990,-68966292];
sh1['js/notifications_3.js'] = [1040041020,559125891,2048731207,582260029,-455379405,-2062711449,-604434972,957094856];
sh1['js/json_1.js'] = [260740289,1366618322,-425421514,1426645344,1815060041,-1445234843,-570158005,-1264018126];
sh1['css/style_18.css'] = [-1828788244,2100186008,-1205083117,1787723372,1691551049,515670613,-578740460,317892804];
sh1['js/avatar_2.js'] = [750148219,282183943,-583076708,810613429,1535288862,295436910,-1599455014,-411830628];
sh1['js/countries_2.js'] = [1973408522,-1885123014,1906882822,1317148523,-429735077,79175436,-407854214,1471385004];
sh1['html/dialogs_8.html'] = [-267926680,-721438904,-1207214589,132657065,1318816191,-408185509,-1007992060,625325180];
sh1['html/transferwidget_1.html'] = [-216975656,-1571397997,-554252428,-1729669574,-889100419,-1745475319,-1947087299,913285129];
sh1['js/checkboxes_1.js'] = [-195352914,863026783,-2091572807,-1241952814,1783587100,-1585752649,789053172,-1960773071];
sh1['js/zip_1.js'] = [-1618111477,-1761114523,-343688170,1955237114,-58685565,-323072713,-1209908562,1215236581];
sh1['html/about_2.html'] = [-1806016046,1171897330,2079572880,378215644,-481932025,-297264830,574489840,-516500631];
sh1['html/blog_1.html'] = [1453324238,23247104,-274962730,2125218305,-1007634292,-1966696579,1809666485,2006232635];
sh1['html/js/blog_7.js'] = [-289889618,-1722229852,-421875334,1890404008,1254547116,1519943409,-74069419,-1034264809];
sh1['html/blogarticle_1.html'] = [514255285,-305518940,-736361270,-1089096585,807920439,-1691607347,-1360211852,331878126];
sh1['html/js/blogarticle_1.js'] = [1749908144,268653485,1111265580,-1918305290,-1989480138,-275610585,-258647333,-1927257643];
sh1['html/register_1.html'] = [-1153226879,789196380,513797998,-1455035350,-1267405269,-1114290361,-510053649,1808415441];
sh1['html/js/register_2.js'] = [-1645064455,-2124496162,1619428351,-821412969,708818589,-1665689827,2140310774,941551808];
sh1['html/android_35.html'] = [-474954686,-1728308204,-1694763832,-1720731356,665731556,1687917388,-1533699813,2018687061];
sh1['html/forgotpassword_4.html'] = [-474954686,-1728308204,-1694763832,-1720731356,665731556,1687917388,-1533699813,2018687061];
sh1['html/js/forgotpassword_4.js'] = [-474954686,-1728308204,-1694763832,-1720731356,665731556,1687917388,-1533699813,2018687061];
sh1['html/resellers_2.html'] = [-999964763,101863191,1332861546,967598187,-1759566181,1424163260,895328359,-1115153998];
sh1['html/download_2.html'] = [1163192674,189424184,1017640677,-1720103659,1399892849,723965584,-527969565,325437591];
sh1['html/js/download_5.js'] = [558460166,-710427324,1782763874,536849699,2000525783,727195827,-842843336,-400442625];
sh1['html/copyright_1.html'] = [-1356115298,204388844,1433799516,1808859064,1547511974,1218829359,791662145,330338831];
sh1['html/copyrightnotice_2.html'] = [2145667044,-154231214,2034877807,-1128384234,-1416518879,-436127618,1781667026,1515564098];
sh1['html/js/copyrightnotice_1.js'] = [1973579369,329527753,-390047352,1474663949,-222071641,889758868,955457139,-1296592009];
sh1['html/privacy_1.html'] = [-1306903122,1121626582,-131561918,2030506582,-1212117415,661170141,-2091853461,-67213485];
sh1['html/terms_1.html'] = [-34273725,1778536335,-1929367173,609688965,-1887772001,-1603517551,-1148230796,518199998];
sh1['html/credits_2.html'] = [-93209830,1787816001,1947296144,-993677008,-864037760,265442585,717054271,1195813928];
sh1['html/takedown_13.html'] = [-2025118690,-837363395,-477625893,-140093906,952149041,1430884073,2136655707,424966047];
sh1['html/dev_1.html'] = [1732632856,189977356,-2090647731,966313756,-172320705,-2097569904,-1732212604,-296379577];
sh1['js/arkanoid_1.js'] = [1142088038,-111380889,1851124971,-135552288,979716897,-676254465,-315264165,-6027613];
sh1['html/js/dev_1.js'] = [-467451688,1492882892,-1501648081,-2129952605,808295402,-1866184681,408148389,1885732291];
sh1['html/sdkterms_1.html'] = [1669566617,-1346571009,986996208,-1504544944,-1897148801,-2111140473,-461617071,1424404842];
sh1['html/help_1.html'] = [1007983405,1164966407,778291426,42410635,-126766717,-1813411497,-2005454766,-260283470];
sh1['html/js/help_4.js'] = [2014671135,-84543797,-378087936,-1195234953,-1362899655,-361190743,-1960231990,987148564];
sh1['html/firefox_1.html'] = [1269940382,-2014144920,485363891,-726217767,-1040783327,1453164378,-554814229,1924716537];
sh1['html/sync_1.html'] = [-449633026,-1292014254,-990701586,-598443758,798589485,1799246001,-61131538,-1510258349];
sh1['html/mobile_4.html'] = [1336604280,-1950368257,-920035069,579992413,-274621194,163579540,1925126089,-471418799];
sh1['html/affiliates_1.html'] = [336401600,1693520652,1735292706,-1209900216,563312832,-1571723333,-1431169166,1080433821];
sh1['html/js/affiliate_1.js'] = [-2083445994,-813363093,1773568937,-2058604050,-2131904228,1402769154,442423551,-1045573347];
sh1['html/affiliateterms_1.html'] = [-1570316327,-322124229,694130498,-1574459080,-1017936673,73113243,199122537,5117026];
sh1['html/affiliatesignup_1.html'] = [734026302,197767156,1436683326,449956816,-1415964264,-1601297598,1776887966,-1299476598];
sh1['html/js/affiliatesignup_1.js'] = [-1091489157,-711569703,-1636008514,-37060378,-539405765,-1457658441,1883618317,1782245887];
sh1['html/affiliatemember_1.html'] = [1601808811,313776287,1596829015,1134644154,1269202501,-1157161540,-663590146,-1738922501];
sh1['html/js/affiliatemember_1.js'] = [-1278843415,506284087,2081010563,774457594,544631482,-1791500546,-1384373468,-1964062573];
sh1['html/contact_1.html'] = [-1382742274,1300319458,206728859,-1170995210,1198771720,-445698841,1486152712,830617221];
sh1['html/privacycompany_1.html'] = [1175830790,-1413085504,1468710126,-2063138483,-1243958029,1190665830,-910909719,-1573573964];
sh1['html/resellerapp_1.html'] = [-1289875384,1112459579,493352325,1495092512,1830359644,920857722,-260020038,-694209961];
sh1['html/js/resellerapp_1.js'] = [690390514,1402692817,-1160749280,1578639149,-1734342779,-1387045497,-755540821,-1791697279];
sh1['html/resellerintro_1.html'] = [-1439407084,313440834,2041007158,-443877117,1071363056,-2021618866,1989604434,-1138587370];
sh1['html/chrome_2.html'] = [-347821515,-1397980566,33057728,-2051075063,-1990706037,1075103272,-192759083,381134292];
sh1['js/zxcvbn_1.js'] = [1907398498,1848592788,1411956507,1246445933,2076594788,857342092,1344967799,-1627795893];
sh1['js/stacktrace_1.js'] = [-1025805761,-1999209892,-1583561296,-1745892906,2039612691,-450812105,620387593,1803216222];
sh1['js/contrib/Int64_1.js'] = [-474954686,-1728308204,-1694763832,-1720731356,665731556,1687917388,-1533699813,2018687061];
sh1['js/zip64_1.js'] = [-1382470091,1492632996,17854203,109804124,2023898952,-1415264647,1730166649,-892740231];
sh1['js/Int64_1.js'] = [330399955,-280329828,1808976155,959951348,854614113,-953413151,2112686117,86892661];
lv['af'] = 4;
lv['ar'] = 5;
lv['bg'] = 4;
lv['br'] = 5;
lv['bs'] = 4;
lv['ca'] = 5;
lv['cn'] = 4;
lv['ct'] = 6;
lv['cz'] = 8;
lv['de'] = 5;
lv['dk'] = 4;
lv['el'] = 6;
lv['en'] = 5;
lv['es'] = 7;
lv['et'] = 4;
lv['eu'] = 4;
lv['fi'] = 5;
lv['fr'] = 7;
lv['gl'] = 5;
lv['he'] = 4;
lv['hr'] = 5;
lv['hu'] = 6;
lv['id'] = 5;
lv['it'] = 7;
lv['jp'] = 6;
lv['kr'] = 7;
lv['lt'] = 4;
lv['lv'] = 6;
lv['mi'] = 5;
lv['nl'] = 4;
lv['no'] = 6;
lv['pl'] = 6;
lv['pt'] = 4;
lv['ro'] = 6;
lv['ru'] = 5;
lv['se'] = 5;
lv['sk'] = 6;
lv['sl'] = 4;
lv['sq'] = 5;
lv['sr'] = 6;
lv['th'] = 4;
lv['tr'] = 4;
lv['uk'] = 5;
lv['vn'] = 5;

function cmparrays(a,b)
{
	if (a.length != b.length) return false;
	for (var i = a.length; i--; ) if (a[i] != b[i]) return false;
	return true;
}

var androidsplash = false;
var m = false;
var seqno = Math.ceil(Math.random()*1000000000);
if (isMobile() || (typeof localStorage !== 'undefined' && localStorage.mobile))
{
	var tag=document.createElement('meta');
	tag.name = "viewport";
	tag.content = "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0";
	document.getElementsByTagName('head')[0].appendChild(tag);
	var tag=document.createElement('meta');
	tag.name = "apple-mobile-web-app-capable";
	tag.content = "yes";
	document.getElementsByTagName('head')[0].appendChild(tag);
	var tag=document.createElement('meta');
	tag.name = "apple-mobile-web-app-status-bar-style";
	tag.content = "black";
	document.getElementsByTagName('head')[0].appendChild(tag);
	var tag=document.createElement('link');
	tag.rel = "apple-touch-icon-precomposed";
	tag.sizes = "144x144";
	tag.href = staticpath + "images/mobile/App_ipad_144x144.png";
	document.getElementsByTagName('head')[0].appendChild(tag);
	var tag=document.createElement('link');
	tag.rel = "apple-touch-icon-precomposed";
	tag.sizes = "114x114";
	tag.href = staticpath + "images/mobile/App_iphone_114x114.png";
	document.getElementsByTagName('head')[0].appendChild(tag);
	var tag=document.createElement('link');
	tag.rel = "apple-touch-icon-precomposed";
	tag.sizes = "72x72";
	tag.href = staticpath + "images/mobile/App_ipad_72X72.png";
	document.getElementsByTagName('head')[0].appendChild(tag);
	var tag=document.createElement('link');
	tag.rel = "apple-touch-icon-precomposed";
	tag.href = staticpath + "images/mobile/App_iphone_57X57.png"
	document.getElementsByTagName('head')[0].appendChild(tag);
	var tag=document.createElement('link');
	tag.rel = "shortcut icon";
	tag.type = "image/vnd.microsoft.icon";
	tag.href = "https://mega.co.nz/favicon.ico";
	document.getElementsByTagName('head')[0].appendChild(tag);
	m=true;
}
var silent_loading=false;


if (m)
{
	var app,mobileblog,android,ios;
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.type = 'text/css';
	link.href = staticpath + 'css/mobile-app.css';
	document.head.appendChild(link);
	document.body.innerHTML = '<div class="main-scroll-block"> <div class="main-content-block"> <div class="free-green-tip"></div><div class="main-centered-bl"><div class="main-logo"></div><div class="main-head-txt" id="m_title"></div><div class="main-txt" id="m_desc"></div><a href="" class="main-button" id="m_appbtn"></a><div class="main-social hidden"><a href="https://www.facebook.com/MEGAprivacy" class="main-social-icon facebook"></a><a href="https://www.twitter.com/MEGAprivacy" class="main-social-icon twitter"></a><div class="clear"></div></div></div> </div><div class="scrolling-content"><div class="mid-logo"></div> <div class="mid-gray-block">MEGA provides free cloud storage with convenient and powerful always-on privacy </div> <div class="scrolling-block-icon encription"></div> <div class="scrolling-block-header"> End-to-end encryption </div> <div class="scrolling-block-txt">Unlike other cloud storage providers, your data is encrypted & decrypted during transfer by your client devices only and never by us. </div> <div class="scrolling-block-icon access"></div> <div class="scrolling-block-header"> Secure Global Access </div> <div class="scrolling-block-txt">Your data is accessible any time, from any device, anywhere. Only you control the keys to your files.</div> <div class="scrolling-block-icon colaboration"></div> <div class="scrolling-block-header"> Secure Collaboration </div> <div class="scrolling-block-txt">Share folders with your contacts and see their updates in real time. Online collaboration has never been more private and secure.</div> <div class="bottom-menu full-version"><div class="copyright-txt">Mega Limited 2013</div><div class="language-block"></div><div class="clear"></div><iframe src="" width="1" height="1" frameborder="0" style="width:1px; height:1px; border:none;" id="m_iframe"></iframe></div></div></div>';
	if (window.location.hash.substr(1,4) == 'blog') mobileblog=1;
	if (ua.indexOf('android') > -1)
	{
		app='https://play.google.com/store/apps/details?id=com.flyingottersoftware.mega';
		document.body.className = 'android full-mode supported';
		android=1;
	}
	else if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1)
	{
		app='https://itunes.apple.com/app/mega/id706857885';
		document.body.className = 'ios full-mode supported';
		document.getElementById('m_desc').innerHTML = 'Free 50 GB - End-to-end encryption';
		ios=1;
	}
	else document.body.className = 'another-os full-mode unsupported';
	if (app)
	{
		document.getElementById('m_appbtn').href = app;
		document.getElementById('m_title').innerHTML = 'Install the free MEGA app';
	}
	else
	{
		document.getElementById('m_title').innerHTML = 'A dedicated app for your device will be available soon.';
		document.getElementById('m_desc').innerHTML = 'Follow us on Twitter or Facebook for updates.';
	}
	if (window.location.hash.substr(1,1) == '!')
	{
		if (app) document.getElementById('m_title').innerHTML = 'Install the free MEGA app to access this file from your mobile';
		if (ua.indexOf('chrome') > -1)
		{
			setTimeout(function()
			{
				if (confirm('Do you already have the MEGA app installed?')) document.location = 'mega://' + window.location.hash;
			},2500);
		}
		else document.getElementById('m_iframe').src = 'mega://' + window.location.hash;
	}
	else if (window.location.hash.substr(1,7) == 'confirm')
	{
		var i=0;
		if (ua.indexOf('iphone') > -1 || ua.indexOf('ipad') > -1 || ua.indexOf('ipod') > -1) i=1;
		if (ua.indexOf('chrome') > -1) window.location ='mega://' + window.location.hash.substr(i);
		else document.getElementById('m_iframe').src = 'mega://' + window.location.hash.substr(i);
	}
	if (mobileblog)
	{
		document.body.innerHTML = '';
		var script = document.createElement('script');
		script.type = "text/javascript";
		document.head.appendChild(script);
		script.src = 'https://mega.co.nz/blog.js';
	}
}
else if (document.location.hash == '#android')
{
	document.location = 'https://play.google.com/store/apps/details?id=com.flyingottersoftware.mega';
}
else
{
	if (!b_u)
	{
		if (typeof console == "undefined") { this.console = {log: function() {}};}
		var d = localStorage.d || 0;
		var jj = localStorage.jj || 0;
		var languages = {'en':['en','en-'],'es':['es','es-'],'fr':['fr','fr-'],'de':['de','de-'],'it':['it','it-'],'nl':['nl','nl-'],'pt':['pt'],'br':['pt-br'],'dk':['da'],'se':['sv'],'fi':['fi'],'no':['no'],'el':['el'],'pl':['pl'],'cz':['cz','cz-'],'sk':['sk','sk-'],'sl':['sl','sl-'],'hu':['hu','hu-'],'jp':['ja'],'cn':['zh','zh-cn'],'ct':['zh-hk','zh-sg','zh-tw'],'kr':['ko'],'vn':['vi'],'ru':['ru','ru-mo'],'ar':['ar','ar-'],'he':['he'],'mi':['maori'],'id':['id'],'ca':['ca','ca-'],'eu':['eu','eu-'],'af':['af','af-'],'bs':['bs','bs-'],'sg':[],'uz':[],'tr':['tr','tr-'],'sq':[],'mk':[],'hi':[],'hr':['hr'],'ro':['ro','ro-'],'sq':['||'],'uk':['||'],'gl':['||'],'sr':['||'],'lt':['||'],'th':['||'],'et':['||'],'lv':['||'],'bg':['||']};
		function detectlang()
		{
			return 'en';
			if (!navigator.language) return 'en';
			var bl = navigator.language.toLowerCase();
			var l2 = languages;
			for (var l in l2) for (b in l2[l]) if (l2[l][b] == bl) return l;
			for (var l in l2) for (b in l2[l]) if (l2[l][b].substring(0,3)==bl.substring(0,3)) return l;
			return 'en';
		}
		var init_f = [];
		var lang = detectlang();
		if ((typeof localStorage != 'undefined') && (localStorage.lang)) if (languages[localStorage.lang]) lang = localStorage.lang;
		var langv = '';
		if (typeof lv != 'undefined') langv = '_' + lv[lang];
		var jsl = []

		jsl.push({f:'lang/' + lang + langv + '.json', n: 'lang', j:3});
		jsl.push({f:'js/crypto_8.js', n: 'crypto_js', j:1,w:5});
		jsl.push({f:'js/hex_1.js', n: 'hex_js', j:1});
		jsl.push({f:'js/functions_4.js', n: 'functions_js', j:1});
		jsl.push({f:'sjcl_1.js', n: 'sjcl_js', j:1});
		jsl.push({f:'js/rsa_1.js', n: 'rsa_js', j:1});
		jsl.push({f:'js/keygen_1.js', n: 'keygen_js', j:1});
		jsl.push({f:'js/mouse_2.js', n: 'mouse_js', j:1});
		jsl.push({f:'js/jquery-min-1_1.8_1.1_1.js', n: 'jquery', j:1,w:9});
		jsl.push({f:'js/jquery-ui_1.js', n: 'jqueryui_js', j:1,w:12});
		jsl.push({f:'js/base64_1.js', n: 'base64_js', j:1});
		jsl.push({f:'js/filedrag_4.js', n: 'filedrag_js', j:1});
		jsl.push({f:'js/jquery_1.mousewheel_1.js', n: 'jquerymouse_js', j:1});
		jsl.push({f:'js/jquery_1.jscrollpane_1.min_1.js', n: 'jscrollpane_js', j:1});
		jsl.push({f:'js/mDB_4.js', n: 'mDB_js', j:1});
		jsl.push({f:'js/cleartemp_1.js', n: 'cleartemp_js', j:1});
		jsl.push({f:'js/download_15.js', n: 'dl_js', j:1,w:3});
		jsl.push({f:'js/upload_10.js', n: 'upload_js', j:1,w:2});
		jsl.push({f:'js/thumbnail_2.js', n: 'thumbnail_js', j:1});
		jsl.push({f:'js/exif_1.js', n: 'exif_js', j:1,w:3});
		jsl.push({f:'js/megapix_1.js', n: 'megapix_js', j:1});
		jsl.push({f:'js/user_2.js', n: 'user_js', j:1});
		jsl.push({f:'js/mega_28.js', n: 'mega_js', j:1,w:7});
		jsl.push({f:'js/fm_28.js', n: 'fm_js', j:1,w:12});
		jsl.push({f:'js/filetypes_2.js', n: 'filetypes_js', j:1});
		jsl.push({f:'index_11.js', n: 'index', j:1,w:4});
		jsl.push({f:'html/start_1.html', n: 'start', j:0});
		jsl.push({f:'html/megainfo_1.html', n: 'megainfo', j:0});
		jsl.push({f:'html/js/start_2.js', n: 'start_js', j:1});
		jsl.push({f:'html/bottom2_1.html', n: 'bottom2',j:0});
		jsl.push({f:'html/key_1.html', n: 'key', j:0});
		jsl.push({f:'html/js/key_1.js', n: 'key_js', j:1});
		jsl.push({f:'html/pro_2.html', n: 'pro', j:0});
		jsl.push({f:'html/js/pro_2.js', n: 'pro_js', j:1});
		jsl.push({f:'html/login_1.html', n: 'login', j:0});
		jsl.push({f:'html/js/login_1.js', n: 'login_js', j:1});
		jsl.push({f:'html/fm_8.html', n: 'fm', j:0,w:3});
		jsl.push({f:'html/top_2.html', n: 'top', j:0});
		jsl.push({f:'js/notifications_3.js', n: 'notifications_js', j:1});
		if (typeof JSON == 'undefined') jsl.push({f:'js/json_1.js', n: 'json', j:1});
		jsl.push({f:'css/style_18.css', n: 'style_css', j:2,w:30,c:1,d:1,cache:1});
		jsl.push({f:'js/avatar_2.js', n: 'avatar_js', j:1,w:3});
		jsl.push({f:'js/countries_2.js', n: 'countries_js', j:1});
		jsl.push({f:'html/dialogs_8.html', n: 'dialogs', j:0,w:2});
		jsl.push({f:'html/transferwidget_1.html', n: 'transferwidget', j:0});
		jsl.push({f:'js/checkboxes_1.js', n: 'checkboxes_js', j:1});
		jsl.push({f:'js/Int64_1.js', n: 'int64_js', j:1});
		jsl.push({f:'js/zip64_1.js', n: 'zip_js', j:1});
		var jsl2 =
		{
			'about': {f:'html/about_2.html', n: 'about', j:0},
			'blog': {f:'html/blog_1.html', n: 'blog', j:0},
			'blog_js': {f:'html/js/blog_7.js', n: 'blog_js', j:1},
			'blogarticle': {f:'html/blogarticle_1.html', n: 'blogarticle', j:0},
			'blogarticle_js': {f:'html/js/blogarticle_1.js', n: 'blogarticle_js', j:1},
			'register': {f:'html/register_1.html', n: 'register', j:0},
			'register_js': {f:'html/js/register_2.js', n: 'register_js', j:1},
			'resellers': {f:'html/resellers_2.html', n: 'resellers', j:0},
			'download': {f:'html/download_2.html', n: 'download', j:0},
			'download_js': {f:'html/js/download_5.js', n: 'download_js', j:1},
			'copyright': {f:'html/copyright_1.html', n: 'copyright', j:0},
			'copyrightnotice': {f:'html/copyrightnotice_2.html', n: 'copyrightnotice', j:0},
			'copyrightnotice_js': {f:'html/js/copyrightnotice_1.js', n: 'copyrightnotice_js', j:1},
			'privacy': {f:'html/privacy_1.html', n: 'privacy', j:0},
			'terms': {f:'html/terms_1.html', n: 'terms', j:0},
			'credits': {f:'html/credits_2.html', n: 'credits', j:0},
			'takedown': {f:'html/takedown_13.html', n: 'takedown', j:0},
			'dev': {f:'html/dev_1.html', n: 'dev', j:0},
			'arkanoid_js': {f:'js/arkanoid_1.js', n: 'arkanoid_js', j:1},
			'dev_js': {f:'html/js/dev_1.js', n: 'dev_js', j:1},
			'sdkterms': {f:'html/sdkterms_1.html', n: 'sdkterms', j:0},
			'help': {f:'html/help_1.html', n: 'help', j:0},
			'help_js': {f:'html/js/help_4.js', n: 'help_js', j:1},
			'firefox': {f:'html/firefox_1.html', n: 'firefox', j:0},
			'sync': {f:'html/sync_1.html', n: 'sync', j:0},
			'mobile': {f:'html/mobile_4.html', n: 'mobile', j:0},
			'affiliates': {f:'html/affiliates_1.html', n: 'affiliates', j:0},
			'affiliate_js': {f:'html/js/affiliate_1.js', n: 'affiliate_js', j:0},
			'affiliateterms': {f:'html/affiliateterms_1.html', n: 'affiliateterms', j:0},
			'affiliatesignup': {f:'html/affiliatesignup_1.html', n: 'affiliatesignup', j:0},
			'affiliatesignup_js': {f:'html/js/affiliatesignup_1.js', n: 'affiliatesignup_js', j:1},
			'affiliatemember': {f:'html/affiliatemember_1.html', n: 'affiliatemember', j:0},
			'affiliatemember_js': {f:'html/js/affiliatemember_1.js', n: 'affiliatemember_js', j:1},
			'contact': {f:'html/contact_1.html', n: 'contact', j:0},
			'privacycompany': {f:'html/privacycompany_1.html', n: 'privacycompany', j:0},
			'chrome': {f:'html/chrome_2.html', n: 'chrome', j:0},
			'zxcvbn_js': {f:'js/zxcvbn_1.js', n: 'zxcvbn_js', j:1}
		};
		var subpages =
		{
			'about': ['about'],
			'terms': ['terms'],
			'credits': ['credits'],
			'blog': ['blog','blog_js','blogarticle','blogarticle_js'],
			'register': ['register','register_js'],
			'android': ['android'],
			'resellers': ['resellers'],
			'!': ['download','download_js'],
			'copyright': ['copyright'],
			'key':['arkanoid_js'],
			'copyrightnotice': ['copyrightnotice','copyrightnotice_js'],
			'privacy': ['privacy','privacycompany'],
			'takedown': ['takedown'],
			'firefox': ['firefox'],
			'mobile': ['mobile'],
			'sync': ['sync'],
			'contact': ['contact'],
			'dev': ['dev','dev_js','sdkterms'],
			'sdk': ['dev','dev_js','sdkterms'],
			'doc': ['dev','dev_js','sdkterms'],
			'help': ['help','help_js'],
			'chrome': ['chrome'],
			'plugin': ['chrome','firefox'],
			'affiliate': ['affiliates','affiliateterms','affiliatesignup','affiliatesignup_js','affiliatemember','affiliatemember_js','affiliate_js']
		};
		var page = document.location.hash;
		if (page)
		{
			page = page.replace('#','');
			if (page.indexOf('%21') > -1)
			{
				page = page.replace('%21','!').replace('%21','!');
				document.location.hash = '#' + page;
			}
		}

		for (var p in subpages)
		{
			if (page && page.substr(0,p.length) == p)
			{
				for (i in subpages[p]) jsl.push(jsl2[subpages[p][i]]);
			}
		}
		var downloading = false;
		var ul_uploading = false;
		var lightweight=false;
		var njsl = [];
		var fx_startup_cache = is_chrome_firefox && nocontentcheck;
		if ((typeof Worker != 'undefined') && (typeof window.URL != 'undefined') && !fx_startup_cache)
		{
			var hashdata = ['self.postMessage = self.webkitPostMessage || self.postMessage;',sjcl_sha_js,'self.onmessage = function(e) { try { e.data.hash = sha256(e.data.text);  self.postMessage(e.data); } catch(err) { e.data.error = err.message; self.postMessage(e.data);  } };'];
			try  { var blob = new Blob(hashdata, { type: "text/javascript" }); }
			catch(e)
			{
				window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
				var bb = new BlobBuilder();
				for (var i in hashdata) bb.append(hashdata[i]);
				var blob = bb.getBlob('text/javascript');
			}
			var hash_url = window.URL.createObjectURL(blob);
			var hash_workers = [];
			var i =0;
			while (i < 2)
			{
				try
				{
					hash_workers[i] = new Worker(hash_url);
					hash_workers[i].postMessage = hash_workers[i].webkitPostMessage || hash_workers[i].postMessage;
					hash_workers[i].onmessage = function(e)
					{
						if (e.data.error)
						{
							console.log('error',e.data.error);
							console.log(e.data.text);
							alert('error');
						}
						if (!nocontentcheck && !cmparrays(e.data.hash,sh1[jsl[e.data.jsi].f]))
						{
							console.log(jsl[e.data.jsi].f);
							console.log(sha256(jsl[e.data.jsi].text));
							console.log(sh1[jsl[e.data.jsi].f]);
							alert('An error occurred while loading MEGA. The file ' + bootstaticpath+jsl[e.data.jsi].f + ' is corrupt. Please try again later. We apologize for the inconvenience.');
							contenterror=1;
						}
						if (!contenterror)
						{
							jsl_current += jsl[e.data.jsi].w || 1;
							jsl_progress();
							if (++jslcomplete == jsl.length) initall();
							else jsl_load(e.data.xhri);
						}
					};
				}
				catch(e)
				{
					hash_workers = undefined;
				}
				i++;
			}
		}
		if (jj)
		{
			var l=[];
			var i=0;
			while (i < 1500)
			{
				l[i]='l';
				i++;
			}
			i=0;
			for (var i in jsl)
			{
				if (jsl[i].j === 1) document.write('<' + 'script type="text/javascript" src="' + bootstaticpath + jsl[i].f + '?r=' + Math.random() + '"></sc' + 'ript>');
				else if (jsl[i].j === 2)
				{
					if ((m && (jsl[i].m)) || ((!m) && (jsl[i].d)))
					document.write('<link rel="stylesheet" type="text/css" href="' + bootstaticpath + jsl[i].f + '" />');
				}
			}
		}
		var pages = [];
		function getxhr()
		{
			return (typeof XDomainRequest != 'undefined' && typeof ArrayBuffer == 'undefined') ? new XDomainRequest() : new XMLHttpRequest();
		}

		var xhr_progress,xhr_stack,jsl_fm_current,jsl_current,jsl_total,jsl_perc,jsli,jslcomplete;

		if(fx_startup_cache && d > 1)
		{
			console.log('*** Invalidating startup cache ***');
			Services.obs.notifyObservers(null, "startupcache-invalidate", null);
		}

		function jsl_start()
		{
			jslcomplete = 0;
			xhr_progress = [0,0];
			xhr_stack = Array(xhr_progress.size);
			jsl_fm_current = 0;
			jsl_current = 0;
			jsl_total = 0;
			jsl_perc = 0;
			jsli=0;
			for (var i = jsl.length; i--;) if (!jsl[i].text) jsl_total += jsl[i].w || 1;
			if (fx_startup_cache)
			{
				var step = function(jsi)
				{
					jsl_current += jsl[jsi].w || 1;
					jsl_progress();
					if (++jslcomplete == jsl.length) initall();
					else
					{
						// mozRunAsync(next.bind(this, jsli++));
						next(jsli++);
					}
				};
				var next = function(jsi)
				{
					var file = bootstaticpath + jsl[jsi].f;

					if (jsl[jsi].j == 1)
					{
						try
						{
							loadSubScript(file);
						}
						catch(e)
						{
							Cu.reportError(e);

							alert('An error occurred while loading MEGA.\n\nFilename: '
								+ file + "\n" + e + '\n\n' + mozBrowserID);
						}
						step(jsi);
					}
					else
					{
						var ch = NetUtil.newChannel(file);
						ch.contentType = jsl[jsi].j == 3
							? "application/json":"text/plain";

						NetUtil.asyncFetch(ch, function(is, s)
						{
							if (!Components.isSuccessCode(s))
							{
								alert('An error occurred while loading MEGA.' +
									' The file ' + file + ' could not be loaded.');
							}
							else
							{
								jsl[jsi].text = NetUtil.readInputStreamToString(is, is.available());

								if (jsl[jsi].j == 3) l = JSON.parse(jsl[jsi].text);

								step(jsi);
							}
						});
					}
				};
				next(jsli++);
			}
			else
			{
				for (var i = xhr_progress.length; i--; ) jsl_load(i);
			}
		}

		function xhr_load(url,jsi,xhri)
		{
			  xhr_stack[xhri] = getxhr();
			  xhr_stack[xhri].onload = function(oEvent)
			  {
				jsl[this.jsi].text = this.response || this.responseText;

				if (typeof hash_workers != 'undefined' && !nocontentcheck)
				{
					hash_workers[this.xhri].postMessage({'text':jsl[this.jsi].text,'xhr':'test','jsi':this.jsi,'xhri':this.xhri});
				}
				else
				{
					if (!nocontentcheck && !cmparrays(sha256(jsl[this.jsi].text),sh1[jsl[this.jsi].f]))
					{
						console.log(jsl[this.jsi].f);
						console.log(sha256(jsl[this.jsi].text));
						console.log(sh1[jsl[this.jsi].f]);
						alert('An error occurred while loading MEGA. The file ' + bootstaticpath+jsl[this.jsi].f + ' is corrupt. Please try again later. We apologize for the inconvenience.');
						contenterror=1;
					}
					if (!contenterror)
					{
						jsl_current += jsl[this.jsi].w || 1;
						jsl_progress();
						if (++jslcomplete == jsl.length) initall();
						else jsl_load(this.xhri);
					}
				}
			  }
			  xhr_stack[xhri].onerror = function(oEvent)
			  {
				xhr_progress[this.xhri] = 0;
				xhr_load(this.url,this.jsi,this.xhri);
			  }
			  if (jsl[jsi].text)
			  {
				if (++jslcomplete == jsl.length) initall();
				else jsl_load(xhri);
			  }
			  else
			  {
				  xhr_stack[xhri].url = url;
				  xhr_stack[xhri].jsi = jsi;
				  xhr_stack[xhri].xhri = xhri;
				  xhr_stack[xhri].open("GET", url, true);
				  if (is_chrome_firefox) xhr_stack[xhri].overrideMimeType('text/plain');
				  xhr_stack[xhri].send(null);
			  }
		}
		window.onload = function ()
		{
			if (!maintenance && !androidsplash) jsl_start();
		}
		function jsl_load(xhri)
		{
			if (jsl[jsli]) xhr_load(bootstaticpath + jsl[jsli].f, jsli++,xhri);
		}
		function jsl_progress()
		{
			if (d) console.log('done',(jsl_current+jsl_fm_current));
			if (d) console.log('total',jsl_total);
			var p = Math.floor((jsl_current+jsl_fm_current)/jsl_total*100);
			if ((p > jsl_perc) && (p <= 100))
			{
				if (p < 100 && ((document.location.href.substr(0,19) == 'chrome-extension://') || is_chrome_firefox)) return false;
				jsl_perc = p;
				if (document.getElementById('loading_progress_fill')) document.getElementById('loading_progress_fill').style.width = jsl_perc+'%';
				else if(document.getElementById('loadinganim')) document.getElementById('loadinganim').className = 'loading-progress-bar percents-'+jsl_perc;
			}
		}
		var jsl_loaded={};
		function initall()
		{
			var jsar = [];
			var cssar = [];
			for(var i in localStorage) if (i.substr(0,6) == 'cache!') delete localStorage[i];
			for (var i in jsl)
			{
			  jsl_loaded[jsl[i].n]=1;
			  if ((jsl[i].j == 1) && (!jj))
			  {
				if (!fx_startup_cache)
				{
					if (window.URL) jsar.push(jsl[i].text + '\n\n');
					else evalscript(jsl[i].text);
				}
			  }
			  else if ((jsl[i].j == 2) && (!jj))
			  {
				if (document.getElementById('bootbottom')) document.getElementById('bootbottom').style.display='none';
				if (window.URL)
				{
					cssar.push(jsl[i].text.replace(/\.\.\//g,staticpath).replace(new RegExp( "\\/en\\/", "g"),'/' + lang + '/'));
				}
				else
				{
					var css = document.createElement('style');
					css.type = "text/css";
					css.rel = 'stylesheet';
					document.getElementsByTagName('head')[0].appendChild(css);
					css.innerHTML = jsl[i].text.replace(/\.\.\//g,staticpath).replace(new RegExp( "\\/en\\/", "g"),'/' + lang + '/');
				}
			  }
			  else if (jsl[i].j == 3) l = JSON.parse(jsl[i].text);
			  else if (jsl[i].j == 0) pages[jsl[i].n] = jsl[i].text;
			}
			if (window.URL)
			{
				try
				{
					var blob = new Blob(cssar, { type: "text/css" });
				}
				catch(e)
				{
					window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder || window.MSBlobBuilder;
					var bb = new BlobBuilder();
					for (var i in cssar) bb.append(cssar[i]);
					var blob = bb.getBlob('text/css');
				}
				var link = document.createElement('link');
				link.setAttribute('rel', 'stylesheet');
				link.type = 'text/css';
				link.href = window.URL.createObjectURL(blob);
				document.head.appendChild(link);
				cssar=undefined;
				if (typeof u_checked !== 'undefined' && u_checked) jsar.push('startMega();');
				else  jsar.push('populate_l(); var insist=false; if (localStorage.dlimport) insist=true; u_checklogin( { checkloginresult: function(u_ctx,r) { u_type = r; u_checked=true; startMega(); } },insist); clearit(0);');
				evalscript_url(jsar);
				jsar=undefined;
			}
			else
			{
				populate_l();
				if (typeof u_checked !== 'undefined' && u_checked) startMega();
				else
				{
					var insist=false;
					if (localStorage.dlimport) insist=true;
					u_checklogin({ checkloginresult: function(u_ctx,r)
					{
						u_type = r;
						u_checked=true;
						startMega();
					}},insist);
					clearit(0);
				}
			}
		}
	}
	if (ua.indexOf('android') > 0 && !sessionStorage.androidsplash && document.location.hash.indexOf('#confirm') == -1)
	{
		if (document.location.hash == '#android')
		{
			document.location = 'https://play.google.com/store/apps/details?id=com.flyingottersoftware.mega';
		}
		else
		{
			document.write('<link rel="stylesheet" type="text/css" href="' + staticpath + 'resources/css/mobile-android.css" /><div class="overlay"></div><div class="new-folder-popup" id="message"><div class="new-folder-popup-bg"><div class="new-folder-header">MEGA for Android</div><div class="new-folder-main-bg"><div class="new-folder-descr">Do you want to install the latest<br/> version of the MEGA app for Android?</div><a class="new-folder-input left-button" id="trashbinYes"> <span class="new-folder-bg1"> <span class="new-folder-bg2" id="android_yes"> Yes </span> </span></a><a class="new-folder-input right-button" id="trashbinNo"> <span class="new-folder-bg1"> <span class="new-folder-bg2" id="android_no">No </span> </span></a><div class="clear"></div></div></div></div></div>');
			document.getElementById('android_yes').addEventListener("click", function ()
			{
				document.location = 'https://play.google.com/store/apps/details?id=com.flyingottersoftware.mega';
			}, false);
			document.getElementById('android_no').addEventListener("click", function ()
			{
				sessionStorage.androidsplash=1;
				document.location.reload();
			}, false);
			androidsplash=true;
		}
	}
	else
	{
		var istaticpath = staticpath;
		if (document.location.href.substr(0,19) == 'chrome-extension://')  istaticpath = '../';
		else if (is_chrome_firefox) istaticpath = 'chrome://mega/content/';

		document.write('<style type="text/css">.div, span, input {outline: none;}.hidden {display: none;}.clear {clear: both;margin: 0px;padding: 0px;display: block;}.loading-main-block {width: 100%;height: 100%;overflow: auto;font-family:Arial, Helvetica, sans-serif;}.loading-mid-white-block {height: 100%;width:100%;}.mid-centered-block {position: absolute;width: 494px;min-height: 158px;top: 50%;left: 50%;margin: -95px 0 0 -247px;}.loading-main-bottom {max-width: 940px;width: 100%;position: absolute;bottom: 20px;left: 50%;margin: 0 0 0 -470px;text-align: center;}.loading-bottom-button {height: 29px;width: 29px;float: left;background-image: url(' + istaticpath + 'images/mega/loading-sprite.png);background-repeat: no-repeat;cursor: pointer;}.loading-bottom-button.st-facebook-button {float: right;background-position: -40px -2376px;margin-left: 11px;}.loading-bottom-button.st-facebook-button:hover {background-position: -40px -2336px;}.loading-bottom-button.st-twitter-button {float: right;background-position: -1px -2376px;margin-left: 11px;}.loading-bottom-button.st-twitter-button:hover {background-position: -1px -2336px;}.loading-cloud {width: 222px;height: 158px;background-image: url(' + istaticpath + 'images/mega/loading-sprite.png);background-repeat: no-repeat;background-position: 0 -2128px;margin: 0 auto;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;-ms-box-sizing: border-box;box-sizing: border-box;padding-top: 55px;}.loading-progress-bar, .loading-progress-bar div {width: 80px;height: 80px;margin: 0 0 0 71px;background-image: url(' + istaticpath + 'images/mega/loading-sprite.png);background-repeat: no-repeat;background-position: 0 top;}.loading-progress-bar div {background-position: -71px -2183px;margin: 0;}.maintance-block {position: absolute;width: 484px;min-height: 94px;border: 2px solid #d9d9d9;-moz-border-radius: 7px;-webkit-border-radius: 7px;border-radius: 7px;padding: 10px;color: #333333;font-size: 13px;line-height: 30px;padding: 15px 15px 15px 102px;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;-ms-box-sizing: border-box;box-sizing: border-box;background-image: url(' + istaticpath + 'images/mega/loading-sprite.png);background-repeat: no-repeat;background-position: -60px -2428px;margin-top: 45px;}.loading-progress-bar.percents-0 {background-position: 0 0;}.loading-progress-bar.percents-1, .loading-progress-bar.percents-2, .loading-progress-bar.percents-3 {background-position: -130px 0;}.loading-progress-bar.percents-4, .loading-progress-bar.percents-5, .loading-progress-bar.percents-6 {background-position: 0 -100px;}.loading-progress-bar.percents-7, .loading-progress-bar.percents-8, .loading-progress-bar.percents-9 {background-position: -130px -100px;}.loading-progress-bar.percents-10, .loading-progress-bar.percents-11, .loading-progress-bar.percents-12 {background-position: 0 -200px;}.loading-progress-bar.percents-13, .loading-progress-bar.percents-14, .loading-progress-bar.percents-15 {background-position: -130px -200px;}.loading-progress-bar.percents-16, .loading-progress-bar.percents-17, .loading-progress-bar.percents-18 {background-position: 0 -300px;}.loading-progress-bar.percents-19, .loading-progress-bar.percents-20, .loading-progress-bar.percents-21 {background-position: -130x -300px;}.loading-progress-bar.percents-22, .loading-progress-bar.percents-23, .loading-progress-bar.percents-24 {background-position: 0 -400px;}.loading-progress-bar.percents-25, .loading-progress-bar.percents-26, .loading-progress-bar.percents-27 {background-position: -130px -400px;}.loading-progress-bar.percents-28, .loading-progress-bar.percents-29, .loading-progress-bar.percents-30 {background-position: 0 -500px;}.loading-progress-bar.percents-31, .loading-progress-bar.percents-32, .loading-progress-bar.percents-33 {background-position: -130px -500px;}.loading-progress-bar.percents-34, .loading-progress-bar.percents-35 {background-position: 0 -600px;}.loading-progress-bar.percents-36, .loading-progress-bar.percents-37 {background-position: -130px -600px;}.loading-progress-bar.percents-38, .loading-progress-bar.percents-39 {background-position: 0 -700px;}.loading-progress-bar.percents-40, .loading-progress-bar.percents-41 {background-position: -130px -700px;}.loading-progress-bar.percents-42, .loading-progress-bar.percents-43 {background-position: 0 -800px;}.loading-progress-bar.percents-44, .loading-progress-bar.percents-45 {background-position: -130px -800px;}.loading-progress-bar.percents-46, .loading-progress-bar.percents-47 {background-position: 0 -900px;}.loading-progress-bar.percents-48, .loading-progress-bar.percents-49 {background-position: -130px -900px;}.loading-progress-bar.percents-50 {background-position: 0 -1000px;}.loading-progress-bar.percents-51, .loading-progress-bar.percents-52, .loading-progress-bar.percents-53 {background-position: -130px -1000px;}.loading-progress-bar.percents-54, .loading-progress-bar.percents-55, .loading-progress-bar.percents-56 {background-position: 0 -1100px;}.loading-progress-bar.percents-57, .loading-progress-bar.percents-58, .loading-progress-bar.percents-59 {background-position: -130px -1100px;}.loading-progress-bar.percents-60, .loading-progress-bar.percents-61, .loading-progress-bar.percents-62 {background-position: 0 -1200px;}.loading-progress-bar.percents-63, .loading-progress-bar.percents-64, .loading-progress-bar.percents-65 {background-position: -130px -1200px;}.loading-progress-bar.percents-66, .loading-progress-bar.percents-67, .loading-progress-bar.percents-68 {background-position: 0 -1300px;}.loading-progress-bar.percents-69, .loading-progress-bar.percents-70, .loading-progress-bar.percents-71 {background-position: -130px -1300px;}.loading-progress-bar.percents-72, .loading-progress-bar.percents-73, .loading-progress-bar.percents-74 {background-position: 0 -1400px;}.loading-progress-bar.percents-75, .loading-progress-bar.percents-76, .loading-progress-bar.percents-77 {background-position: -130px -1400px;}.loading-progress-bar.percents-78, .loading-progress-bar.percents-79, .loading-progress-bar.percents-80 {background-position: 0 -1500px;}.loading-progress-bar.percents-81, .loading-progress-bar.percents-82, .loading-progress-bar.percents-83 {background-position: -130px -1500px;}.loading-progress-bar.percents-84, .loading-progress-bar.percents-85, .loading-progress-bar.percents-86 {background-position: 0 -1600px;}.loading-progress-bar.percents-87, .loading-progress-bar.percents-88, .loading-progress-bar.percents-89 {background-position: -130px -1600px;}.loading-progress-bar.percents-90, .loading-progress-bar.percents-91, .loading-progress-bar.percents-92 {background-position: 0 -1800px;}.loading-progress-bar.percents-93, .loading-progress-bar.percents-94, .loading-progress-bar.percents-95 {background-position: -130px -1800px;}.loading-progress-bar.percents-96, .loading-progress-bar.percents-97 {background-position: 0 -1900px;}.loading-progress-bar.percents-98, .loading-progress-bar.percents-99 {background-position: -130px -1900px;}.loading-progress-bar.percents-100 {background-position: 0 -2000px;}.follow-txt {text-decoration:none; line-height: 28px; float:right; color:#666666; font-size:12px;}@media only screen and (-webkit-min-device-pixel-ratio: 1.5), only screen and (-o-min-device-pixel-ratio: 3/2), only screen and (min--moz-device-pixel-ratio: 1.5), only screen and (min-device-pixel-ratio: 1.5) {.maintance-block, .loading-progress-bar, .loading-progress-bar div, .loading-cloud, .loading-bottom-button {background-image: url(' + istaticpath + 'images/mega/loading-sprite@2x.png);	background-size: 222px auto;	}}</style><div class="loading-main-block" id="loading"><div class="loading-mid-white-block"><div class="mid-centered-block"><div class="loading-cloud"><div class="loading-progress-bar percents-1" id="loadinganim"><div></div></div></div><div class="maintance-block hidden">Scheduled System Maintenance - Expect Disruptions<br/>Sunday 04:00 - 10:00 UTC </div></div><div class="loading-main-bottom" id="bootbottom"><a href="https://www.facebook.com/MEGAprivacy" target="_blank" class="loading-bottom-button st-facebook-button"></a><a href="https://twitter.com/MEGAprivacy" class="loading-bottom-button st-twitter-button"></a><a href="https://www.twitter.com/MEGAprivacy" target="_blank" class="follow-txt" target="_blank">follow us</a><div class="clear"></div></div></div></div>');
	}
}

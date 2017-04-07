var context = '/cgi/mc',
    url = '',
    username = '',
    hostMap = {
        "163.com": "msg.mail.163.com",
        "126.com": "msg.mail.126.com",
        "yeah.net": "msg.mail.yeah.net",
        "vip.163.com": "msg.vip.163.com",
        "vip.126.com": "msg.vip.126.com",
        "188.com": "msg.mail.188.com",
    };
    
chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse){
        if(request.msg == "start") start();
    }
);

function start() {
    getUserNewMsgCount();
    window.clearInterval(getUnread);
    window.setInterval(getUnread, 180000);
    getUnread();
}    

function getUserNewMsgCount() {
    username = window.localStorage.getItem('email_163_check_account');
    if (!username) return;
    var info = username.match(/(\w+)@(.+)/),
        domain = info[2],
        emailName = info[1],
        reqUrl = hostMap[domain];
    url = 'http://' + reqUrl + context;
}

function getUnread() {

    async.map(options, (item, callback) => {
        sendRequest(item);
    }, (err, results) => {
        
    });

    sendRequest({
        url: url,
        username: username
    });
}

function sendRequest(option) {
    $.ajax({
        url: option.url,
        data: { funcid: "getusrnewmsgcnt", fid: 0, username:  option.username},
        timeout: 5000,
        method: 'post',
        success: function(j, h, k) {
            if (k.readyState === 4 && k.status === 200) {
                if (new RegExp(/^New Message:(\d+)\s*Totoal Message:\d+.*/g).test(j)) {
                    var i = parseInt(RegExp.$1) <= 0 ? '' : parseInt(RegExp.$1);
                    chrome.browserAction.setBadgeText({
                        text: i + ''
                    });
                }
            }
        },
        error: function(j, h, i) {
            // console.log()
        }
    });
}
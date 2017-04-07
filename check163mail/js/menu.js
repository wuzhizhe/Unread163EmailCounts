var bg = chrome.extension.getBackgroundPage();

window.onload = function() {
	setEventListeners();
	setAccountShow();
	startGet();
};

function setEventListeners() {
	document.querySelector('#addAccount').addEventListener('click', addAccountClick);
	document.querySelector('.save-account').addEventListener('click', saveAccountClick);
	document.querySelector('.cancle-add').addEventListener('click', cancleAccountClick);
	document.querySelector('.js-desc').addEventListener('click', descClick);
	document.querySelector('.js-back').addEventListener('click', backClick);
	// document.querySelector('.account-item-show').addEventListener('click', gotoEmail);
	document.querySelector('.manage-accounts').addEventListener('click', manageAccounts);
}

//添加账号
function addAccountClick() {
	document.querySelector('.g-doc').style.display = 'none';
	document.querySelector('.add-account-container').style.display = 'block';
}

//取消添加账号
function cancleAccountClick() {
	document.querySelector('.add-account-container').style.display = 'none';
	document.querySelector('.g-doc').style.display = 'block';
}

//保存账号
function saveAccountClick() {
	var lcEemails = window.localStorage.getItem('emails');
	var emails = null;
	if (!lcEemails) {
		emails = [];
	} else {
		emails = JSON.parse(lcEemails);
	}
	if (emails.length == 3) {
		setAccountShow();
		cancleAccountClick();
		startGet();
		return;
	}
	var domain = document.querySelector('#mail-server-select').value;
	var email = document.querySelector('.add-content input').value + '@' + domain;
	emails.push({
		key: new Date().getTime(),
		name: email
	})
	window.localStorage.setItem('emails', JSON.stringify(emails));
	setAccountShow();
	cancleAccountClick();
	startGet();
}

//管理账号
function manageAccounts() {
	//TODO
	// document.querySelector('.accounts-show').style.display = 'true';
}

//显示说明
function descClick() {
	document.querySelector('.g-doc').style.display = 'none';
	document.querySelector('.desc-of-tool').style.display = 'block';
}
//隐藏说明
function backClick() {
	document.querySelector('.desc-of-tool').style.display = 'none';
	document.querySelector('.g-doc').style.display = 'block';
}

//显示当前账号
function setAccountShow() {
	let _emails = window.localStorage.getItem('emails');
	var emails = [];
	if (_emails) {
		emails = JSON.parse(_emails);
	}
	var accountDiv = document.querySelector('#accoutdiv');
	accountDiv.innerHTML = '';
	for (var i = 0; i < emails.length; i++) {
		var wrapper = document.createElement('div');
		wrapper.className = 'account-wrapper';
		var account = document.createElement('div');
		account.className = 'account-item-show';
		account.id = emails[i].key;
		account.innerHTML = emails[i].name;
		var span = document.createElement('span');
		span.innerHTML = '0';
		span.className = 'account-num-span';
		wrapper.appendChild(account);
		wrapper.appendChild(span);
		accountDiv.appendChild(wrapper);
	}
	if (emails.length > 0) {
		document.querySelector('.account-item-show').addEventListener('click', gotoEmail);
	}
}

function startGet() {
	chrome.extension.sendMessage({
		msg: "start"
	});
}

//跳转到邮箱登陆页面
function gotoEmail(event) {
	var email = JSON.parse(window.localStorage.getItem('emails')),
		hostMap = {
			"163.com": "http://mail.163.com",
			"126.com": "http://www.126.com",
			"yeah.net": "http://www.yeah.net"
		};
	
	var domain = email.split('@')[1],
		url = hostMap[domain];

	chrome.tabs.create({
		url: url
	});
}
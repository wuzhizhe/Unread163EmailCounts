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
	var domain = document.querySelector('#mail-server-select').value;
	var email = document.querySelector('.add-content input').value + '@' + domain;
	window.localStorage.setItem('email_163_check_account', email);
	setAccountShow();
	cancleAccountClick();
	startGet();
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
	var email = window.localStorage.getItem('email_163_check_account');
	document.querySelector('#accoutdiv').innerHTML = email;
}

function startGet() {
	chrome.extension.sendMessage({ msg: "start" });
}
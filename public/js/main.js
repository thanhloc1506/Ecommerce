// Register modal
$(document).ready(function () {
	window.onclick = function (event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};
});

function tatcdm() {
	modal.style.display = 'none';
}

function dkdcmm() {
	var modal = document.getElementById('modal');
	var frm = document.getElementById('register-frm');
	var frm1 = document.getElementById('login-frm');
	var frm2 = document.getElementById('add-frm');
	var frm3 = document.getElementById('update-frm');
	modal.style.display = 'flex';
	frm.style.display = 'block';
	frm1.style.display = 'none';
	frm2.style.display = 'none';
	frm3.style.display = 'none';
}

function dndcmm() {
	var modal = document.getElementById('modal');
	var frm = document.getElementById('register-frm');
	var frm1 = document.getElementById('login-frm');
	var frm2 = document.getElementById('add-frm');
	var frm3 = document.getElementById('update-frm');
	modal.style.display = 'flex';
	frm.style.display = 'none';
	frm1.style.display = 'block';
	frm2.style.display = 'none';
	frm3.style.display = 'none';
}

function openadd() {
	var modal = document.getElementById('modal');
	var frm = document.getElementById('register-frm');
	var frm1 = document.getElementById('login-frm');
	var frm2 = document.getElementById('add-frm');
	var frm3 = document.getElementById('update-frm');
	modal.style.display = 'flex';
	frm.style.display = 'none';
	frm1.style.display = 'none';
	frm2.style.display = 'block';
	frm3.style.display = 'none';
}

function openupdate() {
	var modal = document.getElementById('modal');
	var frm = document.getElementById('register-frm');
	var frm1 = document.getElementById('login-frm');
	var frm2 = document.getElementById('add-frm');
	var frm3 = document.getElementById('update-frm');
	modal.style.display = 'flex';
	frm.style.display = 'none';
	frm1.style.display = 'none';
	frm2.style.display = 'none';
	frm3.style.display = 'block';
}

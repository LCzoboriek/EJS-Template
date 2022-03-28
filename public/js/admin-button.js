

let isadmin = document.getElementById('admin-button').value
alert(isadmin)
if(isadmin === 'Y') {
    document.getElementById('admintoggle').style.display = 'block'
} else {
    document.getElementById('admintoggle').style.display = 'none'
}


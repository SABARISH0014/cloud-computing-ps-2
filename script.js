document.addEventListener('DOMContentLoaded', function () {
    var search = document.getElementById('memberSearch');
    if (search) {
        var list = document.getElementById('memberList');
        var items = list ? Array.from(list.querySelectorAll('.btn')) : [];
        search.addEventListener('input', function () {
            var q = search.value.trim().toLowerCase();
            items.forEach(function (a) {
                var text = a.textContent.trim().toLowerCase();
                a.style.display = text.indexOf(q) !== -1 ? '' : 'none';
            });
        });
    }

    var copyBtn = document.getElementById('copyLink');
    if (copyBtn) {
        copyBtn.addEventListener('click', function () {
            var url = window.location.href;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(url).then(function () {
                    var msg = document.getElementById('copyMsg');
                    if (msg) {
                        msg.style.display = 'block';
                        setTimeout(function () { msg.style.display = 'none'; }, 2500);
                    }
                }).catch(function () {
                    alert('Unable to copy to clipboard. URL: ' + url);
                });
            } else {
                // Fallback
                try {
                    var tmp = document.createElement('textarea');
                    tmp.value = url;
                    document.body.appendChild(tmp);
                    tmp.select();
                    document.execCommand('copy');
                    document.body.removeChild(tmp);
                    var msg = document.getElementById('copyMsg');
                    if (msg) {
                        msg.style.display = 'block';
                        setTimeout(function () { msg.style.display = 'none'; }, 2500);
                    }
                } catch (e) {
                    alert('Copy not supported. URL: ' + url);
                }
            }
        });
    }
});

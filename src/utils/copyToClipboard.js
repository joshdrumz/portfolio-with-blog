const highlights = document.querySelectorAll('div.gridsome-highlight');
// console.log(highlights);

highlights.forEach(div => {
  const copy = document.createElement('button');
  copy.innerHTML = 'Copy';
  copy.addEventListener('click', handleCopyClick);
  div.append(copy);
});

function handleCopyClick(e) {
  const { children } = e.target.parentElement;
  const { innerText } = Array.from(children)[0];
  copyToClipboard(innerText);
  // alert(innerText);
}

function copyToClipboard(str) {
  const el = document.createElement('textarea');

  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';

  document.body.appendChild(el);

  const selected =
    document.getSelection().rangeCount > 0
      ? document.getSelection().getRangeAt(0)
      : false;

  el.select();

  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
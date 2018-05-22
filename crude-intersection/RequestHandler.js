function send_request() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://localhost:5000', true);
  xhr.setRequestHeader('Content-type', 'application/json');
  xhr.onload = function() {
    console.log(this.responseText);
  };
  xhr.send(null);

}

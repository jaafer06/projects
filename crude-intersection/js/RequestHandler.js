function send_request() {
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://localhost:5000', true);
  xhr.onload = function() {
    console.log("in");
  };
  xhr.send(null);

}

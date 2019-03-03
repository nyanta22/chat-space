$(function(){
  function buildSendMessageHTML(message){
    var html = `<div class="message latest">
                  <div class="user__name">
                    ${message.name}
                  </div>
                  <div class="message__time">
                    ${message.created_at}
                  </div>
                    <p class="message__content">
                      ${message.content}
                    </p>
                  </div>`
    return html;
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var href = window.location.href
    $.ajax({
      url: href,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(messageData){
      var html = buildSendMessageHTML(messageData);
      $('.messages').append(html)
      $('.Chat__message').val('')
      $('.Chat__send').prop('disabled',false);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('error');
    })
  });
});

$(function(){
  function buildMessageHTML(message){
    var addImage = (message.image)? `<div class="lower-message__image">
                                      <img src= '${message.image}'>
                                    </div>` : ''
    var html = `<div class="message", data-id=${message.id}>
                  <div class="user__name">
                    ${message.name}
                  </div>
                  <div class="message__time">
                    ${message.created_at}
                  </div>
                    <p class="message__content">
                      ${message.content}
                    </p>
                    ${addImage}
                </div>`
    return html;
  }

  $(function(){
    setInterval(automaticUpdate, 5000);
    function automaticUpdate(){
       var message_id = $('.message')[0] ? $('.message:last').data('id') :0;
      $.ajax({
        url: location.href,
        type:'GET',
        data: {
          message: {id:message_id }
        },
        dataType: 'json'
      })
      .always(function(message){
        $.each(message, function(i,new_message){
          buildMessageHTML(new_message);
        });
      })
    };
  });

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
    .done(function(send_message){
      var html = buildMessageHTML(send_message);
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

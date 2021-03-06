$(function() {
var search_list = $("#user-search-result");
function appendUser(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="ユーザーのid" data-user-name="ユーザー名">追加</a>
              </div>`
  search_list.append(html);
}

function appendErrMsgToHTML(msg) {
  var html = `<div class="chat-group-user clearfix">${ msg }</div>`
  search_list.append(html);
}
  $(document).on('click', '.user-search-add', function(){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='ユーザーのid'>
                  <p class='chat-group-user__name'>${$(this).prev().text()}</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    $("#user-search-field").val("");
    $("#add-user-search-result").append(html);
    $(this).parent().remove();
  });

  $(document).on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })

    .done(function(users){
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        })
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました')
    })
  });
});

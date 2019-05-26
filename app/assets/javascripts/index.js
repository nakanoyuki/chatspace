$(function() {

  var search_user = $("#user-search-result");
  var member_user= $(".chat-group-user__name__users");

  function appendUser(user){

    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`

    search_user.append(html);
  }

  function appendNoUserToHTML(msg){
    var html = `<p class="chat-group-user__name">${msg}</p>`
    search_user.append(html);
  }

  function AppendUsermemberList(name,user_id){
    
    var html = `<div class="chat-group-user clearfix js-chat-member" id="${user_id}">
                  <input name="group[user_ids][]" type="hidden" value="${user_id}">
                  <p class="chat-group-user__name">${name}</p>
                  <div class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn" data-user-id="${user_id}" data-user-name="${name}">削除</div>
                </div>`

    member_user.append(html);
  }

  $("#user-search-field").on("keyup",function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { name: input },
        dataType: 'json'
      })

      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !==0){
            users.forEach(function(user){
                appendUser(user);
            });
        }
        else{
            appendNoUserToHTML("一致する名前はありません");
        }
      })

      .fail(function(){
        alert("ユーザーの検索に失敗しました")
      })

  });

    $(document).on("click", ".user-search-add", function () {
      var name = $(this).data("user-name");
      var user_id = $(this).data("user-id");
      $(this).parent().remove();
      AppendUsermemberList(name,user_id);
      
    });

    $(document).on("click", ".user-search-remove", function () {
      $(this).parent().remove();
    });
 });

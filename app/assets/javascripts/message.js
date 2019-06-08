$(function(){

    function buildHTML(json){
        var image = json.image?`<img class="message__text__image" src="${json.image}"`:"";
        
        var html = `<div class="message" data-id="${ json.id }">
        <div class="upper-info">
          <div class="upper-info__user">
          ${ json.user_name }
          </div>
          <div class="upper-info__date">
          ${ json.date}
         </div>
        </div>
        <div class="message__text">
         
        <p class="message__text__content">
        ${ json.content }
        ${image}
        </p>
         </div>
      </div>`
      return html;
    };

    function ScrollToNewMessage(){
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight},'fast');
    }

    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action')
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
    })

    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html)

     
      ScrollToNewMessage();
      $('.input__text').val('')
      $('.message__image').val('');
    })
    .fail(function(data){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(data){
      $('.new-message__submit-btn').prop('disabled', false);
    })
  })

  var reloadMessages = function() {
    
    if (window.location.href.match(/\/groups\/\d+\/messages/) ){
    //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.message').last().data('id');
      // index.html.hamlで定義したdata属性からdata関数を使ってgroup_idを取得
      var group_id = $('.current-group').data('group_id');

      var url = `\/groups/${group_id}/api/messages`
   
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: url, // urlキーにgroup_idを式展開指定する
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id, group_id: group_id} // group_idキーと値を追加
      })

      .done(function(messages) {
        //配列messagesの中身一つ一つを取り出し、HTMLに変換したものを入れ物に足し合わせる
        messages.forEach(function(message){
        //メッセージが入ったHTMLを取得
        var insertHTML = buildHTML(message);
        //メッセージを追加
        $('.messages').append(insertHTML)
        ScrollToNewMessage();
        });
      })
    
      .fail(function(data) {
        alert('自動更新に失敗しました');
      })
    };
  };

   setInterval(reloadMessages, 5000);
   
});

 
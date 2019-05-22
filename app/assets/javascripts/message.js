$(function(){
    function buildHTML(json){
        var image = ""
        if(json.image !==null){
          image = `<img class="message__text__image" src="${json.image}"></img>`
        }
        
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
    }

    function scrollBottom(){
      var target = $('.message').last();
      var position = target.offset().top + $('.messages').scrollTop();
      $('.messages').animate({
        scrollTop: position
      }, 300, 'swing');
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
      scrollBottom();
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
}); 



class Api::MessagesController < ApplicationController

    def index
       # groupのidを取得
        @group = Group.find(params[:group_id])
        respond_to do |format| 
        format.html 
        format.json {@messages = @group.messages.where("id > ?",params[:id]) } # 取得したgroupのidに紐づくmessageを取得する」
        end
    end
end

# 送られてきたメッセージのidを取得して
# それよりも後に投稿されたメッセージのみDBから取得する処理を書く。
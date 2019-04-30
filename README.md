# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

# DB設計

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|name|string|index: true,null: false,unique: true|
|email|string|null: false|

### Association
- has_many :groups though: members
- has_many :messages
  has_many :members


## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false, foreign_key: true|
|groupname|string|index: true,null: false,unique: true|

### Association
- has_many :users though: members
- has_many :messages
  has_many :members


## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|body|string|index: true,null: false,unique: true|
|image|string|index: true,null: false,unique: true|
|created_at|timestamp|index: true,null: false,unique: true|
|updated_at|timestamp|index: true,null: false,unique: true|

### Association
- belong_to :user
  belong_to :group


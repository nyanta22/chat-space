# README

## membersテーブル

|columns|Type|Options|
|-------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### association
- belongs_to :user
- belongs_to :group

### messagesテーブル

|columns|Type|Options|
|-------|----|-------|
|text|text||
|image|string||
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
### association
- belongs_to :user
- belongs_to :group

##usersテーブル
|columns|Type|Options|
|-------|----|-------|
|name|string|null: false, index: true|
|email|string|null:false, unique: true|
### association
- has_many :members
- has_many :groups,through :members
- has_many :messages

##groupsテーブル

|columns|Type|Options|
|-------|----|-------|
|name|string|null: false, unique: true|
###association
- has_many :members
- has_many :users, through :members
- has_many :messages





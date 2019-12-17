json.user do
  # manually set following and follower IDs to empty arrays for a new user
  # json.(current_user, :id, :email, :username)
  # json.followingIds []
  # json.followerIds []
  json.partial! 'api/users/user', user: current_user
end
json.token current_user.generate_jwt
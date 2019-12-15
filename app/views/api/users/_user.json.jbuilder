json.(user, :id, :email, :username)
json.followingIds user.following.ids
json.followerIds user.followers.ids
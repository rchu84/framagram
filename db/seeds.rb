# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
# 50.times {
#   User.create(
#     username: Faker::Internet.unique.username,
#     email: Faker::Internet.unique.safe_email,
#     password: "123456")
#   }

# User.all.each do |user|
#   user.following_ids = User.all.ids.sample(rand(20..50)).reject{ |i| i == user.id }
#   rand(5..10).times do  
#     p = Post.new(
#       author_id: user.id,
#       caption: Faker::Lorem.paragraph
#     )
#     rand(1..5).times do
#       files = Dir.glob("app/assets/images/*.jpg")
#       file = File.open(files.sample)
#       p.photos.attach(io: file, filename: file.path.split("/").last)
#     end
#     p.save
#   end
# end

# User.all.each do |user|
#   user.liked_post_ids = Post.all.ids.sample(rand(100..200))
#   rand(100..200).times do
#     Comment.create(
#       comment: Faker::Lorem.paragraph,
#       post_id: Post.all.ids.sample,
#       user_id: user.id
#     )
#   end
# end
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

FILES = ["gladys-aguayo-1Vk_u0LKd8Y-unsplash.jpg",
 "apostolos-vamvouras-FjvIsYAqoic-unsplash.jpg",
 "kevin-mueller-ZhMVRbv9GSc-unsplash.jpg",
 "christmas-market-550323_640.jpg",
 "christmas-market-550323_640.jpg",
 "gladys-aguayo-YezLCY0iE40-unsplash.jpg",
 "hans-veth-6VZC1vA-DMc-unsplash.jpg",
 "jessica-johnston-qmRAJHurxlw-unsplash.jpg",
 "mae-mu-GFhqNX1gE9E-unsplash.jpg",
 "cristian-castillo-JJJa95tXvm4-unsplash.jpg",
 "whoisbenjamin-K-2J2Zq2n6c-unsplash.jpg",
 "milada-vigerova-oWUtpsvh9W0-unsplash.jpg",
 "allison-christine-m8HsSWh-y6E-unsplash.jpg",
 "shawn-olivier-boivin-blanchard-zABac5d103M-unsplash.jpg",
 "josh-withers-76YjW4gEAsI-unsplash.jpg",
 "kevin-mueller-59HvwdKmJ5g-unsplash.jpg",
 "sydney-angove-7Mz54B4S244-unsplash.jpg",
 "reka-biro-horvath-qQs0C9a5cZY-unsplash.jpg",
 "eiliv-sonas-aceron-gqxSUgngBPA-unsplash.jpg",
 "peter-lloyd-H6U_0nC-Sbk-unsplash.jpg",
 "deva-williamson-HHebuDYjP4I-unsplash.jpg",
 "izabelle-acheson-l79eNht9xDU-unsplash.jpg",
 "alex-azabache-A59RzUpx9jA-unsplash.jpg",
 "lee-campbell-TMfiOzF2r94-unsplash.jpg",
 "duncan-kidd-Js4jgpksRGk-unsplash.jpg",
 "nathan-dumlao-rzngD0CglCA-unsplash.jpg",
 "jenny-caywood-Cm47M3T0QcE-unsplash.jpg",
 "samia-liamani-8C0dX5oF6iw-unsplash.jpg",
 "heather-barnes-AnLG86L_6nU-unsplash.jpg",
 "willian-justen-de-vasconcellos-7jwHx5q7WeA-unsplash.jpg",
 "sydney-angove-b93u53i1kz0-unsplash.jpg",
 "andy-holmes-D6TqIa-tWRY-unsplash.jpg",
 "sarah-wardlaw-pQlJ7A3JDLQ-unsplash.jpg",
 "s-well-VBuwD0ZQcnU-unsplash.jpg",
 "cheng-feng-qdlLUboRwxs-unsplash.jpg",
 "sydney-angove-GJJGpecwvMs-unsplash.jpg",
 "nathan-dumlao-h2mRfqoQuew-unsplash.jpg",
 "taneli-lahtinen-0cSOFraG4uc-unsplash.jpg",
 "gladys-aguayo-9QjXztpmw_0-unsplash.jpg",
 "dmitry-kovalchuk-ldBCVyYNIto-unsplash.jpg",
 "hussain-ibrahim-tH7m3OVa-pk-unsplash.jpg",
 "anita-austvika-LlpEfDVLhv8-unsplash.jpg",
 "toa-heftiba-gtYmfJRBa64-unsplash.jpg",
 "daniel-schludi-DzGefKHQA9A-unsplash.jpg",
 "martin-schmidli-mGy1Jjr2e6M-unsplash.jpg",
 "brandless-5ANIs0hlNRE-unsplash.jpg",
 "kevin-wolf-jZ0Q7vAOF7A-unsplash.jpg",
 "jeremy-bishop-Th9qSzP3ySo-unsplash.jpg",
 "sebastien-goldberg-3NoxefgvKfQ-unsplash.jpg",
 "the-nigmatic-pAGWDcyK9As-unsplash.jpg",
 "cristina-gottardi-ajYKLDAa9tQ-unsplash.jpg",
 "gladys-aguayo-n_dyccIgXNw-unsplash.jpg",
 "ingmar-hoogerhoud-otT2199XwI8-unsplash.jpg",
 "dylan-ferreira-0cv08T71zL0-unsplash.jpg",
 "anita-austvika-PfMDvyzryk4-unsplash.jpg",
 "zoltan-tasi-UbN6jSrhbyw-unsplash.jpg",
 "dylan-ferreira-PhObSCRfsAQ-unsplash.jpg",
 "cristian-castillo-vw6LqvBkd9E-unsplash.jpg",
 "julia-peretiatko-dyoagCegdvs-unsplash.jpg",
 "sarah-wardlaw-OyqdC4Zs-j4-unsplash.jpg",
 "anthony-espinosa-RZMUaO_f5NM-unsplash.jpg",
 "daniel-j-schwarz-Qhnsv_Ey2mA-unsplash.jpg",
 "kimiya-oveisi-bsZ-dG3ZMMo-unsplash.jpg",
 "daniel-j-schwarz-lERuUa_96uo-unsplash.jpg",
 "amber-kipp-75715CVEJhI-unsplash.jpg",
 "alex-meier-5S7i0ORPoYY-unsplash.jpg",
 "anthony-espinosa--ox0aXwrNxE-unsplash.jpg",
 "eiliv-sonas-aceron-2swKfMXVHRA-unsplash.jpg",
 "georgia-de-lotz-w0PGw7eCAYU-unsplash.jpg",
 "francesco-ungaro-GX81x7KTfIw-unsplash.jpg",
 "eiliv-sonas-aceron-lBHoa0OrWeI-unsplash.jpg",
 "jaron-mobley-7tHjDK0lPvU-unsplash.jpg",
 "nathalie-spehner-m9__3jvnB4k-unsplash.jpg",
 "raquel-garcia-BAiSZDx4LgE-unsplash.jpg",
 "joanna-kosinska--MFKq5JIHcw-unsplash.jpg",
 "nathan-dumlao-hlaXTWsu4G4-unsplash.jpg",
 "jenny-caywood-KAmNywG3VEE-unsplash.jpg",
 "jan-kopriva-p1SKuYXxqec-unsplash.jpg",
 "louis-hansel-EdVjnUdgw9I-unsplash.jpg",
 "toa-heftiba-Va03zGelZIk-unsplash.jpg",
 "sereja-ris-zGyG2OyLu4k-unsplash.jpg",
 "louis-hansel-st8a1OJwAb8-unsplash.jpg",
 "lesly-juarez-NuQ4ce_CIVI-unsplash.jpg",
 "eberhard-grossgasteiger-VDw-nsi5TpE-unsplash.jpg",
 "anita-austvika-QQjJXehkfqU-unsplash.jpg",
 "ionut-andrei-coman-xHSfeFZ7ZC8-unsplash.jpg",
 "cristofer-jeschke-3HjLaBmY2a4-unsplash.jpg",
 "jason-leung-XQhnWsv7SUk-unsplash.jpg",
 "max-andrey-QvMnYyk5Rj8-unsplash.jpg",
 "khloe-arledge--Uca3SGlOag-unsplash.jpg",
 "charles-lamb-zhHpn6iZGwk-unsplash.jpg",
 "runzi-zhu-a0U58gHCVRw-unsplash.jpg",
 "peter-neumann-JZRlnfsdcj0-unsplash.jpg",
 "fezbot2000-B-wYmhZGIsw-unsplash.jpg",
 "yulia-khlebnikova-t_XM5pTc6wc-unsplash.jpg",
 "weronika-karczewska-6aAvzce1coc-unsplash.jpg",
 "toshi-K5pLGYJMHKk-unsplash.jpg",
 "husen-siraaj-zyJkh98ySE0-unsplash.jpg",
 "jenny-caywood-BrPp2II_xcs-unsplash.jpg",
 "bady-qb-UKUsWfnm7cA-unsplash.jpg",
 "yulia-khlebnikova-oh5MXKl9OHo-unsplash.jpg"]

20.times {
  User.create(
    username: Faker::Internet.unique.username,
    email: Faker::Internet.unique.safe_email,
    password: "123456")
  }

User.all.each do |user|
  user.following_ids = User.all.ids.sample(rand(10..20)).reject{ |i| i == user.id }
  rand(5..10).times do  
    p = Post.new(
      author_id: user.id,
      caption: Faker::Lorem.paragraph
    )
    rand(1..3).times do
      filename = FILES.sample
      file = open('https://framagram-seeds.s3-us-west-1.amazonaws.com/' + filename)
      p.photos.attach(io: file, filename: filename)
    end
    p.save
  end
end

User.all.each do |user|
  user.liked_post_ids = Post.all.ids.sample(rand(50..100))
  rand(100..200).times do
    Comment.create(
      comment: Faker::Lorem.paragraph,
      post_id: Post.all.ids.sample,
      user_id: user.id
    )
  end
end

       #files = Dir.glob("app/assets/images/*.jpg")
      #file = File.open(files.sample)
      #p.photos.attach(io: file, filename: file.path.split("/").last)
      # https://framagram-seeds.s3-us-west-1.amazonaws.com/
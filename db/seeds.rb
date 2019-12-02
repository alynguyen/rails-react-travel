# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


9.times do |i|
  Post.create(
    user: 1,
    location: "Antioch",
    description: "This is a description of a place that we can take notes on and it will help sometime in the future. Rails is pretty cool."
  )
end
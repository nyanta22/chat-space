FactoryGirl.define do
  factory :message do
    content Faker::Lorem.sentence
    image File.open("#{Rails.root}/public/image/IMG_1156.jpeg")
    user
    group
  end
end

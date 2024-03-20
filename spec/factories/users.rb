FactoryBot.define do
  factory :user do
    name { Faker::Lorem.characters(number: 20, min_alpha: 4, min_numeric: 2) }
    email { Faker::Internet.email }
    password { Faker::Internet.password(min_length: 6) }
    password_confirmation { password }

    after(:build) do |user|
      user.imageName.attach(io: File.open('public/images/test_image.png'), filename: 'test_image.png')
    end
  end
end

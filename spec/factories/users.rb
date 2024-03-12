FactoryBot.define do
  factory :user do
    name { Faker::Internet.username }
    email {Faker::Internet.email}
    password {Faker::Internet.password(min_length: 6)}
    password_confirmation {password}


    after(:build) do |user|
      user.imageName.attach(io: File.open('public/images/test_image.png'), filename: 'test_image.png')
    end
  end
end

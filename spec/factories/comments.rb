FactoryBot.define do
  factory :comment do
    content {Faker::Lorem.sentence}
    association :user
    association :post
    rating { Faker::Number.between(from: 1, to: 5) }
  end
end

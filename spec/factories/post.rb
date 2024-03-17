FactoryBot.define do
  factory :post do
    association :facility
    association :user
  end
end

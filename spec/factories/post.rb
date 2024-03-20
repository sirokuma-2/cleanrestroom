FactoryBot.define do
  factory :post do
    association :facility
    association :user
    hashId { Digest::SHA256.hexdigest("#{id}#{Time.current.to_i}") }
  end
end

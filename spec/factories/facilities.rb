FactoryBot.define do
  factory :facility do
    name { Faker::Address.city }
    address { Faker::Address.street_address }
    content {Faker::Lorem.sentence}
    latitude {Faker::Number.between(from: 35.681236 - 0.1, to: 35.681236 + 0.1)}
    longitude {Faker::Number.between(from: 139.767125 - 0.1, to: 139.767125 + 0.1)}
    nursing_room { Faker::Number.between(from: 0, to: 1) }
    anyone_toilet { Faker::Number.between(from: 0, to: 1) }
    diaper_changing_station { Faker::Number.between(from: 0, to: 1) }
    powder_corner { Faker::Number.between(from: 0, to: 1) }
    stroller_accessible { Faker::Number.between(from: 0, to: 1) }
  end
end

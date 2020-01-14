class Post < ApplicationRecord
  validates :username, presence: true
  validates :location, presence: true
  validates :description, presence: true
  validates :lat, presence: false
  validates :lng, presence: false
  validates :reference, presense: false
  validates :place_id, presense: false
end

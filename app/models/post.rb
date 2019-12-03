class Post < ApplicationRecord
  validates :username, presence: true
  validates :location, presence: true
  validates :description, presence: true
end


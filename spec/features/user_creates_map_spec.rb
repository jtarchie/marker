require 'rails_helper'

feature 'When user visits the site' do
  pending 'and creates a map', :js do
    visit '/'

    fill_in "ng-place-autocompleter input", with: '11211'
    expect(page).to have_content 'Brooklyn, NY'
  end
end

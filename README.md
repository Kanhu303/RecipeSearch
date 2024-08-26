# Chat bot assignment

## Overview

The Recipe Finder App is a mobile application built with React Native that allows users to search for recipes by name. The app fetches data from the Spoonacular API and displays detailed step-by-step instructions for each recipe, including the ingredients and equipment required. Additionally, the app includes voice recognition features to search for recipes using voice commands.

## Features

Recipe Search: Search for recipes by name or ingredient using the Spoonacular API.
Recipe Details: View detailed step-by-step instructions for each recipe, including ingredients and equipment.
Voice Recognition: Use voice commands to search for recipes.
Navigation: Navigate between screens using React Navigation.
State Management: Manage application state using Redux Toolkit.
Persistent Storage: Save the latest search result in Async Storage for quick access.
Tech Stack
React Native: The framework used to build the mobile app.
Redux Toolkit: For managing global state across the app.
React Navigation: For handling navigation between screens.
Axios: For making API requests to the Spoonacular API.
Async Storage: For storing the latest search result locally.
react-native-voice: For implementing voice recognition functionalities.
Installation
Prerequisites
Node.js
npm or yarn
React Native CLI or Expo CLI
Steps
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/recipe-finder-app.git
Navigate to the project directory:

bash
Copy code
cd recipe-finder-app
Install the dependencies:

bash
Copy code
npm install

## or

yarn install
Install the required native dependencies:

bash
Copy code
npx pod-install ios
Run the app on an Android or iOS simulator:

bash
Copy code
npx react-native run-android

## or

npx react-native run-ios

# Usage

# Search for Recipes:

On the main screen, enter a recipe name or ingredient in the search bar and press the search button to fetch results.
View Recipe Details:

Tap on any recipe from the search results to view detailed instructions, ingredients, and equipment.
Voice Search:

Use the microphone button to initiate a voice search. Speak the name of the recipe or ingredient to see results.
Go Back:

Use the "Go Back" button in the header to navigate back to the previous screen.
Project Structure
bash

/recipe-finder-app
│
├── /android # Android-specific files
├── /ios # iOS-specific files
├── /src # Source files
│ ├── /components # Reusable components
│ ├── /navigation # Navigation setup
│ ├── /redux # Redux Toolkit setup and slices
│ ├── /screens # Application screens
│ ├── /services # API service functions
│ └── /utils # Utility functions
│
├── App.tsx # Main entry point for the app
├── package.json # Project dependencies and scripts
└── README.md # This file

## API Integration

The app integrates with the Spoonacular API to fetch recipe details. To use the API, you will need an API key, which you can obtain by signing up on their website.

Replace the SPOONACULAR_API_KEY variable in the RecipeDetail component with your actual API key.

# Vocabulary Builder

## Table of Contents

- [Overview](#overview)
  - [Description](#description)
  - [Motivation](#motivation)
  - [Problem Statement](#problem-statement)
  - [Video Demo](#video-demo)
  - [Mobile Demo](#mobile-demo)
  - [Live Demo](#live-demo)
- [Getting Started](#getting-started)
  - [Built with](#built-with)
  - [Dependencies](#dependencies)
- [Features](#features)
  - [Key Features](#key-features)
  - [Future Features](#future-features)
- [API](#api)
- [License](#license)

## Overview

### Description

This is a Vocabulary Builder app that is built with React, Tailwind CSS, and HTML. It is designed to enhance user vocabulary in a seamless and engaging way. This app is built as a personal project to practice React and Tailwind CSS. It is currently a front-end only app using local storage to store the data but will be updated to a full-stack app that use MongoDB in the future.

### Motivation

The inspiration behind this project came from my own experiences as someone whose first language is not English and also my husband, who is currently learning English. We both experienced the difficulty in expanding our English vocabulary due to the lack of engaging and customizable tools available. Hence, I felt compelled to create an vocabulary app that offers a built-in dictionary but also grants user the ability to customize their learning journey.

### Problem Statement

Existing vocabulary-building tools often follow a rigid, one-size-fits-all approach, offering a predefined list of words that may not suit learners of various proficiency levels. Additionally, these tools typically lack dynamic features for customization, particularly the ability for users to associate images with words. This feature is especially valuable for individuals with dyslexia, for whom visual aids play a crucial role in learning.

Furthermore, conventional tools struggle to deliver engaging learning experiences like flashcards or quizzes tailored to vocabulary acquisition. While there are plenty of flashcard apps available, they often lack a dedicated built-in dictionary for seamless learning.

### Video Demo

https://github.com/TiffanyChan614/Vocabulary-Builder/assets/68774129/e029515f-b6e4-48aa-a5c2-5ad8f9eed987

### Mobile Demo

<img width="307" alt="home" src="https://github.com/TiffanyChan614/Vocabulary-Builder/assets/68774129/74efd71c-5622-445e-87b2-77beafbda129">
<img width="312" alt="search" src="https://github.com/TiffanyChan614/Vocabulary-Builder/assets/68774129/836cff49-fd2d-4338-8aad-b18d334a2b26">
<img width="310" alt="journal" src="https://github.com/TiffanyChan614/Vocabulary-Builder/assets/68774129/448c9da0-378b-4953-bdb0-eb30fc8c12ac">
<img width="311" alt="flashcards" src="https://github.com/TiffanyChan614/Vocabulary-Builder/assets/68774129/0e797a7d-3549-41e6-a556-1d9faaba35af">
<img width="312" alt="quiz" src="https://github.com/TiffanyChan614/Vocabulary-Builder/assets/68774129/19243ce3-79b5-41b8-87d6-4f284224454d">

### Live Demo

Since this app is using the freemium plan of WordsAPI, the number of requests per day is limited. If you are interested in this app, please email me at tiffanychan1999614@gmail.com to get the live demo link.

## Getting Started

### Built with

- HTML 5
- React JS
- Figma
- Tailwind CSS
- React Router
- Redux
- REST API
- create-react-app

### Run Locally

Clone the project

```bash
  git clone https://github.com/TiffanyChan614/Vocabulary-Builder.git
```

Go to the project directory

```bash
  cd Vocabulary-Builder/vocabularybuilder
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

### Dependencies

This project depends on the following packages:

- `classnames` (version ^2.3.2): A JavaScript utility for conditionally joining classNames together.
- `he` (version ^1.2.0): A robust HTML entity encoder/decoder.
- `react` (version ^18.2.0): A JavaScript library for building user interfaces.
- `react-dom` (version ^18.2.0): A package for working with the DOM in React applications.

### Development Dependencies

This project also has the following development dependencies:

- `@types/react` (version ^18.0.37): TypeScript definitions for the React library.
- `@types/react-dom` (version ^18.0.11): TypeScript definitions for the react-dom package.
- `@vitejs/plugin-react` (version ^4.0.0): A Vite plugin for React development.
- `eslint` (version ^8.38.0): A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- `eslint-plugin-react` (version ^7.32.2): An ESLint plugin for React-specific linting rules.
- `eslint-plugin-react-hooks` (version ^4.6.0): An ESLint plugin for enforcing rules of Hooks in React applications.
- `eslint-plugin-react-refresh` (version ^0.3.4): An ESLint plugin for react-refresh.
- `vite` (version ^4.4.2): A frontend tooling platform that provides faster and leaner development for modern web projects.

## Features

### Key Features

- **Built-in Dictionary**: Users can search for words directly within the application, providing quick access to definitions and information.

- **Dynamic Word Form**: Customize word information and add it to a personal journal for future review. This feature enables users to tailor the content to their learning preferences.

- **Image API Integration**: Utilizes a built-in image API to retrieve related images for visual association with words. Users can also upload their own images to associate with specific words.

- **Voice Pronunciation**: Provides voice pronunciation for words, allowing users to learn the correct pronunciation.

- **Word of the Day**: Displays a new word each day, allowing users to learn new words every day.

- **Part of Speech Filters**: Filter words based on their part of speech, allowing users to focus on specific categories for targeted learning.

- **Show Details**: Users can choose to show or hide word details, providing a clean and simple interface for learning.

- **Sort Journal Words**: Users have the ability to sort their journal words, providing an organized and efficient way to review and manage their vocabulary.

- **Persistent Filter, Show Details and Sort Settings**: Filter, show details, and sort settings persist across pages, ensuring that user preferences are maintained throughout their learning journey.

- **Review Modes**:

  - **Flashcards**: Engage in a flashcard-based review mode for efficient and effective learning.
  - **Quiz Mode**: Test your knowledge with a dynamic quiz mode that includes various question types.

- **Smart Review Algorithm**: Utilizes an algorithm that intelligently selects words for review. It prioritizes words with the lowest scores (indicating greater difficulty) and those with the earliest review dates.

- **Diverse Question Types**: Offers a variety of question types to keep the review process engaging and effective, including multiple choice that asks about the definition, synonym, antonym of a word, and fill-in-the-blank questions that show either the definition or one of the images associated with the word and user has to type in the word.

- **Fully Responsive**: The app is fully responsive and can be used on mobile devices.

### Future Features

- **User Authentication**: Users can create an account and log in to access their data from any device.
- **MongoDB Integration**: Store user data in a database to allow for data persistence across devices.
- **User Profile**: Users can view their profile and see their progress.
- **Performance Tracking**: Users can view their performance and progress over time.

## API

- [WordsAPI](https://www.wordsapi.com/)
- [pexels](https://www.pexels.com/api/)
- Browser Speech Synthesis API

## License

[MIT](https://choosealicense.com/licenses/mit/)

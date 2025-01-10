<p align="center"><h1 align="center">Arogyam HMS</h1></p>
<p align="center">
    Project for BITS Postman Hack
</p>
<p align="center">
    <img src="https://img.shields.io/github/last-commit/SakshhamTheCoder/BITS_HACK_HMS?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
    <img src="https://img.shields.io/github/languages/top/SakshhamTheCoder/BITS_HACK_HMS?style=default&color=0080ff" alt="repo-top-language">
    <img src="https://img.shields.io/github/languages/count/SakshhamTheCoder/BITS_HACK_HMS?style=default&color=0080ff" alt="repo-language-count">
</p>
<p align="center"><!-- default option, no dependency badges. -->
</p>
<p align="center">
    <!-- default option, no dependency badges. -->
</p>
<br>

## Table of Contents

-   [ Overview](#-overview)
-   [ Features](#-features)
-   [ Project Structure](#-project-structure)
-   [ Getting Started](#-getting-started)
    -   [ Prerequisites](#-prerequisites)
    -   [ Installation](#-installation)
    -   [ Usage](#-usage)
-   [ Contributing](#-contributing)
-   [ Acknowledgments](#-acknowledgments)

---

## Overview

This project is a comprehensive hospital management system designed for users to find doctors, book appointments and summarise health reports and hospital staff to manage their patients

---

## Features

-   Nearby Hospital Locator
-   Appointment Scheduling
-   AI-based Health Report Summarisation

---

## Project Structure

```sh
└── BITS_HACK_HMS/
    ├── README.md
    ├── backend
    │   ├── .gitignore
    │   ├── controllers
    │   ├── index.js
    │   ├── middlewares
    │   ├── models
    │   ├── package-lock.json
    │   ├── package.json
    │   ├── routes
    │   └── services
    └── frontend
        ├── .gitignore
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── public
        ├── src
        ├── tailwind.config.js
        └── vite.config.js
```

## Getting Started

### Prerequisites

Before getting started with BITS_HACK_HMS, ensure your runtime environment meets the following requirements:

-   **Programming Language:** JavaScript
-   **Frameworks and Libraries:** React, Express, Firebase, TailwindCSS, Recharts, Leaflet, Nodemon
-   **Package Manager:** Npm

### Installation

Install BITS_HACK_HMS using one of the following methods:

**Build from source:**

1. Clone the BITS_HACK_HMS repository:

```sh
❯ git clone https://github.com/SakshhamTheCoder/BITS_HACK_HMS
```

2. Navigate to the project frontend and backend directories individually:

```sh
❯ cd BITS_HACK_HMS/frontend
❯ cd BITS_HACK_HMS/backend
```

3. Install the project dependencies:

**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

```sh
❯ npm install
```

4. Create a `.env` file inside `/backend` folder and add your `GEMINI_API_KEY` to use Google Gemini AI inside the project:

```txt
GEMINI_API_KEY=<api_key>
```

5. Add the `serviceAccountKey.json` file in `/backend/config` downloaded from Firebase console

6. Add a firebase.js file inside `/frontend/src/helpers` and fill the empty details:

```js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
```

### Usage

Run BITS_HACK_HMS using the following command:
**Using `npm`** &nbsp; [<img align="center" src="https://img.shields.io/badge/npm-CB3837.svg?style={badge_style}&logo=npm&logoColor=white" />](https://www.npmjs.com/)

Frontend

```sh
❯ npm run dev
```

Backend

```sh
❯ nodemon
```

---

## Project Roadmap

-   [x] **`Task 1`**: <strike>Implement feature one.</strike>
-   [ ] **`Task 2`**: Implement feature two.
-   [ ] **`Task 3`**: Implement feature three.

---

## Contributing

-   **💬 [Join the Discussions](https://github.com/SakshhamTheCoder/BITS_HACK_HMS/discussions)**: Share your insights, provide feedback, or ask questions.
-   **🐛 [Report Issues](https://github.com/SakshhamTheCoder/BITS_HACK_HMS/issues)**: Submit bugs found or log feature requests for the `BITS_HACK_HMS` project.
-   **💡 [Submit Pull Requests](https://github.com/SakshhamTheCoder/BITS_HACK_HMS/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
    ```sh
    git clone https://github.com/SakshhamTheCoder/BITS_HACK_HMS
    ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
    ```sh
    git checkout -b new-feature-x
    ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
    ```sh
    git commit -m 'Implemented new feature x.'
    ```
6. **Push to github**: Push the changes to your forked repository.
    ```sh
    git push origin new-feature-x
    ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
 </details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="left">
   <a href="https://github.com{/SakshhamTheCoder/BITS_HACK_HMS/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=SakshhamTheCoder/BITS_HACK_HMS">
   </a>
</p>
</details>

---

## Acknowledgments

-   Team Members
    Dhruv Goyal
    Navnoor Bawa
    Sakshham Bhagat
    Shree Mishra

---


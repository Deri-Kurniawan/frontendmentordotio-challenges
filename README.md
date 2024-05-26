# Front-End Challenges on frontendmentor.io

This repository contains the solutions to the challenges on [frontendmentor.io](https://www.frontendmentor.io/challenges).

This repository is part of my journey to dive deeper into front-end development and improve my skills.

Do not use these solutions to cheat. Try to solve the challenges on your own first. If you get stuck, you can refer to these solutions for help or inspiration.

## Table of Challenges

| No. | Name              | Difficulty                                                   |
| --- | ----------------- | ------------------------------------------------------------ |
| 1   | QR Code Component | ![](https://img.shields.io/badge/Difficulty-Newbie-blue.svg) |

## Commit Conventions

I use the following [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

Structure:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Example Pattern:

```
<type>(challange-n): commit message
```

## Screenshots Scripts

I created a script `./_scripts/executable/screenshot.js` to take screenshots of the challenges solutions.

### Installation

```bash
npm install
```

### Configuration

You can edit the list of tasks in the `./_scripts/executable/screenshot.js` file.

```javascript
const ONLY_RUN_TASK_LIST_ID = [];
const TASK_LIST = [];
```

### Usage

to take screenshots:

```bash
npm run ss
```

or watch changes mode:

```bash
npm run ss:watch
```

# Maka-i

> Maka'i is a Paraguayan card game, similar to [Blackjack](https://en.wikipedia.org/wiki/Blackjack) and [Siete y media](https://en.wikipedia.org/wiki/Sette_e_mezzo).

<p>
:rocket:
<a href="https://maka-i.herokuapp.com/">Play now</a>
</p>

## Table of Contents
- [Maka-i](#maka-i)
  - [Table of Contents](#table-of-contents)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Usage](#usage)
    - [Building a distribution version](#building-a-distribution-version)
    - [Serving the app](#serving-the-app)
    - [CLI](#cli)
    - [Development](#development)
    - [Running the tests](#running-the-tests)
  - [Built With](#built-with)
  - [TODO](#todo)
  - [License](#license)

## Getting Started

### Prerequisites

This project requires [Node](http://nodejs.org/) and [NPM](https://npmjs.org/).

### Installation

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/adrian2358/maka-i.git
$ cd maka-i
```

Install NPM packages:

```sh
$ npm install
```

## Usage

### Building a distribution version

```sh
$ npm run build
```

### Serving the app

```sh
$ npm start
```
_Note:_ this requires [Building a distribution version](#building-a-distribution-version).


### CLI
Play the game on a terminal:
```sh
$ npm run maka-i
```

### Development

Run the backend on a development server:

```sh
$ npm run dev
```

Run the vue app on a development server:

```sh
$ cd client
$ npm run serve
```

### Running the tests

```sh
$ npm test
```

## Built With

- [Vue](https://vuejs.org/) :heart:
- [Vue-socket.io](https://www.npmjs.com/package/vue-socket.io)
- [Vue-toasted](https://www.npmjs.com/package/vue-toasted)
- [Bootstrap](https://v5.getbootstrap.com/)
- [Express](https://www.npmjs.com/package/express)
- [Socket.io](https://www.npmjs.com/package/socket.io)

## TODO

- [ ] Better UI/UX
- [ ] Better tests

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

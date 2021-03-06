<img src="https://raw.githubusercontent.com/mhaagens/gql-to-mobx/master/screenshot_1.png" width="600" height="auto">

# gql-to-mobx [WIP]
#### A library for converting GraphQL-types to Mobx State Tree models. 

### What's the goal?

Converting GraphQL-types (with subtypes etc.) to Mobx State Tree-models to avoid multiple type definitions
in a project using GraphQL and MST.

### Want to help build it?

This project is mostly started as a personal project because it's something I feel would be really awesome to have.
I'll be working on it whenever I have some spare time, so if anyone wants to join me in creating in then hit me up. 
Anyone is welcome!

Hit me up on Twitter: [@mhaagens](https://twitter.com/mhaagensli)

### What can you help with?

- [ ] Refactoring
- [ ] Creating MobX-State-Tree specific GQL types (enum, references, identifier etc.)
- [ ] TypeScript/FlowType type-checking
- [ ] Tests
- [ ] ?

### How to get started
- ```git clone https://github.com/mhaagens/gql-to-mobx.git```
- ```yarn install```
- Run webpack in watch mode: ```npm start```
- Then you can run ```node ./dist/index.js```, if you change anything it will be caught on the next run.

### Libraries:
- [MobX State Tree](https://github.com/mobxjs/mobx-state-tree)
- [GraphQL](http://graphql.org/)

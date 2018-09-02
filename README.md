# vue-rectangle-playground
Sample of Vue+Node+Mongo app which have CRUD and drawing for rectangles

## Features
* first-click - start draw rectangle, move mouse for needed size, second-click - set rectangle size
* click on the rectangle to select it
* drag and drop rectangles
* color of new rectengles are random
* all changes will save to backend
* press "delete" or "backspace" on keyboard for delete rectangle

## Tech
* backend: Mongo, Node.js. Packages: Mongoose, express-mongo-crud
* front: Vue.js, Vuex, axios. Scaffolding by VUE CLI 3. NGINX for static and proxy-to-api.
* all in Docker for deploy

## Start
```
cd backend
npm install
cd ..
docker-compose up --build
go to browser http://localhost
```

### Develop
```
cd backend
npm install
cd ../frontend
npm install
docker-compose up --build
npm run serve
```

### Запуск проекта

```
$ npm install
$ npm run build:production или webpack
$ npm start
```
При npm start выполнится команда pm2 start server.js. Сервер запустится на 3000 порту.

### Используемые технологии
- React
- React-router
- Redux
- PostCSS
- Hapi
- Webpack

### Структура проекта
```
ulportal
|__ client
|  |__ components
|  |__ containers
|  |__ css
|  |__ modules
|  |  |__module_name
|  |  |  |__ actions
|  |  |  |__ reducers
|  |  |  |__ constants.js
|  |  |__ reducers.js
|  |__ routes
|  |  |__ route_name
|  |     |__ components
|  |     |  |__ component_name
|  |     |     |__ index.js
|  |     |     |__ styles.css
|  |     |__ containers
|  |     |  |__ container_name
|  |     |     |__index.js
|  |     |__ subroute
|  |__ store
|  |  |__ index.js
|  |__ utils
|  |__ app.js
|__ server
|  |__ config
|  |__ middleware
|  |__ routes
|  |__ templates
|__ server.js
```

В папке /client находятся исходники клиентского SPA-приложения.

В папках /components и /containers находятся компоненты и контейнеры общего назначания.

В папке /css лежат общие стили, содержащие, например, константы цветов/размеров.

В папке /modules лежат модули Redux. Каждый модуль содержит папки /actions и /reducers, файл constants.js.

В папке /routes лежат контейнеры и компоненты, характерные для определенного адреса.

В папке /server находятся исходники серверной части приложения.

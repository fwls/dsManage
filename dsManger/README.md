[honojs](https://hono.dev/)
[sutando](https://sutando.org/zh_CN/)

```
honojs sutando rest api template

npm run migrate
npm run seed
npm run dev
```

### login
```
curl --location 'http://127.0.0.1:8787/api/auth/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "admin",
    "password": "123456"
}'
```

### auth
```
curl --location 'http://127.0.0.1:8787/api/index' \
--header 'authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImV4cCI6MTcxNTE0MjYyNDY3N30.eYtxNih-Sk2FJYJB_SJ-1XuesNNnRcV2zlNw7RyGIdw'
```
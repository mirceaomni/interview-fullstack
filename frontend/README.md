# Frontend

## Install 

```
npm install
```

## Run dev

```
npm run dev
```

## APIs

```bash
# login
curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "alice@doe.com",
    "password": "123"
}'

# get projects
curl --location 'http://localhost:3000/projects'
```

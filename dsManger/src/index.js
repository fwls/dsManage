import express from 'express'
import { secretKey } from './config/index.js'

const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Express!');
});

app.use(
    expressjwt({
        secret: secretKey,
        algorithms: ["HS256"],
    }).unless({ path: [/^\/api\//] })
);

import indexController from './controllers/index.js'
import authApiV1Controller from './controllers/api/v1/auth.js'

app.use("/index", indexController);
app.use("/api/v1/auth", authApiV1Controller);

app.use((err, req, res, next) => {
    if (err.name === "UnauthorizedError") {
        return res.send({ status: 401, message: "无效的 token" });
    }
    res.send({ status: 500, message: "未知的错误" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const api_1 = tslib_1.__importDefault(require("./routes/api"));
require("dotenv/config");
const app = (0, express_1.default)();
const { PORT } = process.env;
app.use(express_1.default.json());
app.use('/api', api_1.default);
app.use((_, res) => {
    res.status(404).json({ message: 'Not found' });
});
app.listen(PORT, () => {
    console.log(`App listening on: http://localhost:${PORT}`);
});
//# sourceMappingURL=app.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_, res) => {
    res.json({ message: 'Welcome to the Blog API' });
});
exports.default = router;
//# sourceMappingURL=api.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
require("colors");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const SBRoutes_1 = __importDefault(require("./Routes/SBRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 99;
app.use((0, body_parser_1.json)());
app.use((0, cors_1.default)({
    origin: '*',
}));
app.use('/api', SBRoutes_1.default);
app.use('/*', (req, res) => {
    res.status(404).json({
        error: 'This path does not exist',
    });
});
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`.bgGreen.bold);
});

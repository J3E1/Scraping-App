"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const SBControllers_1 = require("../Controllers/SBControllers");
const SBRouter = (0, express_1.Router)();
SBRouter.route('/scrap').post(SBControllers_1.scrapUrl);
SBRouter.route('/screenshot').post(SBControllers_1.scrapUrl);
exports.default = SBRouter;

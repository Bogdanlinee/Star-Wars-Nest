"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleModule = void 0;
const common_1 = require("@nestjs/common");
const people_service_1 = require("./people.service");
const people_controller_1 = require("./people.controller");
let PeopleModule = class PeopleModule {
};
exports.PeopleModule = PeopleModule;
exports.PeopleModule = PeopleModule = __decorate([
    (0, common_1.Module)({
        controllers: [people_controller_1.PeopleController],
        providers: [people_service_1.PeopleService],
    })
], PeopleModule);
//# sourceMappingURL=people.module.js.map
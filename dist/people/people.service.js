"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
let PeopleService = class PeopleService {
    constructor() {
        this.people = [];
    }
    create(createPersonDto) {
        const newPerson = {
            ...createPersonDto,
            id: parseInt(Date.now().toString()),
        };
        this.people.push(newPerson);
        return newPerson;
    }
    findAll() {
        if (this.people.length > 10) {
            return this.people.slice(this.people.length - 10);
        }
        else {
            return this.people;
        }
    }
    findOne(id) {
        const person = this.people.find(item => item.id === id);
        if (!person) {
            throw new Error('No person with such id');
        }
        return person;
    }
    update(id, updatePersonDto) {
        const person = this.findOne(id);
        const updatedPerson = {
            ...person,
            ...updatePersonDto,
        };
        this.people = this.people.map((item) => {
            if (item.id === id) {
                item = {
                    ...person,
                    ...updatedPerson,
                };
            }
            return item;
        });
        return updatedPerson;
    }
    remove(id) {
        const person = this.findOne(id);
        this.people = this.people.filter((item) => item.id !== id);
        return person;
    }
};
exports.PeopleService = PeopleService;
exports.PeopleService = PeopleService = __decorate([
    (0, common_1.Injectable)()
], PeopleService);
//# sourceMappingURL=people.service.js.map
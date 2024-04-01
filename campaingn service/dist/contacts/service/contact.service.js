"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const contact_repository_1 = require("../data/contact.repository");
let ContactService = class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async createContact(contact) {
        const trakingContact = await this.contactRepository.createContact(contact);
        if (!trakingContact) {
            throw new common_1.NotFoundException('Contact not found');
        }
        if (trakingContact === 400) {
            return { message: 'contact already exist', statusCode: 404 };
        }
        return trakingContact;
    }
    async getAllContacts(page, pageSize) {
        const contacts = await this.contactRepository.getAllContacts();
        if (contacts.length > 0) {
            const totalPages = Math.ceil(contacts.length / pageSize);
            if (page && (page < 1 || page > totalPages)) {
                throw new common_1.NotFoundException('Invalid page number');
            }
            const startIndex = (page - 1) * pageSize;
            const endIndex = startIndex + pageSize;
            const paginatedResult = contacts.slice(startIndex, endIndex);
            return {
                data: paginatedResult,
                totalPages: totalPages,
                currentPage: page,
            };
        }
        else {
            return [];
        }
    }
    async getContactById(id) {
        const contact = await this.contactRepository.getContactById(id);
        try {
            return contact;
        }
        catch (error) {
            throw new error(error);
        }
    }
    async deleteContact(id) {
        try {
            return await this.contactRepository.deleteContact(id);
        }
        catch (error) {
            throw new common_1.NotFoundException('Contact not deleted');
        }
    }
    async putContact(id, contactDTO) {
        const putContact = await this.contactRepository.putContact(id, contactDTO);
        return putContact;
    }
    async putContactCompany(id, company) {
        const putContactCompany = await this.contactRepository.putContactCompany(id, company);
        return putContactCompany;
    }
    async putContactPerson(id, person) {
        const putContactPerson = await this.contactRepository.putContactPerson(id, person);
        return putContactPerson;
    }
    async getContactByCompanyId(companyId) {
        const contact = await this.contactRepository.getContactByCompanyId(companyId);
        try {
            return contact;
        }
        catch (error) {
            throw new error(error);
        }
    }
    async getContactByPersonId(personId) {
        const contact = await this.contactRepository.getContactByPersonId(personId);
        try {
            return contact;
        }
        catch (error) {
            throw new error(error);
        }
    }
};
exports.ContactService = ContactService;
exports.ContactService = ContactService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [contact_repository_1.ContactRepository])
], ContactService);
//# sourceMappingURL=contact.service.js.map
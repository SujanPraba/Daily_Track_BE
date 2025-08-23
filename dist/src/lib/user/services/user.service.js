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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const user_repository_1 = require("../repositories/user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const existingUser = await this.userRepository.findByEmail(createUserDto.email);
        if (existingUser) {
            throw new common_1.BadRequestException('User with this email already exists');
        }
        const { projectRoleAssignments, teamId, ...userData } = createUserDto;
        const hashedPassword = await bcrypt.hash(userData.password, 12);
        const userToCreate = {
            ...userData,
            password: hashedPassword,
        };
        const createdUser = await this.userRepository.create(userToCreate);
        if (projectRoleAssignments && projectRoleAssignments.length > 0) {
            await this.userRepository.assignProjectRoles(createdUser.id, projectRoleAssignments);
        }
        if (teamId && (!projectRoleAssignments || projectRoleAssignments.length === 0)) {
            await this.userRepository.assignTeam(createdUser.id, teamId);
        }
        return createdUser;
    }
    async findAll() {
        return this.userRepository.findAll();
    }
    async searchUsers(searchDto) {
        return this.userRepository.searchUsers(searchDto);
    }
    async findOne(id) {
        const user = await this.userRepository.findById(id);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async findByEmail(email) {
        return this.userRepository.findByEmail(email);
    }
    async findByEmailForAuth(email) {
        const result = await this.userRepository.findByEmailRaw(email);
        return result;
    }
    async findUserWithCompleteInformation(userId) {
        return this.userRepository.findUserWithCompleteInformation(userId);
    }
    async update(id, updateUserDto) {
        const user = await this.findOne(id);
        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 12);
        }
        const { projectRoleAssignments, teamId, ...userData } = updateUserDto;
        const updatedUser = await this.userRepository.update(id, userData);
        if (projectRoleAssignments !== undefined) {
            await this.userRepository.assignProjectRoles(id, projectRoleAssignments);
        }
        if (teamId !== undefined && projectRoleAssignments === undefined) {
            await this.userRepository.assignTeam(id, teamId);
        }
        return updatedUser;
    }
    async remove(id) {
        const user = await this.findOne(id);
        await this.userRepository.delete(id);
    }
    async assignProjectRoles(userId, projectRoleAssignments) {
        const user = await this.findOne(userId);
        await this.userRepository.assignProjectRoles(userId, projectRoleAssignments);
    }
    async assignTeam(userId, teamId) {
        const user = await this.findOne(userId);
        await this.userRepository.assignTeam(userId, teamId);
    }
    async getUserProjectRoles(userId) {
        return this.userRepository.getUserProjectRoles(userId);
    }
    async getUserTeams(userId) {
        return this.userRepository.getUserTeams(userId);
    }
    async getUserRoles(userId) {
        return this.userRepository.getUserRoles(userId);
    }
    async hasPermission(userId, permissionName) {
        return this.userRepository.hasPermission(userId, permissionName);
    }
    async getUserProjectIds(userId) {
        return this.userRepository.getUserProjectIds(userId);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=user.service.js.map
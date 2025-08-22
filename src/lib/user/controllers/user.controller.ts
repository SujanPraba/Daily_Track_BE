import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { AssignProjectDto } from '../dtos/assign-project.dto';
import { AssignTeamDto } from '../dtos/assign-team.dto';
import { AssignRoleDto } from '../dtos/assign-role.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'User found' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

  @ApiOperation({ summary: 'Assign user to project' })
  @ApiResponse({ status: 200, description: 'User assigned to project successfully' })
  @Post(':id/projects')
  assignToProject(@Param('id') id: string, @Body() assignProjectDto: AssignProjectDto) {
    return this.userService.assignToProject(id, assignProjectDto.projectId);
  }

  @ApiOperation({ summary: 'Assign user to team' })
  @ApiResponse({ status: 200, description: 'User assigned to team successfully' })
  @Post(':id/teams')
  assignToTeam(@Param('id') id: string, @Body() assignTeamDto: AssignTeamDto) {
    return this.userService.assignToTeam(id, assignTeamDto.teamId);
  }

  @ApiOperation({ summary: 'Assign role to user' })
  @ApiResponse({ status: 200, description: 'Role assigned to user successfully' })
  @Post(':id/roles')
  assignRole(@Param('id') id: string, @Body() assignRoleDto: AssignRoleDto) {
    return this.userService.assignRole(id, assignRoleDto.roleId);
  }

  @ApiOperation({ summary: 'Get user projects' })
  @ApiResponse({ status: 200, description: 'User projects retrieved' })
  @Get(':id/projects')
  getUserProjects(@Param('id') id: string) {
    return this.userService.getUserProjects(id);
  }

  @ApiOperation({ summary: 'Get user teams' })
  @ApiResponse({ status: 200, description: 'User teams retrieved' })
  @Get(':id/teams')
  getUserTeams(@Param('id') id: string) {
    return this.userService.getUserTeams(id);
  }

  @ApiOperation({ summary: 'Get user roles' })
  @ApiResponse({ status: 200, description: 'User roles retrieved' })
  @Get(':id/roles')
  getUserRoles(@Param('id') id: string) {
    return this.userService.getUserRoles(id);
  }
}
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
import { ProjectRoleAssignmentDto } from '../dtos/project-role-assignment.dto';
import { AssignProjectRolesDto } from '../dtos/assign-project-roles.dto';
import { AssignTeamDto } from '../dtos/assign-team.dto';
import { UserProjectRoleResponseDto } from '../dtos/user-project-role-response.dto';
import { SearchUsersDto } from '../dtos/search-users.dto';
import { PaginatedUsersDto } from '../dtos/paginated-users.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UserAllInformationDto } from '../dtos/user-all-information.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ 
    summary: 'Create a new user',
    description: 'Create a new user with optional project-role assignments and team assignment'
  })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Get all users (without pagination)' })
  @ApiResponse({ status: 200, description: 'List of all users' })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get user with complete information by ID (projects with teams, roles, and Daily Updates permissions)' })
  @ApiResponse({ 
    status: 200, 
    description: 'User with complete information including projects (teams, roles with Daily Updates permissions) and common permissions',
    type: UserAllInformationDto
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Get(':id/complete-information')
  findUserWithCompleteInformation(@Param('id') id: string) {
    return this.userService.findUserWithCompleteInformation(id);
  }

  @ApiOperation({ summary: 'Search and get all users with pagination and filtering' })
  @ApiResponse({ 
    status: 200, 
    description: 'Paginated list of users',
    type: PaginatedUsersDto
  })
  @Post('search')
  searchUsers(@Body() searchDto: SearchUsersDto): Promise<PaginatedUsersDto> {
    return this.userService.searchUsers(searchDto);
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

  @ApiOperation({ summary: 'Assign project roles to user' })
  @ApiResponse({ status: 200, description: 'Project roles assigned successfully' })
  @Post(':id/project-roles')
  assignProjectRoles(
    @Param('id') id: string,
    @Body() assignProjectRolesDto: AssignProjectRolesDto,
  ) {
    return this.userService.assignProjectRoles(id, assignProjectRolesDto.projectRoleAssignments);
  }

  @ApiOperation({ summary: 'Assign team to user' })
  @ApiResponse({ status: 200, description: 'Team assigned successfully' })
  @Post(':id/team')
  assignTeam(
    @Param('id') id: string,
    @Body() assignTeamDto: AssignTeamDto,
  ) {
    return this.userService.assignTeam(id, assignTeamDto.teamId);
  }

  @ApiOperation({ summary: 'Get user project roles' })
  @ApiResponse({ 
    status: 200, 
    description: 'User project roles retrieved with team information',
    type: [UserProjectRoleResponseDto]
  })
  @Get(':id/project-roles')
  getUserProjectRoles(@Param('id') id: string) {
    return this.userService.getUserProjectRoles(id);
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
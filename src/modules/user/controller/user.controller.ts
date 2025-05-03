import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import {
    ApiOperation,
    ApiBody,
    ApiTags,
    ApiCreatedResponse,
    ApiOkResponse,
    ApiNoContentResponse,
} from '@nestjs/swagger';
import { UserCreateInputDto, UserCreateResponseDto } from '../dtos/user-create-dto';
import { UserFindAllResponseDto } from '../dtos/user-find-all-dto';
import {
    UserFindByIdInputDto,
    UserFindByIdResponseDto,
} from '../dtos/user-find-by-id-dto';
import { UserUpdateInputDto, UserUpdateInputIdDto } from '../dtos/user-update-dto';
import { UserDeleteInputDto } from '../dtos/user-delete-dto';
import { ApiCustomBearerAuth } from 'src/decorators/auth.decorator';
import { PublicRoute } from 'src/decorators/public-route.decorator';

@ApiTags('User')
@Controller('user')
@UsePipes(new ValidationPipe({ whitelist: true }))
export class UserController {
    constructor(private readonly userService: UserService) {}

    @PublicRoute()
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiCreatedResponse({
        description: 'The user has been successfully created.',
        type: UserCreateResponseDto,
    })
    @ApiBody({ type: UserCreateInputDto })
    async create(@Body() user: UserCreateInputDto) {
        return this.userService.create(user);
    }

    @Get()
    @ApiCustomBearerAuth()
    @ApiOperation({ summary: 'Get all users' })
    @ApiOkResponse({
        description: 'The users have been successfully retrieved.',
        type: UserFindAllResponseDto,
    })
    async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @ApiCustomBearerAuth()
    @ApiOperation({ summary: 'Get a user by id' })
    @ApiOkResponse({
        description: 'The user has been successfully retrieved.',
        type: UserFindByIdResponseDto,
    })
    async findById(@Param() data: UserFindByIdInputDto) {
        return this.userService.findById(data.id);
    }

    @Put(':id')
    @ApiCustomBearerAuth()
    @ApiOperation({ summary: 'Update a user by id' })
    @ApiOkResponse({
        description: 'The user has been successfully updated.',
        type: UserCreateResponseDto,
    })
    @ApiBody({ type: UserUpdateInputDto })
    async update(@Param() data: UserUpdateInputIdDto, @Body() user: UserUpdateInputDto) {
        return this.userService.update(data.id, user);
    }

    @Delete(':id')
    @ApiCustomBearerAuth()
    @ApiOperation({ summary: 'Delete a user by id' })
    @ApiNoContentResponse({
        description: 'The user has been successfully deleted.',
    })
    @HttpCode(204)
    async delete(@Param() data: UserDeleteInputDto) {
        return this.userService.delete(data.id);
    }
}

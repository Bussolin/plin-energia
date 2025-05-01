import {
    BadRequestException,
    HttpException,
    HttpStatus,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { TUserCreateInput } from '../types/user-types';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UserFindByIdResponseDto } from '../dtos/user-find-by-id-dto';
import { UserFindAllResponseDto } from '../dtos/user-find-all-dto';
import { UserCreateResponseDto } from '../dtos/user-create-dto';
import { UserUpdateInputDto } from '../dtos/user-update-dto';

@Injectable()
export class UserService {
    constructor(private readonly prisma: PrismaClient) {}

    async create(user: TUserCreateInput): Promise<UserCreateResponseDto> {
        try {
            const userCreated = await this.prisma.user.create({
                data: user,
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            return userCreated;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new BadRequestException('Email already exists');
                }
            }
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Error creating user');
        }
    }

    async findAll(): Promise<UserFindAllResponseDto> {
        try {
            const users = await this.prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            return { data: users };
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Error finding users');
        }
    }

    async findById(id: string): Promise<UserFindByIdResponseDto> {
        try {
            const user = await this.prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            if (!user) throw new NotFoundException('User not found');

            return user;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Error finding user');
        }
    }

    async update(id: string, user: UserUpdateInputDto): Promise<UserCreateResponseDto> {
        try {
            const userUpdated = await this.prisma.user.update({
                where: { id },
                data: { name: user.name, email: user.email, updatedAt: new Date() },
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            });

            if (!userUpdated) throw new NotFoundException('User not found');

            return userUpdated;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Error updating user');
        }
    }

    async delete(id: string): Promise<void> {
        try {
            await this.prisma.user.delete({
                where: { id },
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    throw new NotFoundException('User not found');
                }
            }
            if (error instanceof HttpException) throw error;
            throw new InternalServerErrorException('Error deleting user');
        }
    }
}

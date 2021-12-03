import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { Memory } from './memory.entity';
import { MemoriesService } from './memories.service';
import { Pagination } from 'nestjs-typeorm-paginate';

@UseGuards(AuthGuard('jwt'))
@Controller('memories')
export class MemoriesController {
    constructor(private readonly memoriesService: MemoriesService) {}

    @Post()
    create(@Body() memory: Memory, @Req() req: Request): Promise<Memory> {
        const user: any = req.user;
        return this.memoriesService.create(user, memory);
    }

    @Get()
    async index(
        @Query('page') page = 1,
        @Query('limit') limit = 5,
        @Query('search') search: string
    ): Promise<Pagination<Memory>> {
        limit = limit > 100 ? 100 : limit;

        const options = {
            page,
            limit,
            route: 'http://localhost:3001/memories',
        };

        if (search) {
            options.route = `http://localhost:3001/memories?search=${search}`;
            return this.memoriesService.search(search, options);
        }

        return this.memoriesService.paginate(options);
    }

    @Get(':id')
    findOne(@Param() id: string): Promise<Memory> {
        return this.memoriesService.findOne(id);
    }

    @Delete(':id')
    async deleteOne(@Param() id: string): Promise<void> {
        const deleted = await this.memoriesService.deleteOne(id);

        if (deleted.affected < 1) {
            throw new Error('Could not delete memory');
        }
    }
}

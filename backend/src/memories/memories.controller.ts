import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { Memory } from './memory.entity';
import { MemoriesService } from './memories.service';

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
    findAll(@Req() req: Request): Promise<Memory[]> {
        const user: any = req.user;
        return this.memoriesService.findAll(user.id);
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

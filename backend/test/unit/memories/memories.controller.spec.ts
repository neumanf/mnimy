import { Test, TestingModule } from '@nestjs/testing';

import { CreateMemoryDto } from '../../../src/modules/memories/dtos/create-memory.dto';
import { Memory } from '../../../src/modules/memories/entities/memory.entity';
import { MemoriesController } from '../../../src/modules/memories/controllers/memories.controller';
import { MemoriesService } from '../../../src/modules/memories/services/memories.service';
import { Pagination } from 'nestjs-typeorm-paginate';

class MemoriesServiceMock {
    async create(): Promise<void> {}
    async paginate(): Promise<void> {}
    async search(): Promise<void> {}
    findOne(): void {}
    deleteOne(): void {}
}

describe('MemoriesController', () => {
    let controller: MemoriesController;
    let service: MemoriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [MemoriesController],
            providers: [
                {
                    provide: MemoriesService,
                    useClass: MemoriesServiceMock,
                },
            ],
        }).compile();

        controller = module.get<MemoriesController>(MemoriesController);
        service = module.get<MemoriesService>(MemoriesService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });

    describe('create', () => {
        const result: Memory = {
            id: '',
            title: '',
            content: '',
            created_at: undefined,
            updated_at: undefined,
            user: {
                id: '',
                username: '',
                email: '',
                password: '',
                created_at: undefined,
                updated_at: undefined,
                memories: [],
            },
        };
        const memory: CreateMemoryDto = {
            title: '',
            content: '',
        };
        const req: any = {
            user: () => ({
                id: '',
                username: '',
                email: '',
                password: '',
                created_at: undefined,
                updated_at: undefined,
                memories: [],
            }),
        };

        it('should return the created memory if operation was successfull', async () => {
            jest.spyOn(service, 'create').mockImplementation(async () => result);

            expect(await controller.create(memory, req)).toBe(result);
        });

        it('should throw if the service throws an error', async () => {
            jest.spyOn(service, 'create').mockImplementation(async () => {
                throw new Error();
            });

            try {
                await controller.create(memory, req);
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
            }
        });
    });

    describe('index', () => {
        const paginatedResults: Pagination<Memory> = {
            items: [],
            meta: undefined,
        };
        it('should return paginated results if no search was provided', async () => {
            jest.spyOn(service, 'search');
            jest.spyOn(service, 'paginate').mockImplementation(async () => paginatedResults);

            const result = await controller.index(1, 5, '');

            expect(service.search).toHaveBeenCalledTimes(0);
            expect(service.paginate).toHaveBeenCalledTimes(1);
            expect(result.items).toEqual([]);
        });

        it('should return paginated results based on search if search was provided', async () => {
            jest.spyOn(service, 'search').mockImplementation(async () => paginatedResults);
            jest.spyOn(service, 'paginate');

            const result = await controller.index(1, 5, 'any query');

            expect(service.search).toHaveBeenCalledTimes(1);
            expect(service.paginate).toHaveBeenCalledTimes(0);
            expect(result.items).toEqual([]);
        });
    });

    describe('findOne', () => {
        it('should return a memory if operation was successfull', async () => {
            const result = {
                id: 'any_id',
                title: '',
                content: '',
                created_at: undefined,
                updated_at: undefined,
                user: {
                    id: '',
                    username: '',
                    email: '',
                    password: '',
                    created_at: undefined,
                    updated_at: undefined,
                    memories: [],
                },
            };
            jest.spyOn(service, 'findOne').mockImplementation(async () => result);

            const response = await controller.findOne('any_id');

            expect(response).toBe(result);
        });

        it('should throw if the service throws an error', async () => {
            jest.spyOn(service, 'create').mockImplementation(async () => {
                throw new Error();
            });

            try {
                await controller.findOne('any_id');
            } catch (error) {
                expect(error).toBeInstanceOf(Error);
            }
        });
    });
});

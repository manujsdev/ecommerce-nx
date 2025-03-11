import { Filter, FindManyOptions, Repository, ObjectLiteral } from 'typeorm';
import { Result } from '../types';

export default abstract class BaseRepository<TEntity extends ObjectLiteral> {
	protected readonly repository: Repository<TEntity>;

	constructor(repository: Repository<TEntity>) {
		this.repository = repository;
	}

	async find(
		parameters?: FindManyOptions<TEntity> & { search?: Filter<TEntity> }
	): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async findOne(
		parameters?: FindManyOptions<TEntity> & { search?: Filter<TEntity> }
	): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async findById(id: string): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async add(entity: TEntity): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async update(entity: TEntity): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async delete(entity: TEntity): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async addMany(entities: TEntity[]): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async updateMany(entities: TEntity[]): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async deleteMany(entities: TEntity[]): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async sync(entity: TEntity): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}

	async syncMany(entity: TEntity[]): Promise<Result<TEntity>> {
		throw new Error('No implemented.');
	}
}

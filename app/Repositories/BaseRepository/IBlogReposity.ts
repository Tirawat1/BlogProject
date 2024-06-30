
export default interface IBlogRepository<T> {
    create(data: T): Promise<T>;
    update(id: number, data: T): Promise<T>;
    delete(id: number): Promise<T>;
    getAll(params: any): Promise<T[]>;
    get(id: number): Promise<blog | null>;
}

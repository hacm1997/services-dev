export default function paginationFunction(data: any[], page: number, pageSize: number): Promise<{
    data: any[];
    totalPages: number;
    currentPage: number;
}>;

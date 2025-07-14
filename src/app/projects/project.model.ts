export interface Project {
    id: number;
    name: string;
    description: string;
    status: 'pending' | 'active' | 'completed';
}

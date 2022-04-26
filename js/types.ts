export type ProjectStatus = {
    id: string,
    status: string,
    colorCode: string,
};

export type Project = {
    id: number,
    title: string,
    description: string,
    logo: string | null,
    version: string,
    status: string,
    statusId: string,
    colorCode: string,
};
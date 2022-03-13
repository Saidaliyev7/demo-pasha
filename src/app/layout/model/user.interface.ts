export interface IUser {
    id: string | number,
    name: string,
    email: string,
    gender: string,
    status: boolean,
    position?: number
}

export interface IUserPaginationData {
    limit: string | null | number,
    currentPage: string | null | number,
    totalPages: string | null | number,
    totalData: string | null | number
}

export interface IGender {
    displayName: string,
    name: string
}

export interface IStatus {
    displayName: string,
    name: string
}

export const genderList: IGender[] = [
    {
        displayName: 'Kişi',
        name: 'male'
    },
    {
        displayName: 'Qadın',
        name: 'female'
    }
]
export const statusList: IStatus[] = [
    {
        displayName: 'Aktiv',
        name: 'active'
    },
    {
        displayName: 'Deaktiv',
        name: 'deactive'
    }
]
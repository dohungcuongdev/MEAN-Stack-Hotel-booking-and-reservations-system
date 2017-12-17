
export class FollowUsers {
    
    id: string
    username: string
    page_access: string
    duration: number

    constructor(username: string, page_access: string, duration: number) {
        this.page_access = page_access
        this.username = username
        this.duration = duration
    }
}
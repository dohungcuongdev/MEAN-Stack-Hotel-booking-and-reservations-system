
export class FollowUsers {
    _id: string
    user_ip_address: string
    user_id: string
    username: string
    page_access: string
    duration: number

    constructor(user_id: string, username: string, page_access: string, duration: number) {
        this.page_access = page_access
        this.user_id = user_id
        this.username = username
        this.duration = duration
    }
}
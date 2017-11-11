

export class Activity {

    constructor(name: string, username: string, click: string, details: string, note: string, content: string, response: string, fullname: string, email: string, phone: string) {
        this.name = name
        this.username = username
        this.fullname = fullname
        this.email = email
        this.phone = phone
        this.click = click
        this.details = details
        this.note = note
        this.content = content
        this.response = response
    }

    _id: string
    username: string
    name: string
    fullname: string
    email: string
    phone: string
    click: string
    details: string
    note: string
    content: string
    response: string
    result: string
    created_at: Date
}
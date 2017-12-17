

export class Activity {

    constructor(name: string, username: string, click: string, details: string, note: string, content: string, response: string) {
        this.name = name
        this.username = username
        this.click = click
        this.details = details
        this.note = note
        this.content = content
        this.response = response
    }

    id: string
    username: string
    name: string
    click: string
    details: string
    note: string
    content: string
    response: string
    result: string
    created_at: Date
}
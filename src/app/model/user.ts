

export class User {

    constructor(username: string, name: string, phone: string, address: string, created_at: Date, balance: number) {
        this.name = name
        this.username = username
        this.phone = phone
        this.address = address
        this.created_at = created_at
        this.balance = balance
    }

    id: string
    username: string
    name: string
    phone: string
    address: string
    balance: number
    created_at: Date
}
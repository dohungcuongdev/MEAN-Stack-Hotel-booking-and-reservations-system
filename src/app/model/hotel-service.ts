
import * as AppConst from '../constant/app.const'

export class HotelService {
    constructor(name: string, type: string, price: number, img: string, img2: string, quantity: number, details: string, note: string) {
        this.name = name
        this.price = price
        this.img = img
        this.img2 = img2
        this.type = type
        this.quantity = quantity
        this.details = details
        this.note = note
    }

    id: string
    name: string
    type: string
    price: number
    img: string
    img2: string
    quantity: number
    details: string
    note: string
    imgwithURL: string
    imgwithURL2: string

}
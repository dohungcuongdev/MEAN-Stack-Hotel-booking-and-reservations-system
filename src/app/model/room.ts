
import * as AppConst from '../constant/app.const'

export class Room {
    constructor(name: string, size: number, price: number, numpeople: number, status: string, img: string, img2: string, type: string, details: string, amenities: string, booked_by: string, checkin: Date, checkout: Date, star: number) {
        this.name = name
        this.size = size
        this.price = price
        this.numpeople = numpeople
        this.status = status
        this.img = img
        this.img2 = img2
        this.type = type
        this.details = details
        this.amenities = amenities
        this.booked_by = booked_by
        this.checkin = checkin
        this.checkout = checkout
        this.star = star
    }

    id: string
    name: string
    size: number
    price: number
    numpeople: number
    status: string
    img: string
    img2: string
    type: string
    details: string
    amenities: string
    booked_by: string
    checkin: Date
    checkout: Date
    imgwithURL: string
    imgwithURL2: string
    star: number
    numvote: number
    average_star: number
}
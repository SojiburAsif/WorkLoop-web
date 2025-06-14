export const BookingByPromis = email => {
    return fetch(`http://localhost:3000/bookings?email=${email}`)
    .then(res => res.json())
}
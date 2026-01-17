export const BookingByPromis = email => {
    return fetch(`https://services-server.vercel.app/bookings?email=${email}`,
        { credentials: 'include' }
    )
        .then(res => res.json())
}
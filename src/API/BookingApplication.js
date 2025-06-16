export const BookingByPromis = email => {
    return fetch(`https://backend-zeta-ochre-92.vercel.app/bookings?email=${email}`,
        { credentials: 'include' }
    )
        .then(res => res.json())
}
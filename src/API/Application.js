export const myApplitionPromise = email => {
    return fetch(`https://services-server.vercel.app/workings?email=${email}`, {
        credentials: 'include'
    })
        .then(res => res.json())
}
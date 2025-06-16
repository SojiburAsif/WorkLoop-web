export const myApplitionPromise = email => {
    return fetch(`https://backend-zeta-ochre-92.vercel.app/workings?email=${email}`, {
        credentials: 'include'
    })
        .then(res => res.json())
}
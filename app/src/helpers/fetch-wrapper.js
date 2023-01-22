const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
}

function request(method) {
    return (url, body) => {
        const requestOptions = {
            method,
            headers: authHeader(url)
        }
        let fetchOptions = {}
        if (body && isJson) {
            fetchOptions = {
                ...requestOptions,
                headers: {
                    ...requestOptions.headers,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            }
        }
        else {
            fetchOptions = {
                ...requestOptions,
                body
            }
        }
        return fetch(url, fetchOptions).then(handleResponse)
    }
}

function handleResponse(response) {
    return response.text().then((text) => {
        const data = text && JSON.parse(text)
        
        if (!response.ok) {
            const error = (data && data.message) || response.statusText
            throw error
        }

        return data
    })
}

export {
    fetchWrapper
}
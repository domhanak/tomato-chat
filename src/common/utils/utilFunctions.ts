export const endpointConfigHeader = (authToken?: string | null) => {
    return authToken ?
    {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            charset: 'utf-8',
            authorization: authToken,
        }
    }
:
    {
        headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            charset: 'utf-8',
        }
    };
};

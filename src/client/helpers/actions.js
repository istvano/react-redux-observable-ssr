export const requestFailed = type => (msg, status, xhr) => {
    console.log(`Request ${type} failed with ${status}`, msg);
    return {
        type,
        payload: msg,
        status,
        xhr
    }
};


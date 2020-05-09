const message = "some message from mymodule.js";

const getGreeting = (name) => {
    return `Welcome to the course, ${name}`;
}

export {
    message,
    getGreeting
};
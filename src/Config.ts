
const DEV_MODE = false;

export default DEV_MODE ?

    // for development
    {
        appServerHost: "http://localhost:4021",
    } :

    // for production
    {
        appServerHost: "https://app-server.gaia.cc",
    }

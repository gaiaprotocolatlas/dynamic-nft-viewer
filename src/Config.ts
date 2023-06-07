
const DEV_MODE = false;

export default DEV_MODE ?

    // for development
    {
        appServerHost: "app-server.gaiaprotocol.com",
    } :

    // for production
    {
        appServerHost: "app-server.gaiaprotocol.com",
    }

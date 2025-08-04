import Bowser from "bowser";

export const isAndroidBrowser = () => {
    const browser = Bowser.getParser(window.navigator.userAgent);
    return browser.getOS().name === "Android" && !browser.getPlatformType().includes("desktop");
};

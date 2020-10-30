declare const WebFormComponentsFactory;

enum WebFormESVersion {
    ES5,
    ES6
}

export class FinapiEmbeddableWebFormComponent {
    private webFormToken: string;
    private serverUrl: string;
    private callbackUrl: string;

    private readonly webComponentsEntryPointUrl: string;

    constructor(webFormToken: string,
                serverUrl: string,
                callbackUrl: string,
                // ES5 is the default version
                esVersion: WebFormESVersion = WebFormESVersion.ES5) {
        this.webFormToken = webFormToken;
        this.serverUrl = serverUrl;
        this.callbackUrl = callbackUrl;

        if (esVersion === WebFormESVersion.ES5) {
            this.webComponentsEntryPointUrl = this.serverUrl + "/js/web-form/web-form-components.es5.js"
        } else if (esVersion === WebFormESVersion.ES6) {
            this.webComponentsEntryPointUrl = this.serverUrl + "/js/web-form/web-form-components.js"
        } else {
            throw new Error("Unsupported ES version: " + esVersion);
        }
    }

    startWebFormComponents(): void {
        const entryPoint = document.createElement('script');
        entryPoint.src = this.webComponentsEntryPointUrl;
        entryPoint.async = false;

        const finapiWebFormComponent: FinapiEmbeddableWebFormComponent = this;
        entryPoint.onload = function () {
            const webFormComponents = new WebFormComponentsFactory(document, window)
                .create({
                    webFormToken: finapiWebFormComponent.webFormToken,
                    serverUrl: finapiWebFormComponent.serverUrl,
                    callbackUrl: finapiWebFormComponent.callbackUrl,
                });
            webFormComponents.start();
        }
        document.appendChild(entryPoint);
    }
}

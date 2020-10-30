class FinapiEmbeddableWebForm {
    constructor(webFormToken,
                serverUrl,
                callbackUrl,
                esVersion,
                ownerDocument) {
        this.webFormToken = webFormToken;
        this.serverUrl = serverUrl;
        this.callbackUrl = callbackUrl;

        if (esVersion === 'ES5' || !esVersion) {
            this.webComponentsEntryPointUrl = this.serverUrl + "/js/web-form/web-form-components.es5.js"
        } else if (esVersion === 'ES6') {
            this.webComponentsEntryPointUrl = this.serverUrl + "/js/web-form/web-form-components.js"
        } else {
            throw new Error("Unsupported ES version: " + esVersion);
        }

        if (ownerDocument) {
            this.ownerDocument = ownerDocument;
        } else {
            this.ownerDocument = document;
        }
    }

    startWebFormComponents() {
        console.log("Injecting the entry point")
        const entryPoint = this.ownerDocument.createElement('script');
        entryPoint.setAttribute("id", "web-form-components-source");
        entryPoint.src = this.webComponentsEntryPointUrl;
        entryPoint.async = false;

        const finapiWebFormComponent = this;
        entryPoint.onload = function () {
            const webComponents = new WebFormComponentsFactory(document, window)
                .create({
                    webFormToken: finapiWebFormComponent.webFormToken,
                    serverUrl: finapiWebFormComponent.serverUrl,
                    callbackUrl: finapiWebFormComponent.callbackUrl,
                });
            webComponents.start();
        }
        this.ownerDocument.body.appendChild(entryPoint);
    }
}

class WebFormBuilder {
    constructor(webFormToken, serverUrl) {
        this.webFormToken = webFormToken;
        this.serverUrl = serverUrl;
        return this;
    }

    withCallbackUrl(callbackUrl) {
        this.callbackUrl = callbackUrl;
        return this;
    }

    withESVersion(esVersion) {
        this.esVersion = esVersion;
        return this;
    }

    withOwnerDocument(ownerDocument) {
        this.ownerDocument = ownerDocument;
        return this;
    }

    build() {
        return new FinapiEmbeddableWebForm(
            this.webFormToken,
            this.serverUrl,
            this.callbackUrl,
            this.esVersion,
            this.ownerDocument);
    }
}

module.exports.WebFormBuilder = WebFormBuilder;

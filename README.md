# General Information
You can integrate the embeddable web-form by using our npm package.

The package contains two entry points - the Javascript file, and the Typescript file.
Which entry point to take is up to you - if your application supports the Typescript language then feel free
to use the **finapi-embeddable-web-form.component.ts** file.
If your application doesn't support the Typescript language - please use the **finapi-embeddable-web-form.js**
file to import the library.

In order to use the latest version of our package,
please set the version value as **'latest'** in your main package.json file.

# Integration Example
- Please consider the following as an example of such integration between the embeddable web-form and an Angular app:

```
import {Component, OnInit} from '@angular/core';
import {WebFormBuilder} from "@finapi/embeddable-web-form/finapi-embeddable-web-form";

@Component({
    selector: 'app-webform',
    templateUrl: '../../../node_modules/@finapi/embeddable-web-form/finapi-embeddable-web-form.component.html',
})
export class WebformComponent implements OnInit {
    private webFormToken: string;
    constructor() {
        this.webFormToken = 'web-form-token was here';
    }

    ngOnInit(): void {
        console.log('WebForm library has been imported');

        var webFormComponents =
            new WebFormBuilder(this.webFormToken, 'http://kraken:8085')
                .withCallbackUrl('http://127.0.0.1/dummy')
                .withOwnerDocument(document)
                .build();
        webFormComponents.startWebFormComponents();
    }

}
```

- Another example of integration between the embeddable web-form and a ReactJS application:

``` 
import React from 'react';
import {WebFormBuilder} from '@finapi/embeddable-web-form/finapi-embeddable-web-form'

const serverUrl = 'http://kraken:8085';
const webFormToken = 'whatever';

function getWebForm() {
    let embeddableWebForm =
        new WebFormBuilder(webFormToken, serverUrl)
            .withOwnerDocument(document)
            .build();
    embeddableWebForm.startWebFormComponents();
}

const App = () => {
    return (
        <div>
            <button onClick={() => getWebForm()}>Render finAPI Web Form</button>
            <web-form-element></web-form-element>
        </div>
    );
};

export default App;
```

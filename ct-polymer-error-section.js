import { PolymerElement } from "@polymer/polymer/polymer-element.js";
import { mixinBehaviors } from "@polymer/polymer/lib/legacy/class.js";

import { clDefaultTemplate } from "cl-polymer-element-helpers/cl-default-template.js";
import { clDefaultStyle } from "cl-polymer-element-helpers/cl-default-style.js";

import { __decorate } from "cl-polymer-element-helpers/cl-helpers.js";
import { property, observe, customElement } from "@polymer/decorators";

import "cl-polymer-element-helpers/ct-element-style.js";
import { clPolymerButton } from "cl-polymer-button/cl-polymer-button.js";

import "@polymer/iron-icon/iron-icon.js";

class bCd {
    constructor () {
        this.activeErrorSections = []
    }

    remove ( element ) {
        this.activeErrorSections = this.activeErrorSections.filter(function(storedElement) {
            return element !== storedElement
        });
        this.updateVisibility(element)
    }
    
    add ( element ) {
        this.activeErrorSections.some(function(storedElement) {
            return storedElement === element
        }) || this.activeErrorSections.push(element);
        this.updateVisibility(element)
    }
    
    updateVisibility (element) {
        element.hidden = true;
        element = this.activeErrorSections.some(function(storedElement) {
            return !storedElement.topLevel
        });

        let storedElements = symbolIterator(this.activeErrorSections);
        for ( let storedElement = storedElements.next(); !storedElement.done; storedElement = storedElements.next())
            storedElement = storedElement.value,
            storedElement.hidden = element && storedElement.topLevel ? true : false;
    }
}

let aCd = new bCd;

let ctPolymerErrorSectionTemplate;
let ctPolymerErrorSectionTemplateDefault;
let ctPolymerErrorSectionBase = mixinBehaviors([], PolymerElement);
class ctPolymerErrorSection extends ctPolymerErrorSectionBase {
    constructor () {
        super();
        this.hidden = true;
        this.topLevel = false;
        this.enableRetry = false;
        this.retryMessage = "Retry";
        this.errorSomethingWentWrongMessage = "Oops, something went wrong.";
    }

    disconnectedCallback () {
        super.disconnectedCallback();
        "ERROR" === this.status && aCd.remove(this)
    }
    
    onRetryTap () {
        this.fire("retry")
    }
    
    updateVisibility () {
        "ERROR" === this.status ? aCd.add(this) : aCd.remove(this)
    }

  	static get template() {
    	if (void 0 === ctPolymerErrorSectionTemplate || null === ctPolymerErrorSectionTemplate) {
            
            let template = document.createElement("template");
            template.innerHTML = `
            <style>
                :host {
                    margin-top: 192px;
                    display: block;
                    font-family: var(--ct-primary-font-family);
                    font-weight: 400;
                    -webkit-font-smoothing: var(--ct-primary-font-smoothing);
                    font-size: 15px;
                    line-height: 24px;
                    color: var(--ct-primary-text-color);
                } 

                .hcenter-child {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                } 

                #error-image {
                    width: 200px;
                    display: inline-block;
                } 

                #error-icon {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                iron-icon {
                    --iron-icon-width: 160px;
                    --iron-icon-height: 160px;
                    color: var(--icon-color);
                }

                #error-block {
                    text-align: center;
                } 
            </style>
            <div class="hcenter-child">
                <div id="error-block">
                    <template is="dom-if" if="[[illustrationUrl]]" restamp="">
                        <div id="error-image">
                            <img src$="[[illustrationUrl]]" alt="">
                        </div>
                    </template>
                    <template is="dom-if" if="[[icon]]" restamp="">
                        <div id="error-icon">
                            <iron-icon icon="[[icon]]"></iron-icon>
                        </div>
                    </template>
                    <p id="error-message">[[errorSomethingWentWrongMessage]]</p>
                    <cl-polymer-button id="error-retry-button" hidden$="[[!enableRetry]]" label="[[retryMessage]]" on-tap="onRetryTap"></cl-polymer-button>
                </div>
            </div>
            `;
            template.content.insertBefore(clDefaultStyle().content.cloneNode(true), template.content.firstChild);
            let templateContent = template.content;
            let templateInsertBefore = templateContent.insertBefore;
            let defaultTemp;
            if (void 0 == ctPolymerErrorSectionTemplateDefault || null == ctPolymerErrorSectionTemplateDefault) {
                defaultTemp = clDefaultTemplate();
                ctPolymerErrorSectionTemplateDefault = defaultTemp
            }
            defaultTemp = ctPolymerErrorSectionTemplateDefault;
            templateInsertBefore.call(templateContent, defaultTemp.content.cloneNode(true), template.content.firstChild);

            return ctPolymerErrorSectionTemplate = template;
        }

        return ctPolymerErrorSectionTemplate;
  	}
}


ctPolymerErrorSection.prototype.updateVisibility = ctPolymerErrorSection.prototype.updateVisibility;

__decorate(
    [
        property({ type: Boolean, reflectToAttribute: true })
    ], 
    ctPolymerErrorSection.prototype, 
    "hidden", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    ctPolymerErrorSection.prototype, 
    "status", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    ctPolymerErrorSection.prototype, 
    "topLevel", 
    void 0
);

__decorate(
    [
        property({ type: Boolean })
    ], 
    ctPolymerErrorSection.prototype, 
    "enableRetry", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    ctPolymerErrorSection.prototype, 
    "retryMessage", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    ctPolymerErrorSection.prototype, 
    "errorSomethingWentWrongMessage", 
    void 0
);

__decorate(
    [
        property({ type: Function }),
        observe("status")
    ], 
    ctPolymerErrorSection.prototype, 
    "updateVisibility", 
    null
);

__decorate(
    [
        property({ type: String })
    ], 
    ctPolymerErrorSection.prototype, 
    "illustrationUrl", 
    void 0
);

__decorate(
    [
        property({ type: String })
    ], 
    ctPolymerErrorSection.prototype, 
    "icon", 
    void 0
);

ctPolymerErrorSection = __decorate([
    customElement("ct-polymer-error-section")
], ctPolymerErrorSection);

export { ctPolymerErrorSection };
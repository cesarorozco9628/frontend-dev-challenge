import {LitElement, html, css} from 'lit';

export class IconInfor extends LitElement {
    static get styles() {
        return [css`
            .icon {
                width:12px;
                height:12px;
                font-weight:700;
                font-size:10px;
                border-radius:50%;
                border: 1px solid var(--borders);
                color:var(--borders);
                display: flex;
                justify-content: center;
                align-items: center;
                margin-left:8px;
            }
            .tooltip {
                position: relative;
                display: inline-block;
              }
              
              .tooltip .tooltiptext {
                visibility: hidden;
                width: 120px;
                background-color: var(--borders);
                font-size:10px;
                color: var(--textBody);
                text-align: center;
                border-radius: 6px;
                padding: 5px 0;
                position: absolute;
                z-index: 1;
                bottom: 160%;
                left: 70%;
                margin-left: -60px;
                opacity: 0;
                transition: opacity 0.3s;
              }
              
              .tooltip .tooltiptext::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: var(--borders) transparent transparent transparent;
              }
              
              .tooltip:hover .tooltiptext {
                visibility: visible;
                opacity: 1;
              }
        `, ];
    }

    static get properties(){
        return {
            message:{type:String}
        }
    }

    constructor(){
        super();
        this.message = 'test';
    }

    render(){
        return html`
            <div class="tooltip">
                <span class="icon">
                    i
                </span>
                <span class="tooltiptext">${this.message}</span>
            </div>
        `
    }

/*------------------------------METODOS-----------------------*/
    
}

customElements.define('icon-infor', IconInfor);
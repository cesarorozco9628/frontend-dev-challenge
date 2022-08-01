import {LitElement, html, css} from 'lit';
import {TEXT} from '../../config/locales';

export class TitleComponent extends LitElement {
    static get styles() {
        return [css`
            .titles{
                display:flex;
                width:100%;
            }
            .card-flex{
                display: flex;
                justify-content: center;
                align-items: center;
                width:50%;
            }
            .firstTitle{background: var(--blueStrong);}
            .secondTitle{background: var(--blueLow);}
            .firstTitle h2{color:white;}
            .secondTitle h2 {color:var(--blueStrong);}
        `];
    }

    static get properties(){
        return {
            firstTitle:{type:String},
            secondTitle:{type:String},
        }
    }

    constructor(){
        super();
        this.firstTitle = TEXT.TITLE.firstTitle;
        this.secondTitle = TEXT.TITLE.secondTitle;
    }

    render(){
        return html`
            <div class="titles">
                <div class="firstTitle card-flex">.
                    <h2>${this.firstTitle}</h2>
                </div>
                <div class="secondTitle card-flex">
                    <h2>${this.secondTitle}</h2>
                </div>
            </div>
        `
    }
}

customElements.define('title-component', TitleComponent);
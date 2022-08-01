import {LitElement, html, css} from 'lit';
import {TEXT} from '../../config/locales';
import {SettingComponent} from '../setting-component/setting-component';
import {IconInfor} from '../info-icon/info-icon';

export class DetailsComponent extends SettingComponent {
    static get styles() {
        return [css`
            .detail-row {
                padding:1rem 0;
                display:grid;
                grid-template-columns: 30% 40%;
                justify-content: space-between;
            }

            p{
                font-size:10px;
            }

            .detail-count{
                font-weight:700;
            }
            .d-flex{
                display:flex;
                align-items:center;
            }
        `, super.styles];
    }

    static get properties(){
        return {
            amount:{type:String},
            mounth:{type:String},
            Income:{type:String},
            Tax:{type:String}
        }
    }

    constructor(){
        super();
        this.text = TEXT.DETAILS;
        this.amount = '0';
        this.mounth = '0';
        this.Income = '0';
        this.Tax = '10.5';
    }

    render(){
        return html`
            ${this.TextComponent(false, this.text.amountLoan, this.amount,this.text.currency, this.text.infoLoan)}
            ${this.TextComponent(false, this.text.MonthPay, this.mounth, this.text.currency, this.text.infoMonth)}
            ${this.TextComponent(false, this.text.IncomeMoney, this.Income, this.text.currency, this.text.infoIncome)}
            ${this.TextComponent(true, this.text.tax, this.Tax, this.text.porcent, this.text.infoTax)}
            <div>
                <p>${this.text.messageFirst}</p>
                <p>${this.text.messageSecond}</p>
            </div>
        `
    }

/*------------------------------METODOS-----------------------*/
    TextComponent(last, text, number, symbol, message){
        return html`
            <div class="detail-row ${last ? 'border-bottom' : ''}">
                <span class="d-flex" >
                    ${text}
                    <icon-infor .message=${message}></icon-infor>
                </span>
                <div class="detail-count">
                    <span>${!last ? '$ ': ''}${number}</span>
                    <span>${symbol}</span>
                </div>
            </div>
        `
    }
}

customElements.define('details-component', DetailsComponent);
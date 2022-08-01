import {LitElement, html, css} from 'lit';
import {SimulatorTest} from '../../simulator-test'
import {TEXT} from '../../config/locales';

export class ViewsInformPage extends SimulatorTest {
    
    static get styles() {
        return [css`
        .
    `, super.styles];
    }


firstUpdated(){
    this.getData()
}

static get properties(){
    return {
        
        mortgage_amount:{type:Number},
        monthly_payment:{type:Number},
        required_incom:{type:Number}
    }
}

/*-----------------------------VALORES-----------------------------*/
constructor(){
    super();
    this.mortgage_amount = 0;
    this.monthly_payment = 0;
    this.required_income = 0;
    this.Tax = 0;
}
    render(){
        return html`
            <div class="d-flex">
                <p>${TEXT.DETAILS.amountLoan}</p>
                <div>
                    <span>${this.mortgage_amount}</span>
                    <span>${TEXT.SETTING.currency}</span>
                </div>
            </div>     
            <div class="d-flex">
                <p>${TEXT.DETAILS.MonthPay}</p>
                <div>
                    <span>${this.monthly_payment}</span>
                    <span>${TEXT.SETTING.currency}</span>
                </div>
            </div>   
            <div class="d-flex">
                <p>${TEXT.DETAILS.IncomeMoney}</p>
                <div>
                    <span>${this.required_income}</span>
                    <span>${TEXT.SETTING.currency}</span>
                </div>
            </div>    
            <div class="d-flex">
                <p>${TEXT.DETAILS.tax}</p>
                <div>
                    <span>${this.Tax}</span>
                    <span>${TEXT.DETAILS.porcent}</span>
                </div>
            </div>     
        `
    }

    getData(){
        this.mortgage_amount = localStorage.getItem('mortgage_amount');
        this.monthly_payment = localStorage.getItem('monthly_payment');
        this.required_income = localStorage.getItem('required_income');
        this.Tax = localStorage.getItem('tax');
    }
}


customElements.define('view-inform-page', ViewsInformPage);
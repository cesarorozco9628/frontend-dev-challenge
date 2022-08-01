/*----------------------Imports Library or dependencies ---------------*/
import {LitElement,html, css} from 'lit';

/*----------------------Imports Components----------------------------*/
import {TitleComponent} from './components/title-component/title-component';
import {SettingComponent} from './components/setting-component/setting-component';
import {DetailsComponent} from './components/details-component/details-component';
import {DEADLINES, HITCH} from './config/constants';
import {TEXT} from './config/locales';


export class SimulatorTest extends  DetailsComponent {

/*-------------------------ESTILOS---------------------------------*/    
   static get styles() {
        return [css`
            .container{
                padding: 2rem 1rem;
                width:90%;
                height:100%;
                margin:auto;
            }

            .card{
                border: 1px solid var(--borders);
            }
            .views{
                display:grid;
                grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
                height:100%;
            }
            setting-component{                
                padding: 3rem 0rem 3rem 2rem;
            }
            details-component{
                height: revert;
                padding: 3rem 2rem 3rem 2rem;
            }
            .d-flex{
                width:100%;
                height:20%;
                display:flex;
                justify-content:center;
                align-items:center;
                padding:1rem;
            }

            .button {
                width: fit-content;
                padding: 0.5rem 1rem;
                background: var(--orange);
                color: white;
                text-decoration: none;
                border-radius: 1rem;
            }
            a{
                text-decoration: none;
                color: white;
            }
        `];
   }
   
   static get properties(){
        return {
            term_in_months:{type:Number},
            errorPrice:{type:Boolean},
            mortgage_amount:{type:Number},
            monthly_payment:{type:Number},
            required_incom:{type:Number}
        }
    }

/*-----------------------------VALORES-----------------------------*/
    constructor(){
        super();
        this.term_in_months = 0;
        this.monthly_rate = 0.0098;
        this.mortgage_amount = 0;
        this.monthly_payment = 0;
        this.required_income = 0;
    }

/*-----------------------------RENDER------------------------------*/
    render(){
        return html`
            <div class="container">
                <div class="card">
                    <title-component></title-component>
                    <div class="views">
                        <setting-component @get-data=${this.handleData}></setting-component>
                        <details-component
                            .amount = ${this.mortgage_amount}
                            .mounth = ${this.monthly_payment}
                            .Income = ${this.required_income}
                            ></details-component>
                    </div>
                </div>
               <div class="d-flex">
                    <div class="button">
                        <a href="../VisualInformation.html" @click=${this.sendInfo}>${TEXT.SEND.message}</a>
                    </div>
               </div>
            </div>
        `
    }

    handleData(e){
        const data = e.detail;
        this.mortgage_amount = this.putFormat(this.getMortgageAmount(data));
        this.monthly_payment = this.putFormat(this.getMonthlyPayment(this.filterCaracters(this.mortgage_amount), data));
        this.required_income = this.putFormat(this.getRequiredIncome(this.filterCaracters(this.monthly_payment)));
    }

    getMortgageAmount(data){
        let price = data.find(element => element.name === TEXT.SETTING['name-loan']).value;
        let porcent = data.find(element => element.name === HITCH.name).value;
        let downpayment = (price * porcent) /100;
        return  price - downpayment;
    }

     getMonthlyPayment(AmountPay, data){
        this.term_in_months = data.find(element => element.name === DEADLINES.name).value * 12;
        let x = 1 + this.monthly_rate;
        let y = AmountPay * this.monthly_rate;
        let pow = Math.pow(x, this.term_in_months);
        let pay = ((y)/(1 - pow));
        return Math.abs(Math.ceil(pay));
    }

    getRequiredIncome(price) {
        return Math.ceil(price * 2.5);
    }

    sendInfo(){
        localStorage.setItem('mortgage_amount', this.mortgage_amount);
        localStorage.setItem('monthly_payment', this.monthly_payment);
        localStorage.setItem('required_income', this.required_income);
        localStorage.setItem('tax', this.Tax)
    }
}
customElements.define('simulator-test', SimulatorTest);
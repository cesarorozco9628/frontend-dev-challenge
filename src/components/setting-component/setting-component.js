import {LitElement, html, css} from 'lit';
import {InputNumber} from '../input/input-number';
import {InputRange} from '../input/input-range';
import {TEXT} from '../../config/locales';
import {HITCH,DEADLINES} from '../../config/constants';

export class SettingComponent extends InputRange {
 /*-------------Estilos---------------*/
    static get styles() {
        return [css`
        .border-bottom{
            border-bottom:1px solid var(--borders);
            padding-bottom:1.5rem;
        }
        .fields{
            width:100%;
            display: grid;
            grid-template-columns: 35% 65%;
            justify-content:center;
            align-items: center;
            padding:1rem 0;
        }

        fields span:first-child{
            margin-right:1rem;
        }

        .pd-btm{
            padding-bottom:2rem;
        }
        .span-porcent {
            height:100%;
        }
        .grid-porcent{
            display: grid;
            grid-template-columns: 75%;
            margin-bottom: 0.5rem;
            font-size:14px;
        }
        input-range{
            margin-top:20px;
        }

        p{
            margin-bottom:0;
        }
        `, super.styles];
    }

    static get properties(){
        return {
            errorPorcent:{type:Boolean},
            errorPrice:{type:Boolean}
        }
    }

/*---------------VARIABLES----------------------*/
    constructor(){
        super();
        
        this.HITCH = HITCH;
        this.deadLines = DEADLINES;
        this.valuePorcent = '';
        this.RangePorcent = this.HITCH.min;
        this.RangeDeadLine = this.deadLines.min;
        this.errorPorcent = false;
        this.errorPrice = false;
        this.State = [
            {value:0, name:TEXT.SETTING['name-loan'], id:TEXT.SETTING['id-loan'] },
            {value:HITCH.min, name:this.HITCH.name, id:this.HITCH.ID},
            {value:DEADLINES.min, name:this.deadLines.name, id: this.deadLines.ID}
        ]
    }

/*--------------Cuerpo Visible------------------*/
    render(){
        return html`
            <div style="padding-right:1rem;">
              <!-- campo de precio -->
                <div class="border-bottom fields">
                    <span style="height:100%;">${TEXT.SETTING.labelAmountBulding}</span>
                    <div>
                        <input-number 
                            .amount=${TEXT.SETTING.currency}
                            @change-value=${this.getValues}
                            .name=${TEXT.SETTING['name-loan']}
                            .id=${TEXT.SETTING['id-loan']}
                        ></input-number>
                        <p class=${this.errorPrice ? 'message': 'none'}>* ${TEXT.SETTING.messageLoan}</p>
                    </div>
                </div>
                <!-- campo de porcentaje -->
                <div class="border-bottom fields pd-btm">
                    <div>
                        <span class="span-porcent">${TEXT.SETTING.hitch}</span>
                        <icon-infor></icon-infor>
                    </div>
                    <div>
                        <div class="grid-porcent">
                            ${this.printText(TEXT.SETTING.labelHitch)}
                        </div>
                        <input-range
                            .min=${this.HITCH.min}
                            .max=${this.HITCH.max}
                            .step=${this.HITCH.step}
                            .value=${this.RangePorcent}
                            .mean=${this.HITCH.mean}
                            @changes-value=${this.getValues}
                            .name=${this.HITCH.name}
                            .Marks=${this.HITCH.marks}
                            id="loanRange"
                        ></input-range>
                        <div>
                            <label>
                                <input
                                    type="text"
                                    id="Porcent"
                                    @input=${this.getLoan}
                                /> 
                                ${this.printText(TEXT.SETTING.currency)}
                            </label> 
                            <p class=${this.errorPorcent ? 'message': 'none'}>* ${TEXT.SETTING.messagePorcent}</p>
                        </div>
                    </div>
                </div>
                <!-- campo de plazos -->
                <div class="fields" style="padding: 1rem 0px 0 0;">
                    <div>
                        <span>${TEXT.SETTING.deadLines}</span>
                        <icon-infor></icon-infor>
                    </div>
                    <input-range
                        .min=${this.deadLines.min}
                        .max=${this.deadLines.max}
                        .step=${this.deadLines.step}
                        .mean=${this.deadLines.mean}
                        value=${this.RangeDeadLine}
                        @changes-value=${this.getValues}
                        .name=${this.deadLines.name}
                        .id=${this.id}
                        .Marks=${this.deadLines.marks}
                    ></input-range>
                </div>
            </div>
        `
    }
/*----------------------------------------METODOS----------------------------------------*/

 /*--------------Evento para regresar el JSON de la Informacion-----------------*/ 
    getValues(e){
        const name = e.detail ? e.detail.name : e.target.name;  
        const target = e.detail ? e.detail : e.target;
        this.State = this.handlePrice(target);
        this.getPricePorcent(
            this.getValuesFields(TEXT.SETTING['name-loan']),
            this.getValuesFields(this.HITCH.name), 
            name
        );
        let event = new CustomEvent('get-data', {
            detail:this.State,
        })
        this.dispatchEvent(event);
    }
 /*-------------Metodo para guardar los cambios en el JSON---------------------*/
    handlePrice({name, value}){
        let state = [...this.State];
        let newData = state.map((element) => {
            if( element.name === name){
                element.value = value;
                return element;
            }else{
                return element;
            }
        })
        return [...newData];
    }
 /*---------------Metodo para obtener el valor de un campo----------------------*/
    getValuesFields(name){
        return this.State.find((element) => element.name === name).value
    }
 /*--------------Metodo para inyectar el valor del porcentaje en moneda---------*/   
    async getPricePorcent(price, porcent, name){
        if(name === this.HITCH.name || name === TEXT.SETTING['name-loan']){
            name === TEXT.SETTING['name-loan'] ? this.validatePrice() : null;
            price = parseFloat(price); porcent = parseFloat(porcent);
            let res =  ((price * porcent) / 100);
            this.validate({value:res ? res.toString():'0', id:'Porcent'});
        }
    }
/*--------------Metodo para el manejo del campo de enganche---------------------*/

    getLoan(e){
        const {value, id} = e.target;
        let data = value.split('')
            data = data.filter((element) =>  element >= 0 || element <= 9 || element == ',' || element == '.')
            data = data.join('');
        
        this.validate({value:data, id});
        const price = this.getValuesFields(TEXT.SETTING['name-loan']);
        const porcent = (this.filterCaracters(value) * 100)/price;
        this.validatePorcent(price, value);
        if(!this.errorPorcent)this.shadowRoot.getElementById('loanRange').UpdateValue(porcent);
    }

    async validatePorcent(price, value){
        const minPorcent = ( price * 5 )/100;
        const maxPorcent = (price * 90 )/100;
        const porcent = this.filterCaracters(value);
        if(porcent >= minPorcent && porcent <= maxPorcent  ){
            this.errorPorcent = false;
        }else{
            this.errorPorcent = true;
        }
    }

    validatePrice(){
        const price = this.getValuesFields(TEXT.SETTING['name-loan']);
        if(price >= 400000 ){
            this.errorPrice = false;
        }else{
            this.errorPrice = true;
        }
    }
}

customElements.define('setting-component', SettingComponent);
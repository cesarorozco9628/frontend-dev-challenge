import {LitElement, html, css} from 'lit';

export class InputNumber extends LitElement {
    static get styles() {
        return [css`
            input[type=text]{
                border:1px solid var(--borders);
                padding:0.5rem;
                color: (--borders);
                border-radius: 1rem;
                width:70%;
                margin-right:1rem;
                outline:none;
            }

            .none {
                display:none;
            }

            .message {
                display:block;
                color:red;
                font-size:10px;
            }
        `];
    }

    static get properties(){
        return {
            amount:{type:String},
            value:{type:String},
            disabled:{type:Boolean},
            name:{type:String},
            id:{type:String},
            validation:{},
            errorMessage:{type:String},
            error:{type:Boolean}
        }
    }

    constructor(){
        super();
        this.amount = '';
        this.value = '' ;
        this.disabled = false;
        this.name = '';
        this.id = '';
        this.error = false
        this.errorMessage = '';
        this.reg = /^[0-9]([.,][0-9]{1,2})?$/
    }

    render(){
        return html`
            <label>
                <input 
                    type="text" 
                    value=${this.value}
                    name=${this.name}
                    id=${this.id}
                    ?disabled=${this.disabled}
                    @input=${this.getEvent}
                    class="my-input"
                />
                ${this.printText(this.amount)}
            </label>
                
        `
    }

/*------------------------------METODOS-----------------------*/
    printText(propertie){
        return propertie.length > 0 ? html`<span>${propertie}</span>`: null;
    }    


    getEvent(e){
        const {value, name, id} = e.target;
        if(this.reg.test(value)){
            this.validate(e.target)
            let event  = new CustomEvent('change-value', {
                detail:{
                    value:this.filterCaracters(value),
                    name,
                    id,
                },
            })
            this.dispatchEvent(event);
        }else{
            let data = value.split('')
            data = data.filter((element) =>  element >= 0 || element <= 9 || element == ',' || element == '.')
            data = data.join('');
            this.validate({value:data, id});
            let event  = new CustomEvent('change-value', {
                detail:{
                    value:this.filterCaracters(data),
                    name,
                    id,
                },
            })
            this.dispatchEvent(event);
        }   
    }


    validate({value, id}){
        let target = this.renderRoot.querySelector(`#${id}`);
        target.value = this.putFormat(value);
    }


    filterCaracters(number){
            let data = number.toString().split('').filter(element => element !== ',').join('');
            return data;
    }


    putFormat(value){
        const Format  = new Intl.NumberFormat('en-US',{maximumFractionDigits:2, style:'decimal'});
        let response = Format.format(this.filterCaracters(value));
        return response;
    }


    UpdateValue(value){
        this.value = value;
    }


}

customElements.define('input-number', InputNumber);
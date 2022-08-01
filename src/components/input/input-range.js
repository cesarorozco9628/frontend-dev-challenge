import {LitElement, html, css} from 'lit';
import {InputNumber} from './input-number';

export class InputRange extends InputNumber {
    static get styles() {
        return [css`
        input[type='range']:focus {
            outline: none;
          }
        
          input[type='range'],
          input[type='range']::-webkit-slider-runnable-track,
          input[type='range']::-webkit-slider-thumb {
            -webkit-appearance: none;
          }
          
          input[type=range]::-webkit-slider-thumb {
            background-color: var(--orange);
            width: 22px;
            height: 22px;
            border-radius: 50%;
            margin-top: -10px;
          }
          
          input[type=range]::-webkit-slider-runnable-track {
            background-color: var(--borders);
            border-radius:2px;
            height: 4px;
          }

          input[type=range]::-ms-thumb {
            background-color: var(--orange);
            width: 22px;
            height: 22px;
            border-radius: 50%;
          }
          
          input[type=range]::-webkit-slider-runnable-track {
            background-color: var(--borders);
            height: 4px;
          }
          
          input[type=range]:focus::-webkit-slider-runnable-track {
            outline: none;
          }
          
          input[type=range]::-moz-range-track {
            background-color: var(--borders);
            height: 4px;
          }
          
          input[type=range]::-ms-track {
            background-color: var(--borders);
            height: 4px;
          }
          
          input[type=range]::-ms-fill-lower {
            background-color: var(--orange)
          }
          
          input[type=range]::-ms-fill-upper {
            background-color: var(--borders);
          } 
          
          .input-display{
            display:flex;
            align-items:center;
            width:100%;
          }

          input{
            width:75%;
            margin-right:1.3rem;
          }
          .marks{
            display:grid;
            height: 1.5rem;
            width: 75%;
            margin: 0.5rem 0 1rem 0;
            font-size:12px;
            text-align:center;
          }

          .marks span:last-child{
            text-align:end;
          }
          .marks span:first-child{
            text-align:start;
            
          }

          .four-marks {
            grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
          }
          .four-marks span:nth-child(2){
            margin-left:-12px;
          }
          .four-marks span:nth-child(3){
            margin-left:15px;
          }
          .two-marks{
            grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
          }
        `, super.styles];
    }  
    static get properties(){
        return {
            value:{type:Number},
            label:{type:String},
            min:{type:Number},
            max:{type:Number},
            step:{type:Number},
            name:{type:String},
            Marks:{type:Array}
        }
    }

    constructor(){
        super();
        this.label = '';
        this.value = 0;
        this.max = 0;
        this.min = 0;
        this.step = 1;
        this.mean = '';
        this.name = '';
        this.Marks = [];
    }

    render(){
        return html`
            <label class="input-display">
                <input 
                    type="range"  
                    max=${this.max} 
                    min=${this.min} 
                    step=${this.step} 
                    value=${this.value}
                    name=${this.name}
                    @input=${this.getValue}
                />
                <div>
                    <span>${this.value}</span>
                    ${this.printText(this.mean)}
                </div>
            </label>
            <div class="marks ${this.Marks.length === 2 ? 'two-marks' : 'four-marks'}" >
                ${this.Marks.map((element) => {
                    return html `
                        <span>${element}</span>
                    `
                })}
            </div>
        `
    }    

    getValue(e){
        const {value, name} = e.target;
        this.UpdateValue(value);
        let event = new CustomEvent('changes-value', {
            detail:{value, name,}
        })
        this.dispatchEvent(event)
    }

    UpdateValue(value){
      this.value = value;
    }
}

customElements.define('input-range', InputRange);
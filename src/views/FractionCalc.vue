<template>
    <div>
        <h1>Калькулятор дробей</h1>
        <p class='info'>Доступные знаки: + , - , * , / , ) ', ( , *( , -( , +( , /( , )- , )+ , )* , )/ </p>
        <p class='info'>Знаки со скобками можно комбинировать в одном input</p>
        <div class="fractions">
            
            <template v-for="(element, index) in CalculatorString">
                <template v-if="element.type === 'operand'">
                    <fraction 
                        :key="index"
                        :id="index"
                        :numerator="Number(element.numerator)"
                        :denominator="Number(element.denominator)"
                        @fractionChange="UpdateCalculatorString"
                    />
                </template>
                <template v-else-if="element.type === 'operation'">
                    <signs 
                        :key="index"
                        :id="index"
                        :isStart="element.isStart"
                        :signVariation="element.signVariation"
                        @signChange="UpdateCalculatorString"
                    />
                </template>
                <template v-else-if="element.type === 'RP' || element.type === 'LP'">
                    <signs 
                        :key="index"
                        :id="index"
                        :isStart="element.isStart"
                        :signVariation="element.signVariation"
                        @signChange="UpdateCalculatorString"
                    />
                </template>
            </template>
            <div class='result'>
                <div class='resultsign'> = </div>
                <div class="resultfractions" >
                    <div class='resultfraction'>{{ResultFraction[0]}} </div>
                    <hr/>
                    <div class='resultfraction'> {{ResultFraction[1]}} </div>
                </div>
            </div>
        </div>
        <div class="error" v-if="err">
             <p>Проверьте правильность введеной строки</p>
            </div>
        <div class="buttons">
            <a @click="FractionAdd" class="addbutton">Add Fraction</a>
            <a @click="AddLastSign" class="addbutton">Add/Delete Last Sign</a>
            <a @click="Clear" class="">Clear</a>
         </div>

    </div>
</template>

<script>
import * as rpn from '../helpers/rpn.js';
import * as math from '../helpers/math.js';

import fraction from '../components/fraction.vue'
import signs from '../components/sign.vue'
export default {
    name:'Calculator',
    components: {
        fraction,
        signs
    },
    data () {
        return {
            CalculatorString: [], //массив содержаший строку для вычисления
            ResultString: [{signVariation:'=', type: 'operation'}, {numerator:null, denominator: null, type: 'operand'}], // массив с вычисленной строкой 
            combinedSigns: ['*(', '-(','+(','/(',')-', ')+',')*',')/'], //симоволы разрешенные к вводу в поля с матаматическими знаками 
            lastsign:false, // параметр, при изменений которого добавляется/удаляется input в конце строки для вычисления
            err: false
        }        
    },
    computed: {
        /*
        *
        * Возвращет данные для отображения результатов вычисления 
        * 
        */
        ResultFraction () {
            let resarr = this.ResultString.filter(item => {
                if (item.type === 'operand') {
                    return item;
                }
            })
            return [resarr[0].numerator ,resarr[0].denominator ]
        }
    },
    methods: {
        /*
        *
        * Обновление строки для вичислений из дочернего компонента
        * Запускает расчет строки
        * 
        */
        UpdateCalculatorString (evt) {
            switch (evt.type) {
                case 'numerator':
                    this.CalculatorString[evt.id].numerator = evt.value
                    break;
                case 'denominator':
                     this.CalculatorString[evt.id].denominator = evt.value
                    break; 
                case 'RP':
                     this.CalculatorString[evt.id].signVariation = evt.value
                     this.CalculatorString[evt.id].type = evt.type
                    break;
                case 'LP':
                     this.CalculatorString[evt.id].signVariation = evt.value
                     this.CalculatorString[evt.id].type = evt.type
                    break;          
                default:
                    this.CalculatorString[evt.id].signVariation = evt.value
                    break;
            }
            this.Calculate()
        },
        /*
        *
        * Добавление матемастического символа в строку для вычислений
        * 
        */
        addSign (sign) {
           this.CalculatorString.push({signVariation:sign, type: 'operation'})
        },
        /*
        *
        * Добавление дроби в строку для вычислений
        * 
        */
        addfraction (numerator, denominator) {
           this.CalculatorString.push({numerator, denominator, type: 'operand'})
        },
        /*
        *
        * Добавление стандартной дроби и матемастического символа 
        * 
        */
        FractionAdd () {
            if (this.lastsign === true) {
                this.lastsign = false
                this.CalculatorString.pop()
            }
            this.addSign('+')
            this.addfraction (1,1)
            
        },
        /*
        *
        * Вычисление дроби
        * 
        */
        Calculate () {
            var arrtocalc = []
            let j = 0
            let chackarr = this.CalculatorString.filter(item => {
                if (item.type === 'operand') {
                    if (item.denominator == 0) {
                        return item;
                    }
                } 
            }) 
            console.log(chackarr)
            if (chackarr.length !== 0) {
                this.err = true
            } else {   
                this.err = false         
                for (let i = 0; i < this.CalculatorString.length; i++) { // получение и разделение парных символов
                    for (let meti in this.combinedSigns) {
                        if (this.CalculatorString[i].signVariation == this.combinedSigns[meti]) {
                            arrtocalc = arrtocalc.concat(this.CalculatorString.slice(j,i))
                            let t = this.CalculatorString[i]
                            j = i
                            if (t.signVariation[0] == '(' || t.signVariation[0] == ')' ) {
                                arrtocalc.push({signVariation:t.signVariation[0], type: t.signVariation[0] == '(' ? 'LP': 'RP'})
                                arrtocalc.push({signVariation:t.signVariation[1], type: 'operation'})
                            } else {
                                arrtocalc.push({signVariation:t.signVariation[0], type: 'operation'})
                                arrtocalc.push({signVariation:t.signVariation[1], type: t.signVariation[0] == '(' ? 'LP': 'RP'})
                                
                            }
                        }
                    }
                }
                arrtocalc = arrtocalc.concat(this.CalculatorString.slice(j+1,this.CalculatorString.length))
                const res = rpn.calculate(arrtocalc)
                let resarr = this.ResultString.map(item => {
                    if (item.type === 'operand') {
                        let nod = math.findNOD([Number(res.denominator), Number(res.numerator)])
                        item.numerator = res.numerator/nod ;
                        item.denominator = res.numerator !== 0 ? res.denominator/nod : '0';
                    }
                    return item;
                })
                this.ResultString = resarr
            }
        },
        /*
        *
        * Сброс и новая иницализация строки для вычисления
        * 
        */
        Clear () {
            this.CalculatorString = []
            this.init()
            this.Calculate()
        },
        /*
        *
        * Иницализация строки для вычисления
        * 
        */
        init() {
            this.addSign (null)
            this.addfraction (1,1)
            this.addSign ('+')
            this.addfraction (1,1)
        },
        /*
        *
        * Добавление/удаление поля для математического знака в конце строки для вычисления
        * 
        */
        AddLastSign () {
            if (this.lastsign) {
                this.lastsign = false
                  this.CalculatorString.pop()
            } else {
                this.lastsign = true
                 this.addSign (null)
            }
        }
    },
    mounted () {
        this.init()
    }
}
</script>

<style scoped lang="scss">
.fractions {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    align-content: baseline;
    margin: 0 0 25px 0;
}
.buttons {
    &::selection {
        background: transparent;
    }
    cursor: pointer;
    font-weight: 800;
    display: flex;
    justify-content: center;
    position: relative;
    left: -10%;
}

.addbutton {
    margin: 0 15px 0 0;
}
.result {
    width: 56px;
    height: 46px;
    display: flex;
    align-content: baseline;
    align-self: center;
    font-weight: 1000;
    font-size: 2rem;
}
.resultsign {
    height: 35px;
    width: 100%;
    text-align: center;
    padding: 0 11px 10px 0;
    margin: -3px 0 0 0;
}
.resultfractions {
    display: flex;
    flex-direction: column;
    align-self: center;
    margin: 0 0 15px 0;
    hr {
        width: 100%
    }
}
.info {
     font-weight: 800;
}
.error {
    font-weight: 800;
    color: rgb(255, 52, 52);
}
</style>

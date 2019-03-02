<template>
    <div class="fraction">
        <input class="numerator" type="number" @change="Change('numerator')" v-model="localnumerator"  />
        <hr/>
         <input class="denominator" type="number" @change="Change('denominator')"  v-model="localdenominator"/>
    </div>
</template>

<script>
export default {
    name: 'fraction',
    props: {numerator: Number, denominator: Number, id: Number},
    data () {
        return {
            localnumerator: null,
            localdenominator: null
        }
    },
    mounted () {
        this.localnumerator = this.numerator
        this.localdenominator = this.denominator
    },
    methods: {
        /*
        *
        * Иницализация обновления строки для вычисления в родительском компоненте
        * 
        */
        Change (val) {
            this.$emit('fractionChange', {id: this.id, type: val, value: val === 'numerator' ? this.localnumerator : this.localdenominator})
        }
    },
    watch: {
        numerator() {
            this.localnumerator = this.numerator
            this.localdenominator = this.denominator
        },
        localnumerator () {
            this.Change('numerator')
        },
        localdenominator () {
            this.Change('denominator')
        }
    }

}
</script>

<style scoped lang="scss">
    .fraction {
        width: 70px;
        display: flex;
        flex-direction: column;
        margin: 0 15px 15px 0
    }
    .numerator  {
        font-family: 'Poiret One';
         font-weight: bold;
        height: 35px;
        flex-grow: 1;
        padding: 5px;
        border-width: 2px;
        border-style: solid;
        font-size: 1.5rem;
        text-align: center;
    }
    .denominator {
        font-family: 'Poiret One';
         font-weight: bold;
        height: 35px;
        flex-grow: 1;
        padding: 5px;
        border-width: 2px;
        border-style: solid;
        font-size: 1.5rem;
        text-align: center;
    }
    input:active, :hover, :focus {
        outline: 0;
        outline-offset: 0;
    }
    hr {
        width: 100%
    }
</style>

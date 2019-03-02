<template>
    <div class="sign" >
        <input class="signinput" v-model="localsign" @change="Change" />        
    </div>
</template>

<script>
export default {
    data () {
        return {
            localsign: null,
            permittedSigns: ['+','-','*','/',')','('],
            combinedSigns: ['*(', '-(','+(','/(',')-', ')+',')*',')/']
        }
    },
    props: {signVariation: String, id: Number},
    mounted () {
            this.localsign = this.signVariation       
    },
    methods: {
        /*
        *
        * Иницализация обновления строки для вычисления в родительском компоненте
        * Если строка не попадает в разрешенные, то она очищается
        * 
        */
        Change () {
            let res = this.allSigns.filter(item => item == this.localsign)
            if (res.length !== 0) {
               switch (true) {
                   case this.localsign.indexOf(')') !== -1:
                       this.$emit('signChange', {id: this.id, value: this.localsign, type: 'RP'})
                       break;
                    case this.localsign.indexOf('(') !== -1:
                       this.$emit('signChange', {id: this.id, value: this.localsign, type: 'LP'})
                       break;
                   default:
                        this.$emit('signChange', {id: this.id, value: this.localsign, type: 'operation'})
                       break;
               }
                
            } else {
                this.localsign = null
            }

        }
    },
    watch: {
        signVariation () {
            this.localsign = this.signVariation      
        },
        localsign () {
            this.Change()
        }
    },
    computed: {
        allSigns () {
            return this.permittedSigns.concat(this.combinedSigns)
        }
    }
}
</script>

<style lang="scss" scoped>
    .sign {
        width: 56px;
        height: 46px;
        display: flex;
        align-content: baseline;
        margin: 0 15px 15px 0;
        align-self: center;
    }
    .signinput {
        height: 35px;
        width: 100%;
        border-width: 2px;
        border-style: solid;
        font-size: 1.5rem;
        text-align: center;
    }
</style>


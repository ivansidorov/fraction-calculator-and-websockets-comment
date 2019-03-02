<template>
    <div class="container">
        <div class="item">
            <h1>Комментарии</h1>
             <a @click="isDeb = !isDeb;" class="modes">Текуший режим: <span v-if="isDeb">Тестовый</span><span v-else>Продакшн</span>. Режимы переключаются кликом</a>
            <div class="comments">
                    <div class="comment" v-for="(comment,index) in comments" :key="index">                           
                            <span class="commenttext">{{comment.text}}</span>
                            <a class="button" @click="DeleteComment(comment.id)"> <i class="material-icons close">close</i></a>
                    </div>
            </div>
           
        </div>
    </div>   
</template>

<script>
export default {
    name: 'comments',
    data() {
        return {
            comments: [
                {text: 'Тестовый коммент', id: 0},
                {text: 'Это шедевр', id: 1},
                {text: 'Это прекрасно', id: 2},
                {text: 'Лучшее, что я видел', id: 3},
                {text: 'Тестовый комментарий 4', id: 4},
                {text: 'Тестовый комментарий 5', id: 5},
                {text: 'Тестовый комментарий 6', id: 6},
                {text: 'Тестовый комментарий 7', id: 7},
                {text: 'Тестовый комментарий 8', id: 8},
                {text: 'Тестовый комментарий 9', id: 9}

            ], // стек комментариев
            WSecho: null,
            requests: [], //стек запросов к серверу
            WebSocketUrl: 'wss://echo.websocket.org', 
            timeout: 10000,
            isDeb: false,
        }

    },
    methods: {
        DeleteComment (id) {
            if (this.isDeb) {
                this.DeleteCommentDev(id)
            } else {
                this.DeleteCommentProd(id)
            }
        },
        /*
        *
        *   Инициализируем удаление комментария
        *   @param id
        * 
        */
        DeleteCommentProd (id) {
            this.requests.push (id) //Добавляем id в стек запросов к серверу
            this.WSecho.send(id) //Отправляем id на сервер

            setTimeout(() => { //удаляем id из списка по истечению таймаута
                 this.requests = this.requests.filter(item => item !== id) 
            }, this.timeout);
        },

        /*
        *
        *   Инициализируем тестовое удаление комментария
        *   Имитация долгого ответа сервра и возвращения неверного id
        * 
        *  @param id
        * 
        */

        DeleteCommentDev (id) {
            this.requests.push(id)

            if(id === 1) id = 25 // Для эмуляции отсуствия ответа от сервера меняем id на другой 

            if (id !== 1 && id !== 3) { // отправляем данные на сервер, если коменнатрии не "Это шедевр" и не "Лучшее, что я видел"
                this.WSecho.send(id)
            }

            if (id === 3) { // Для эмуляции долгого ответа от сервера добавляем timeout к запросу 
                setTimeout(() => {
                   this.WSecho.send(id)
                }, 20000);
            }

             setTimeout(() => { //удаляем id из списка по истечению таймаута
                 this.requests = this.requests.filter(item => item !== id) 
            }, this.timeout);
        },
        /* 
         *  Получаем сообщение от сервера и проверяем есть ли id в списке отправленных
         *   
        */
        WsMessage (message) {
            let isinReq = this.requests.filter(item => item == +message) 
            if (isinReq.length > 0) {
                this.DeleteId(+message)
                this.DeleteFromComments(+message)
            }
        },

        /* 
         *  Удаляем из стека отправленных id
         *   
        */
        DeleteId (id) {
            this.requests = this.requests.filter(item => item!== id) 
        },
        /* 
         *  Удаляем комментарий из списка
         *   
        */
        DeleteFromComments (id) {
            this.comments = this.comments.filter(item => item.id !== id)
        }
    },
    mounted () {
        this.WSecho = new WebSocket(this.WebSocketUrl) // Подключаемся к серверу
        this.WSecho.onopen = () => console.log('WebSocket connection opened')
        this.WSecho.onclose = () => console.log('WebSocket connection closed')
        this.WSecho.onmessage = event => this.WsMessage (event.data)
        this.WSecho.onerror = error => console.error(`WebSocket error: ${error}`)
    },
    destroyed () {
        this.WSecho.close() // Закрываем соединение с сервером при закрытии страницы
    }
}
</script>

<style lang="scss" scoped>

.container {
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-content: center;
}
.item {
     flex-grow: 1;
}

.comments {
    margin: 15px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
     
}
.layout {
    display: flex;
    align-self: center;
    justify-content: center;
}
.comment {
    flex-direction: row;
    padding: 0 10px 0 10px;
    flex-grow: 1;
    align-content: center;
    justify-content: space-between;
    align-self: center;
    display: flex;
    margin: 0 0 15px 0;
    width: 500px;
    height: 50px;
    box-shadow:0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);

}
@media (max-width: 500px) {
    .comment {
        width: 100%;
    }
    .comments {
        padding: 0 10px 0 10px;
    }
}

.close {
    text-align: center;
}
.button {
    padding: 5px 0 0 0;
     align-self: center;
    cursor: pointer;
}
.commenttext {
    align-self: center;
}
.modes {
    &::selection {
        background: transparent;
    }
    cursor: pointer;
}
</style>


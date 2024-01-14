<template>
    <div class="p-3 flex flex-col gap-3 relative w-full h-[70dvh] ">
        <div class="flex flex-col gap-3 overflow-y-auto h-[90%] pb-10" ref="conversation">
            <div class="flex flex-col gap-3" v-for="message of messages">
                <div v-if="message.sender_id == user._id" class="flex gap-2 w-1/2 items-end ">
                          <img
                    class="w-8 h-8 shrink-0 object-cover rounded-full"
                    :src="personPic"
                    alt=""
                  />
                  <h1 class="bg-gray-200 p-2 font-medium rounded-xl text-sm w-fit break-words">
                      {{ message.text }}
                    </h1>
                </div>
                <div v-else class="w-full flex justify-end">
                    <div class="flex flex-row-reverse w-1/2 gap-2 items-end">
                              <img
                        class="w-8 h-8 shrink-0 object-cover rounded-full"
                        :src="personPic"
                        alt=""
                      />
                         <h1 class="bg-gray-200 p-2 font-medium rounded-xl text-sm w-fit break-words">
                          {{ message.text }}
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="absolute bottom-0 w-[95%] left-1/2 -translate-x-1/2 ">
            <FwbInput v-model="message" placeholder="Write a message .." class="py-4"></FwbInput>
            <FwbButton @click="sendMessage" class="absolute top-1/2 -translate-y-1/2 text-xs  right-2" color="green">Send</FwbButton>
        </div>
    </div>
</template>

<script setup>
import personPic from "../../public/profilePerson.png";
import {FwbInput, FwbButton} from 'flowbite-vue'
import axios from "../axios"
import {ref, onMounted, watch} from "vue"
import {toast} from 'vue-sonner'
import {useUserStore} from "../stores/userStore"

const message = ref("");
const props = defineProps(['party'])
const messages = ref( [])
const {user} = useUserStore();
const emit = defineEmits(['message-sent'])
const conversation = ref()

watch(props, () => {
    messages.value = props.party.messages
}, {immediate: true})


const sendMessage = async () => {
     try {
        const text = message.value;
        messages.value.push({text, sender_id: user._id, partyId: props.party._id})
        message.value = ""
        emit("message-sent", { text, sender_id: user._id, partyId: props.party._id } )
        const { data } = await axios.post(`/party/message/`, {
            text,
            partyId: props.party._id,
        });
    } catch (e) {
        toast.error(e);
        console.log(e);
    }
}

const scrollToBottom = () => {
    console.log('gg')
    setTimeout(() => {
        conversation.value.scrollTop = conversation.value.scrollHeight
    }, 0);};

watch(messages.value, () => scrollToBottom())

onMounted(scrollToBottom)
</script>
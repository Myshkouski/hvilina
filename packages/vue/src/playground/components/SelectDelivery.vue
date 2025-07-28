<script setup lang="ts">

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { RadioGroup, RadioGroupItem } from '~/components/ui/radio-group'
import { onBeforeMount } from 'vue'

const deliveryId = defineModel<string | undefined>("deliveryId")

const availableDeliveryMethods = [
  {
    id: "3",
    label: "Lab",
    disabled: true
  },
  {
    id: "2",
    label: "Home",
    disabled: false
  }
] as const

onBeforeMount(() => {
  if (!deliveryId.value) {
    deliveryId.value = availableDeliveryMethods.find(item => !item.disabled)?.id
  }
})

</script>

<template>
  <FormField
    v-model="deliveryId"
    v-slot="{ componentField }" 
    type="radio" 
    name="deliveryId"
  >
    <FormItem class="space-y-3">
      <div class="mb-4">
        <FormLabel class="text-base">
          Delivery
        </FormLabel>
        <FormDescription>
          Select the delivery type
        </FormDescription>
      </div>

      <FormControl>
        <RadioGroup v-bind="componentField">
          <FormItem 
            v-for="deliveryMethod in availableDeliveryMethods" 
            class="flex items-center space-y-0 gap-x-3"
          >
            <FormControl>
              <RadioGroupItem :value="deliveryMethod.id" :disabled="deliveryMethod.disabled" />
            </FormControl>
            <FormLabel class="font-normal">
              {{ deliveryMethod.label }}
            </FormLabel>
          </FormItem>
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  </FormField>
</template>

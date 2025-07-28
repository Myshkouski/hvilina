<template>
  <FormField name="serviceIds" v-model="serviceIds" v-slot="{ componentField }" >
    <FormItem>
      <div class="mb-4">
        <FormLabel class="text-base">
          Services
        </FormLabel>
        <FormDescription>
          Select the service you want to order
        </FormDescription>
      </div>

      <FormField
        v-for="service in availableServices" 
        v-slot="slotProps" 
        :key="service.id" 
        type="checkbox"
        :name="componentField.name" 
        :value="service.id" 
        :unchecked-value="false"
      >
        <FormItem class="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox :model-value="true === slotProps.value?.includes(service.id)"
              @update:model-value="slotProps.handleChange" />
          </FormControl>
          <FormLabel class="font-normal">
            <div class="space-y-2">
              <p>{{ service.label }}</p>
              <p v-show="service.scheduleRequirements?.length" class="text-muted-foreground">{{
                service.scheduleRequirements?.join(", ") }}</p>
            </div>
          </FormLabel>
        </FormItem>
      </FormField>
      <FormMessage />
    </FormItem>
  </FormField>

  <!-- <div class="flex justify-start mt-4">
      <Button type="submit">
        Submit
      </Button>
    </div> -->
</template>

<script setup lang="ts">

// import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { computed } from 'vue'

const services = defineModel<Service[]>("services", {
  default: []
})

const availableServices: Service[] = [
  {
    id: "1",
    label: "Service 1"
  },
  {
    id: "2",
    label: "Service 2",
    scheduleRequirements: [
      "timeslots_10_30_to_11_30"
    ]
  }
]

const serviceIds = computed({
  get() {
    return services.value.map(service => service.id)
  },
  set(value) {
    services.value = availableServices.filter(service => {
      return value.includes(service.id)
    })
  }
})

export type Service = {
  id: string
  label: string
  scheduleRequirements?: [string, ...string[]]
}

</script>

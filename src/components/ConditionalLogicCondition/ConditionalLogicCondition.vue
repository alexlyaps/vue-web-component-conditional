<template>
  <div class="condition-content" :key="conditionId" :data-condition-id="conditionId">
    <SvgIcon name="drag_drop_web" :size="16" color="gray-400" />
    <div class="condition-content__grid">
      <DropdownLogic :options="optionsElement" placeholder="All" @select="handleElementSelect" width="wide" />
      <DropdownLogic :options="optionsOperation" placeholder="All" @select="handleOperationsSelect" width="wide" />
      <InputDropdownLogic :options="optionsElement" placeholder="Type or select" @select="handleValueSelect" icon="plus-square" />
    </div>
    <SvgIcon name="trash-2" :size="20" color="gray-500" class="delete-condition" />
  </div>
</template>

<script>
import SvgIcon from '@/components/SvgIcon/SvgIcon.vue';
import DropdownLogic from '@/components/Inputs/DropdownLogic.vue';
import InputDropdownLogic from '@/components/Inputs/InputDropdownLogic.vue';

const optionsElement = [
  { value: 'element1', label: 'Element 1' },
  { value: 'element2', label: 'Element 2' },
  { value: 'element3', label: 'Element 3' },
];

const optionsOperation = [
  { value: 'equals', label: 'Equals' },
  { value: 'does_not_equal', label: 'Does not Equal' },
  { value: 'is_empty', label: 'Is Empty' },
  { value: 'is_not_empty', label: 'Is Not Empty' },
  { value: 'contains', label: 'Contains' },
  { value: 'does_not_contain', label: 'Does Not Contain' },
];

export default {
  components: {
    SvgIcon,
    DropdownLogic,
    InputDropdownLogic,
  },
  name: 'LogicNode',
  props: {
    conditionId: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleElementSelect(option) {
      this.$emit('isElementSelect', option, this.conditionId);
    },
    handleOperationsSelect(option) {
      this.$emit('isOperationsSelect', option, this.conditionId);
    },
    handleValueSelect(option) {
      this.$emit('isValueSelect', option, this.conditionId);
    },
  },
  emits: ['isOperationsSelect', 'isElementSelect', 'isValueSelect'],
  data() {
    return {
      optionsElement,
      optionsOperation,
    };
  },
};
</script>

<style src="./ConditionalLogicCondition.scss" lang="scss" scoped />

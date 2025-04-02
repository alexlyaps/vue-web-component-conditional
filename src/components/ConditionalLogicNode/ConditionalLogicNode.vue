<template>
  <div class="logic-node" v-for="node in logicObj" :key="node.id">
    <ConditionalLogicCondition
      v-if="node.type === 'condition'"
      :key="node.id"
      :conditionId="node.id"
      @isOperationsSelect="isOperationsSelect"
      @isElementSelect="isElementSelect"
      @isValueSelect="isValueSelect"
    />

    <div v-else-if="node.type === 'group' && node.id === 0" :data-group-id="node.id" class="group" :key="node.id + 5000">
      <RowComponent direction="row" justifyItems="space-between" alignItems="center">
        <RowComponent direction="row" justifyItems="start" alignItems="center" :columnGap="10">
          <ButtonBase caption="Add condition" leftIcon="plus" size="md" variant="link_gray" class="add-condition" />
          <ButtonBase caption="Add group" leftIcon="plus" size="md" variant="link_gray" class="add-group" />
        </RowComponent>
        <ButtonBase caption="Clear all filters" size="md" variant="link_gray" @click="$emit('clearAllClick')" />
      </RowComponent>
      <div class="main-group">
        <DropdownLogic :options="optionsAllAny" placeholder="All" @select="(option) => isAllAnySelect(option, node.id)" width="narrow" />
        <div class="main-group__logic">
          <ConditionalLogicNode
            :logicObj="node.conditions"
            @isAllAnySelect="isAllAnySelect"
            @isOperationsSelect="isOperationsSelect"
            @isElementSelect="isElementSelect"
            @isValueSelect="isValueSelect"
          />
        </div>
      </div>
    </div>

    <div v-else-if="node.type === 'group' && node.id !== 0" :data-group-id="node.id" class="group" :key="node.id + 10000">
      <div class="additional-group" :data-group-id="node.id">
        <SvgIcon name="drag_drop_web" :size="16" color="gray-400" class="drag-group" />
        <div class="additional-group__content" :class="`group ${node.color ? 'gray' : 'white'}`">
          <RowComponent direction="row" justifyItems="space-between" alignItems="center" :bottomIndent="16">
            <DropdownLogic
              :options="optionsAllAny"
              placeholder="All"
              @select="(option) => isAllAnySelect(option, node.id)"
              width="narrow"
              :bottomIndent="0"
            />
            <RowComponent direction="row" justifyItems="start" alignItems="center" :columnGap="10" :bottomIndent="0">
              <ButtonBase caption="Add condition" leftIcon="plus" size="md" variant="link_gray" class="add-condition" />
              <ButtonBase caption="Add group" leftIcon="plus" size="md" variant="link_gray" class="add-group" />
              <SvgIcon name="trash-2" :size="20" color="gray-500" class="delete-group" />
            </RowComponent>
          </RowComponent>

          <div class="main-group__logic">
            <ConditionalLogicNode
              :logicObj="node.conditions"
              @isAllAnySelect="isAllAnySelect"
              @isOperationsSelect="isOperationsSelect"
              @isElementSelect="isElementSelect"
              @isValueSelect="isValueSelect"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ConditionalLogicCondition from '@/components/ConditionalLogicCondition/ConditionalLogicCondition.vue';
import RowComponent from '@/components/RowComponent/RowComponent.vue';
import ButtonBase from '@/components/ButtonBase/ButtonBase.vue';
import DropdownLogic from '@/components/Inputs/DropdownLogic.vue';
import SvgIcon from '../SvgIcon/SvgIcon.vue';

export default {
  emits: ['isOperationsSelect', 'isElementSelect', 'isValueSelect', 'isAllAnySelect', 'clearAllClick'],
  components: {
    ConditionalLogicCondition,
    RowComponent,
    ButtonBase,
    DropdownLogic,
    SvgIcon,
  },
  name: 'LogicNode',
  props: {
    logicObj: {
      type: Object,
      required: true,
    },
  },
  methods: {
    isAllAnySelect(option, id) {
      this.$emit('isAllAnySelect', option, id);
    },
    isOperationsSelect(...args) {
      this.$emit('isOperationsSelect', ...args);
    },
    isElementSelect(...args) {
      this.$emit('isElementSelect', ...args);
    },
    isValueSelect(...args) {
      this.$emit('isValueSelect', ...args);
    },
  },
  data() {
    return {
      optionsAllAny: [
        { value: 'all', label: 'All' },
        { value: 'any', label: 'Any' },
      ],
    };
  },
};
</script>

<style src="./ConditionalLogicNode.scss" lang="scss" scoped />

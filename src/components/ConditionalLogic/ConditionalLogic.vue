<template>
  <div class="background-overlay" ref="outside" @click="handleClickOutside">
    <div class="wrapper">
      <div class="content">
        <RowComponent
          direction="row"
          justifyItems="space-between"
          alignItems="center"
          :bottomIndent="24"
        >
          <TextComponent
            tag="h2"
            size="display-xs"
            weight="semibold"
            align="left"
            color="plum-blue"
          >
            LOGIC
          </TextComponent>
        </RowComponent>
        <div class="content__main" @click="handleClick">
          <ConditionalLogicNode
            :logicObj="userLogic"
            @isElementSelect="handleElementSelect"
            @isOperationsSelect="handleOperationsSelect"
            @isValueSelect="handleValueSelect"
            @isAllAnySelect="handleAllAnySelect"
            @clearAllClick="handleClearAllClick"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TextComponent from "@/components/TextComponent/TextComponent.vue";
import RowComponent from "@/components/RowComponent/RowComponent.vue";
import ConditionalLogicNode from "@/components/ConditionalLogicNode/ConditionalLogicNode.vue";

export default {
  name: "ConditionalLogic",
  components: {
    TextComponent,
    RowComponent,
    ConditionalLogicNode,
  },
  emits: ["xClick"],
  props: {
    title: {
      type: String,
      default: "Conditional logic",
    },
  },
  data() {
    return {
      idCounter: 3,
      userLogic: [
        {
          id: 0,
          color: false,
          type: "group",
          allAny: "all",
          conditions: [
            {
              id: 1,
              type: "condition",
              element: "element1",
              operation: "equals",
              value: "",
            },
            {
              id: 2,
              type: "condition",
              element: "element1",
              operation: "equals",
              value: "",
            },
          ],
        },
      ],
    };
  },
  methods: {
    findGroupById(groupId, conditions) {
      for (let i = 0; i < conditions.length; i++) {
        if (conditions[i].type === "group" && conditions[i].id === groupId) {
          return conditions[i];
        } else if (conditions[i].type === "group") {
          const found = this.findGroupById(groupId, conditions[i].conditions);
          if (found) return found;
        }
      }
      return null;
    },
    recursiveDeleteGroup(groupId, conditions) {
      for (let i = 0; i < conditions.length; i++) {
        if (conditions[i].type === "group" && conditions[i].id === groupId) {
          conditions.splice(i, 1);
          return true;
        } else if (conditions[i].type === "group") {
          this.recursiveDeleteGroup(groupId, conditions[i].conditions);
        }
      }
      return false;
    },
    recursiveDeleteCondition(conditionId, conditions) {
      for (let i = 0; i < conditions.length; i++) {
        if (
          conditions[i].type === "condition" &&
          +conditions[i].id === +conditionId
        ) {
          conditions.splice(i, 1);
          return true;
        } else if (conditions[i].type === "group") {
          this.recursiveDeleteCondition(conditionId, conditions[i].conditions);
        }
      }
      return false;
    },
    recursiveSearchAndReplace(conditionId, conditions, inputType, optionValue) {
      for (let i = 0; i < conditions.length; i++) {
        if (
          conditions[i].type === "condition" &&
          conditions[i].id === conditionId
        ) {
          conditions[i][inputType] = optionValue.value;
          return true;
        } else if (conditions[i].type === "group") {
          this.recursiveSearchAndReplace(
            conditionId,
            conditions[i].conditions,
            inputType,
            optionValue
          );
        }
      }
      return false;
    },
    recursiveSetAllAny(groupId, conditions, optionValue) {
      for (let i = 0; i < conditions.length; i++) {
        if (conditions[i].type === "group" && conditions[i].id === groupId) {
          conditions[i].allAny = optionValue.value;
        } else if (conditions[i].type === "group") {
          this.recursiveSetAllAny(
            groupId,
            conditions[i].conditions,
            optionValue
          );
        }
      }
      return null;
    },
    handleAllAnySelect(option, id) {
      this.recursiveSetAllAny(id, this.userLogic, option);
    },
    handleElementSelect(option, conditionId) {
      this.recursiveSearchAndReplace(
        conditionId,
        this.userLogic,
        "element",
        option
      );
    },
    handleOperationsSelect(option, conditionId) {
      this.recursiveSearchAndReplace(
        conditionId,
        this.userLogic,
        "operation",
        option
      );
    },
    handleValueSelect(option, conditionId) {
      this.recursiveSearchAndReplace(
        conditionId,
        this.userLogic,
        "value",
        option
      );
    },

    handleDragClick() {
      console.log("Drag click");
    },
    handleAddConditionClick(groupId) {
      const group = this.findGroupById(groupId, this.userLogic);
      if (group) {
        group.conditions.push({
          type: "condition",
          id: this.idCounter++,
          element: "element1",
          operation: "equals",
          value: "",
        });
      }
    },
    handleDeleteGroupClick(groupId) {
      this.recursiveDeleteGroup(groupId, this.userLogic);
    },
    handleAddGroupClick(groupId) {
      const group = this.findGroupById(groupId, this.userLogic);

      let isGray = !group.color;
      if (group) {
        group.conditions.push({
          id: this.idCounter++,
          type: "group",
          color: isGray,
          allAny: "all",
          conditions: [
            {
              type: "condition",
              id: this.idCounter++,
              element: "element1",
              operation: "equals",
              value: "",
            },
          ],
        });
      }
    },
    handleDeleteClick(conditionId) {
      this.recursiveDeleteCondition(conditionId, this.userLogic);
    },
    handleClick(event) {
      const addConditionButton = event.target.closest(".add-condition");
      const addGroupButton = event.target.closest(".add-group");
      const deleteGroupButton = event.target.closest(".delete-group");
      const deleteConditionButton = event.target.closest(".delete-condition");

      if (addConditionButton) {
        const groupId =
          +addConditionButton.closest("[data-group-id]").dataset.groupId;
        this.handleAddConditionClick(groupId);
      } else if (addGroupButton) {
        const groupId =
          +addGroupButton.closest("[data-group-id]").dataset.groupId;
        this.handleAddGroupClick(groupId);
      } else if (deleteGroupButton) {
        const groupId =
          +deleteGroupButton.closest("[data-group-id]").dataset.groupId;
        this.handleDeleteGroupClick(groupId);
      } else if (deleteConditionButton) {
        const conditionId = +deleteConditionButton.closest(
          "[data-condition-id]"
        ).dataset.conditionId;
        this.handleDeleteClick(conditionId);
      }
    },
    handleClearAllClick() {
      this.userLogic = [
        {
          id: 0,
          color: false,
          type: "group",
          allAny: "all",
          conditions: [
            {
              id: 1,
              type: "condition",
              element: "element1",
              operation: "equals",
              value: "",
            },
            {
              id: 2,
              type: "condition",
              element: "element1",
              operation: "equals",
              value: "",
            },
          ],
        },
      ];
    },
    handleCancelClick() {
      console.log("Cancel Click");
    },
    handleSaveClick() {
      console.log("Save Click");
    },
    handleXClick() {
      this.$emit("xClick");
    },
    handleClickOutside(e) {
      const outside = this.$refs.outside;
      if (e.target === outside) {
        this.$emit("xClick");
      }
    },
  },
};
</script>

<style src="./ConditionalLogic.scss" lang="scss" scoped />

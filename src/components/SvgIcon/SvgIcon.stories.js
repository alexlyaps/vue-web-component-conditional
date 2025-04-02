import SvgIcon from './SvgIcon.vue';
import IconsArray from './IconsArray';

export default {
  title: 'Components/SvgIcon',
  component: SvgIcon,
  argTypes: {
    name: {
      control: { type: 'select' }, // Позволяет выбирать иконки из списка
      options: IconsArray, // Список доступных иконок
    },
    size: {
      control: { type: 'number' },
      defaultValue: 24,
    },
    color: {
      control: { type: 'select' },
      options: [
        'gray-25',
        'gray-50',
        'gray-100',
        'gray-200',
        'gray-300',
        'gray-400',
        'gray-500',
        'gray-600',
        'gray-700',
        'gray-800',
        'gray-900',
        'primary-25',
        'primary-50',
        'primary-100',
        'primary-200',
        'primary-300',
        'primary-400',
        'primary-500',
        'primary-600',
        'primary-700',
        'primary-800',
        'primary-900',
        'error-25',
        'error-50',
        'error-100',
        'error-200',
        'error-300',
        'error-400',
        'error-500',
        'error-600',
        'error-700',
        'error-800',
        'error-900',
        'warning-25',
        'warning-50',
        'warning-100',
        'warning-200',
        'warning-300',
        'warning-400',
        'warning-500',
        'warning-600',
        'warning-700',
        'warning-800',
        'warning-900',
        'success-25',
        'success-50',
        'success-100',
        'success-200',
        'success-300',
        'success-400',
        'success-500',
        'success-600',
        'success-700',
        'success-800',
        'success-900',
      ],
      description: 'Цвет текста',
    },
  },
};

const Template = (args) => ({
  components: { SvgIcon },
  setup() {
    return { args };
  },
  template: '<SvgIcon name="eye" v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  size: 24,
  color: 'currentColor',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  name: 'clipboard',
  size: 48,
  color: 'warning-700',
};

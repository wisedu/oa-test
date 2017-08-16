import { Field } from 'bh-mint-ui2'

const EmapSwitch = {
  template: `<mt-cell :title="label">
    <mt-switch  ></mt-switch>
  </mt-cell>`,
  props: {
    label: { type: String, default: '' }

  }
}

export default {
  components: {
    _text: Field,
    _switcher: EmapSwitch
  }
}
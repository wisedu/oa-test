
const EmapSwitch = {
  name: 'mt-switcher',
  template: `<mt-cell :title="label">
    <mt-switch  ></mt-switch>
  </mt-cell>`,
  props: {
    label: { type: String, default: '' }

  }
}

export default {
    _text: window.MINT.Field,
    _switcher: EmapSwitch,
    _select: window.MINT.Selector,
    '_number-range': window.MINT.Field,
    '_date-full': window.MINT.Field,
    '_tree': window.MINT.Field,
    '_cache-upload': window.MINT.Field,
    '_textarea': window.MINT.Field
}
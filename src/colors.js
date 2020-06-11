// TODO: This file was created by bulk-decaffeinate.
// Sanity-check the conversion and remove this comment.
import * as _ from 'lodash-es'

const $black12 = 'rgba(0, 0, 0, 0.12)'
const $black26 = 'rgba(0, 0, 0, 0.26)'
const $black54 = 'rgba(0, 0, 0, 0.54)'
const $black70 = 'rgba(0, 0, 0, 0.70)'
const $black87 = 'rgba(0, 0, 0, 0.87)'
const $black = '#000000'
const $white = '#ffffff'
const $white54 = 'rgba(255, 255, 255, 0.54)'

var colors = _.defaults({
  default: {
    '--header-500': '#ffffff', // t100
    '--header-500-text': $black87,
    '--header-500-text-54': $black54,
    '--header-500-icon': '#757575',

    '--primary-50': '#E8E4F1',
    '--primary-100': '#C5BDDD',
    '--primary-200': '#9E91C7',
    '--primary-300': '#7764B0',
    '--primary-400': '#59439F',
    '--primary-500': '#3C228E',
    '--primary-600': '#361E86',
    '--primary-700': '#2E197B',
    '--primary-800': '#271471',
    '--primary-900': '#1c0b51',
    '--primary-100-text': $black87,
    '--primary-200-text': $black87,
    '--primary-300-text': '#FAFAFA',
    '--primary-400-text': '#FAFAFA',
    '--primary-500-text': '#FAFAFA',
    '--primary-600-text': '#FAFAFA',
    '--primary-700-text': '#FAFAFA',
    '--primary-800-text': '#FAFAFA',
    '--primary-900-text': '#FAFAFA',
    '--primary-900-text-54': 'rgba(250, 250, 250, 0.54)',

    '--secondary-50': '#FFE5F0',
    '--secondary-100': '#FFBFD8',
    '--secondary-200': '#FF94BF',
    '--secondary-300': '#FF69A5',
    '--secondary-400': '#FF4991',
    '--secondary-500': '#FF297E',
    '--secondary-600': '#FF2476',
    '--secondary-700': '#FF1F6B',
    '--secondary-800': '#FF1961',
    '--secondary-900': '#FF0F4E',
    '--secondary-100-text': $black87,
    '--secondary-200-text': $black87,
    '--secondary-300-text': $black87,
    '--secondary-400-text': $black87,
    '--secondary-500-text': $white,
    '--secondary-600-text': $white,
    '--secondary-700-text': $white,
    '--secondary-800-text': $white,
    '--secondary-900-text': $white,

    '--bg-color': '#ffffff',
    '--bg-color-26': 'rgba(255, 255, 255, 0.26)',
    '--bg-color-alt-1': '#F8F8F8', // changed from f5f5f5
    '--bg-color-alt-2': '#EEEEEE',
    '--bg-backdrop': 'rgba(250, 250, 250, 0.73)',
    '--bg-text': $black70,
    '--bg-text-6': 'rgba(0, 0, 0, 0.06)',
    '--bg-text-12': $black12,
    '--bg-text-26': $black26,
    '--bg-text-38': 'rgba(0, 0, 0, 0.38)',
    '--bg-text-54': $black54,
    '--bg-text-60': 'rgba(0, 0, 0, 0.6)',
    '--bg-text-70': $black70,
    '--bg-text-87': $black87,
    '--bg-text-100': $black,

    '--quaternary-500': '#fedf57',
    '--quaternary-500-text': $white,
    '--test-color': '#000'
  }, // don't change

  $header500: 'var(--header-500)',
  $header500Text: 'var(--header-500-text)',
  $header500Text54: 'var(--header-500-text54)',
  $header500Icon: 'var(--header-500-icon)',

  $primary50: 'var(--primary-50)',
  $primary100: 'var(--primary-100)',
  $primary200: 'var(--primary-200)',
  $primary300: 'var(--primary-300)',
  $primary400: 'var(--primary-400)',
  $primary500: 'var(--primary-500)',
  $primary50096: 'var(--primary-50096)',
  $primary600: 'var(--primary-600)',
  $primary700: 'var(--primary-700)',
  $primary800: 'var(--primary-800)',
  $primary900: 'var(--primary-900)',
  $primaryMain: 'var(--primary-500)',

  $primary100Text: 'var(--primary-100-text)',
  $primary200Text: 'var(--primary-200-text)',
  $primary300Text: 'var(--primary-300-text)',
  $primary400Text: 'var(--primary-400-text)',
  $primary500Text: 'var(--primary-500-text)',
  $primary500Text54: 'var(--primary-500-text-54)',
  $primary600Text: 'var(--primary-600-text)',
  $primary700Text: 'var(--primary-700-text)',
  $primary800Text: 'var(--primary-800-text)',
  $primary900Text: 'var(--primary-900-text)',
  $primaryMainText: 'var(--primary-900-text)',
  $primaryMainText54: 'var(--primary-900-text-54)',

  $secondary50: 'var(--secondary-50)',
  $secondary100: 'var(--secondary-100)',
  $secondary200: 'var(--secondary-200)',
  $secondary300: 'var(--secondary-300)',
  $secondary400: 'var(--secondary-400)',
  $secondary500: 'var(--secondary-500)',
  $secondary600: 'var(--secondary-600)',
  $secondary700: 'var(--secondary-700)',
  $secondary800: 'var(--secondary-800)',
  $secondary900: 'var(--secondary-900)',
  $secondaryMain: 'var(--secondary-700)',

  $secondary100Text: 'var(--secondary-100-text)',
  $secondary200Text: 'var(--secondary-200-text)',
  $secondary300Text: 'var(--secondary-300-text)',
  $secondary400Text: 'var(--secondary-400-text)',
  $secondary500Text: 'var(--secondary-500-text)',
  $secondary600Text: 'var(--secondary-600-text)',
  $secondary700Text: 'var(--secondary-700-text)',
  $secondary800Text: 'var(--secondary-800-text)',
  $secondary900Text: 'var(--secondary-900-text)',
  $secondaryMainText: 'var(--secondary-700-text)',

  $bgColor: 'var(--bg-color)',
  $bgColor26: 'var(--bg-color-26)',
  $bgColorAlt1: 'var(--bg-color-alt-1)',
  $bgColorAlt2: 'var(--bg-color-alt-2)',
  $bgBackdrop: 'var(--bg-backdrop)',

  // '$quaternary50': 'var(--quaternary-50)'
  // '$quaternary100': 'var(--quaternary-100)'
  // '$quaternary200': 'var(--quaternary-200)'
  // '$quaternary300': 'var(--quaternary-300)'
  // '$quaternary400': 'var(--quaternary-400)'
  $quaternary500: 'var(--quaternary-500)',
  // '$quaternary600': 'var(--quaternary-600)'
  // '$quaternary700': 'var(--quaternary-700)'
  // '$quaternary800': 'var(--quaternary-800)'
  // '$quaternary900': 'var(--quaternary-900)'
  // # '$quaternary90012': 'var(--quaternary-90012)'
  // # '$quaternary90054': 'var(--quaternary-90054)'
  // # '$quaternary100Text': 'var(--quaternary-100-text)'
  // # '$quaternary200Text': 'var(--quaternary-200-text)'
  // # '$quaternary300Text': 'var(--quaternary-300-text)'
  // # '$quaternary400Text': 'var(--quaternary-400-text)'
  // '$quaternary500Text': 'var(--quaternary-500-text)'
  // # '$quaternary500Text70': 'var(--quaternary-500-text-70)'
  // # '$quaternary600Text': 'var(--quaternary-600-text)'
  // # '$quaternary700Text': 'var(--quaternary-700-text)'
  // # '$quaternary800Text': 'var(--quaternary-800-text)'
  // # '$quaternary900Text': 'var(--quaternary-900-text)'

  $bgText: 'var(--bg-text)',
  $bgText6: 'var(--bg-text-6)',
  $bgText12: 'var(--bg-text-12)',
  $bgText26: 'var(--bg-text-26)',
  $bgText38: 'var(--bg-text-38)',
  $bgText54: 'var(--bg-text-54)',
  $bgText60: 'var(--bg-text-60)',
  $bgText70: 'var(--bg-text-70)',
  $bgText87: 'var(--bg-text-87)',
  $bgText100: 'var(--bg-text-100)',

  $tabSelected: $white,
  $tabUnselected: '#1a1a1a',

  $tabSelectedAlt: $white,
  $tabUnselectedAlt: $white54,

  $transparent: 'rgba(0, 0, 0, 0)',
  $common: '#3e4447',
  $white: $white,
  $red500: '#F44336',
  $amber500: '#FFC107',

  getRawColor (color) {
    let matches
    if ((typeof color === 'string') && (matches = color.match(/\(([^)]+)\)/))) {
      return colors.default[matches[1]]
    } else {
      return color
    }
  }
})

// no css-variable support
if (typeof window !== 'undefined' && window !== null) {
  const $$el = document.getElementById('css-variable-test')
  const isCssVariableSupported = !$$el ||
    window.CSS?.supports?.('--fake-var', 0) ||
    (getComputedStyle($$el, null)?.backgroundColor === 'rgb(0, 0, 0)')
  if (!isCssVariableSupported) {
    colors = _.mapValues(colors, (color, key) => colors.getRawColor(color))
  }
}

export default colors

export var nteeColors = {
  A: { bg: '#e0e1ee', fg: '#1a2380', graph: '#1a2380' },
  B: { bg: '#fee6dc', fg: '#e84200', graph: '#fd6326' },
  C: { bg: '#edf3e1', fg: '#6d9a1a', graph: '#b1ce4d' },
  D: { bg: '#ece2f6', fg: '#7d3ac0', graph: '#7d3ac0' },
  E: { bg: '#ddf6f6', fg: '#039593', graph: '#1ce5bd' },
  F: { bg: '#def0f6', fg: '#1395c3', graph: '#1aabdd' },
  G: { bg: '#fde3f0', fg: '#dc3789', graph: '#f954a6' },
  H: { bg: '#fddddd', fg: '#ed0d10', graph: '#ed425c' },
  I: { bg: '#faf1e2', fg: '#d39218', graph: '#ffbf48' },
  J: { bg: '#e0e1ee', fg: '#1a2380', graph: '#1a2380' },
  K: { bg: '#fee6dc', fg: '#e84200', graph: '#fd6326' },
  L: { bg: '#edf3e1', fg: '#6d9a1a', graph: '#b1ce4d' },
  M: { bg: '#ece2f6', fg: '#7d3ac0', graph: '#7d3ac0' },
  N: { bg: '#ddf6f6', fg: '#039593', graph: '#1ce5bd' },
  O: { bg: '#def0f6', fg: '#1395c3', graph: '#1aabdd' },
  P: { bg: '#fde3f0', fg: '#dc3789', graph: '#f954a6' },
  Q: { bg: '#fddddd', fg: '#ed0d10', graph: '#ed425c' },
  R: { bg: '#faf1e2', fg: '#d39218', graph: '#ffbf48' },
  S: { bg: '#e0e1ee', fg: '#1a2380', graph: '#1a2380' },
  T: { bg: '#fee6dc', fg: '#e84200', graph: '#fd6326' },
  U: { bg: '#edf3e1', fg: '#6d9a1a', graph: '#b1ce4d' },
  V: { bg: '#ece2f6', fg: '#7d3ac0', graph: '#7d3ac0' },
  W: { bg: '#ddf6f6', fg: '#039593', graph: '#1ce5bd' },
  X: { bg: '#def0f6', fg: '#1395c3', graph: '#1aabdd' },
  Y: { bg: '#fde3f0', fg: '#dc3789', graph: '#f954a6' },
  Z: { bg: '#fddddd', fg: '#ed0d10', graph: '#ed425c' }
}

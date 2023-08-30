// uno.config.ts
import {
  defineConfig, presetAttributify, presetMini, presetUno, presetWind,
} from 'unocss'
import transformerVariantGroup from '@unocss/transformer-variant-group'
import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  // extract: {
  //   pipeline: {
  //     include: [
  //       'node_modules/tailvue/dist/tailvue.es.js',
  //     ],
  //   },
  // },
  rules: [
    // [/^bg-\[url\(*\)\]$/, match => ({ background: `url(${match[1]})` })],
    // ['m-1', { margin: '0.25rem' }],
    // [/^m-(\d+)$/, ([, d]) => ({ margin: `${d / 4}rem` })],
    // [/^p-(\d+)$/, match => ({ padding: `${match[1] / 4}rem` })],
  ],
  theme: {
    // fontSize: {
    //   '3xl': '5rem',
    // },
    extends: {
      keyframes: {
        'shaking': {
          '0%': { transform: 'rotate(-15deg)' },
          '2%': { transform: 'rotate(15deg)' },
          '4%': { transform: 'rotate(-18deg)' },
          '6%': { transform: 'rotate(18deg)' },
          '8%': { transform: 'rotate(-22deg)' },
          '10%': { transform: 'rotate(22deg)' },
          '12%': { transform: 'rotate(-18deg)' },
          '14%': { transform: 'rotate(18deg)' },
          '16%': { transform: 'rotate(-12deg)' },
          '18%': { transform: 'rotate(12deg)' },
          '20%, 100%': { transform: 'rotate(0)' },
        },
        'glitch-loop-1': {
          '0%': { clip: 'rect(36px, 9999px, 9px, 0)' },
          '25%': { clip: 'rect(25px, 9999px, 99px, 0)' },
          '50%': { clip: 'rect(50px, 9999px, 102px, 0)' },
          '75%': { clip: 'rect(30px, 9999px, 92px, 0)' },
          '100%': { clip: 'rect(91px, 9999px, 98px, 0)' },
        },
        'glitch-loop-2': {
          '0%': { top: '-1px', left: '1px', clip: 'rect(65px, 9999px, 119px, 0)' },
          '25%': { top: '-6px', left: '4px', clip: 'rect(79px, 9999px, 19px, 0)' },
          '50%': { top: '-3px', left: '2px', clip: 'rect(68px, 9999px, 11px, 0)' },
          '75%': { top: '0', left: '-4px', clip: 'rect(95px, 9999px, 53px, 0)' },
          '100%': { top: '-1px', left: '-1px', clip: 'rect(31px, 9999px, 149px, 0)' },
        },
        'float': {
          '0%': { translateY: '0' },
          '50%': { translateY: '-6px' },
        },
      },

      // animation: {
      //   shaking: 'shaking 5s infinite ease-in-out',
      // },
    },
    boxShadow: {
      post: 'rgba(0, 0, 0, 0.5) 0px 1px 20px -8px',
      darkPost: 'rgba(0, 0, 0, 0.8) 0px 1px 20px -8px',
      moreBtn: '0 0 4px rgba(255, 165, 0, 0.85)',
    },

    colors: {
      sky: {
        1000: '#0A1338',
        950: '#1D205B',
      },
      grayLight: '#969696',
      darkBlue: '#1D1F27',
      dark: {
        header: {
          bg: 'rgb(24, 26, 27)', // background
          btn: 'rgb(107, 128, 150)', // border
        },
        post: {
          bg: '#1d1f27',
        },
      },
      veryCool: '#0000ff', // class="text-very-cool"
      brand: {
        primary: 'hsla(var(--hue, 217), 78%, 51%)', // class="bg-brand-primary"
      },
    },
  },
  shortcuts: [
    { 'flex-center': 'flex items-center justify-center' },
    { 'flex-between': 'flex justify-between' },
    { 'theme-animation': 'transition-all duration-300 ease' },
    // { 'overflow-ellipsis-1': 'overflow-ellipsis overflow-hidden whitespace-nowrap' },
  ],
  presets: [
    presetUno(),
    presetWind(),
    presetMini(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives({
      applyVariable: ['--at-apply', '--uno-apply', '--uno'],
    }),
    transformerVariantGroup(),
  ],
})

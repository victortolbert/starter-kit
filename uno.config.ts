import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'border-base': 'border-gray-200 dark:border-gray-800',
    'bg-active': 'bg-gray:10',
    'bg-faded': 'bg-gray:5',
    'bg-base': 'bg-white dark:bg-[#020420]',
    'btn': 'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer !outline-none hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50',
    'icon-btn': 'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600',
  },
  theme: {
    colors: {
      'primary': {
        DEFAULT: '#00DC82',
      },
      'temperature-01': '#3eff00',
      'temperature-02': '#b0ff00',
      'temperature-03': '#FFfa00',
      'temperature-04': '#FFdc00',
      'temperature-05': '#FFbe00',
      'temperature-06': '#FFa000',
      'temperature-07': '#FF8200',
      'temperature-08': '#FF6400',
      'temperature-09': '#FF4600',
      'temperature-10': '#FF2800',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
  content: {
    filesystem: [
      './docs/**/*.md',
    ],
  },
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left'.split(' '),
})

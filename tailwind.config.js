module.exports = {
    future: {
      removeDeprecatedGapUtilities: true
    },
    purge: {
      content: ['./src/**/*.js', './src/**/**/*.js']
    },
    theme: {
      fill: (theme) => ({
        red: theme('colors.red.primary')
      }),
      colors: {
        white: '#ffffff',
        blue: {
          medium: '#36aaf4'
        },
        black: {
          light: '#262626',
          faded: '#00000059'
        },
        gray: {
          base: '#616161',
          background: '#fafafa',
          primary: '#dbdbdb',
          under: "#919191"
        },
        red: {
          primary: '#ed4956',
          insta: '#cc2b5e'
        }
      }
    },
    variants: {
      extend: {
        display: ['group-hover']
      }
    }
  };
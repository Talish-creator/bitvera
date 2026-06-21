/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			serif: ['"Instrument Serif"', 'serif'],
  		},
  		colors: {
  			background: 'rgb(var(--background))',
  			foreground: 'rgb(var(--foreground))',
  			surface: {
  				main: 'rgb(var(--surface-main))',
  				raised: 'rgb(var(--surface-raised))',
  				elevated: 'rgb(var(--surface-elevated))',
  			},
  			text: {
  				primary: 'rgb(var(--text-primary))',
  				secondary: 'rgb(var(--text-secondary))',
  				accent: 'rgb(var(--text-accent))',
  			},
  			border: {
  				glass: 'rgba(var(--border-glass), <alpha-value>)',
  				DEFAULT: 'rgb(var(--border))',
  			},
  			card: {
  				DEFAULT: 'rgb(var(--card))',
  				foreground: 'rgb(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'rgb(var(--popover))',
  				foreground: 'rgb(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'rgb(var(--primary))',
  				foreground: 'rgb(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'rgb(var(--secondary))',
  				foreground: 'rgb(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'rgb(var(--muted))',
  				foreground: 'rgb(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'rgb(var(--accent))',
  				foreground: 'rgb(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			input: 'rgb(var(--input))',
  			ring: 'rgb(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
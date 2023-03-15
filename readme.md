![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<h1 align="center">NanoGoal.js</h1>

<h3 align="center">Non-custodial, Crypto Funding Browser Plugin.</h3>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

![line](https://github.com/fwd/nano-goal/raw/master/.github/banner.png)

### Live Demo

<a target="_blank" href="https://blog.nano.to">https://goal.nano.to</a>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### Install

**Local:**
```html
<script src="/latest.js"></script>
```

**CDN:**
```html
<script src="https://goal.nano.to/latest.js"></script>
```

**USAGE:**
```html
<script>
    nano.goal({ 
        element: '.goal', // required, all elem with class .goal
        address: 'YOUR_ADDRESS', // required
        amount: 100, // required
        title: 'Bird Sanctuary', // optional
        // color: 'blue', // optional
        // href: 'https://google.com' // optional
        // endpoint: 'https://rpc.nano.to' // optional
        // color: 'red',
        // radius: 0,
        // font: 24,
    })
</script>
```

**BAR-UI:**
```html
<script>
nano.goal({ 
    element: '.goal', // required, all with class .premium
    theme: 'bar-only',
    address: 'YOUR_ADDRESS', // required
    amount: 100, // required
})
</script>
```

**CUSTOM:**
```html
<script>
nano.goal({ 
    element: '.goal', // required, all with class .premium
    theme: 'custom',
    custom: `<h2>Balance: {{balance}} NANO</h2>`,
    address: 'YOUR_ADDRESS', // required
    amount: 100, // required
})
</script>
```

Special strings accepted in ```custom```:

- {{ amount }}
- {{ color }}
- {{ percent }}
- {{ balance }}

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### License

**Limited Commercial:**

- ✅ Personal & Open Source
- ✅ Commercial use where NanoGoal.js is **NOT** the end-product.
- ❌ Commercial use where NanoGoal.js **IS** the end-product.

Contact [@nano2dev](mailto:support@nano.to) for licensing questions.

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### Stargazers

[![Stargazers over time](https://starchart.cc/fwd/nano-goal.svg)](https://github.com/fwd/nano-goal)

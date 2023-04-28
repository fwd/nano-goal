![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<h1 align="center">NanoGoal.js</h1>

<h3 align="center">Non-custodial, Crypto Funding Browser Plugin.</h3>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

![line](https://github.com/fwd/nano-goal/raw/master/.github/banner.png)

### Live Demo

<a target="_blank" href="https://blog.nano.to">https://goal.nano.to</a>

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

<a align="center" target="_blank" href="https://simpleswap.io/?ref=ecc1985b556a"><img style="object-fit: contain;
    max-width: 100%;" src="https://files.simpleswap.io/banners/970x90_EN_fast-and-secure.png" width="970" /></a>

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
<div class="goal" data-title="Bird Sanctuary" data-color="#e74c3c" data-type="bar" data-address="@faucet" data-amount="100"></div>
```

```html
<script>

    nano.goal({ 
        element: '.goal', // required, all with class .premium
    })

    // Legacy API Examples

    // nano.goal({ 
    //     element: '.goal', // required, all with class .premium
    //     address: 'nano_1faucet7b6xjyha7m13objpn5ubkquzd6ska8kwopzf1ecbfmn35d1zey3ys', // required
    //     amount: 100, // required
    //     title: 'Bird Sanctuary', // optional
    //     // color: 'blue', // optional
    //     // href: 'https://google.com' // optional
    // })

</script>
```

Special strings accepted in ```custom```:

- {{ amount }}
- {{ color }}
- {{ percent }}
- {{ balance }}

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### License

MIT

Contact [@nano2dev](mailto:support@nano.to) for licensing questions.

![line](https://github.com/fwd/n2/raw/master/.github/line.png)

### Stargazers

[![Stargazers over time](https://starchart.cc/fwd/nano-goal.svg)](https://github.com/fwd/nano-goal)

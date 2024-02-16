// NanoGoal 1.0.2
// https://github.com/fwd/nano-goal
// (c) Nano.to <support@nano.to>
// Released under MIT License
;(() => {

	if (window.nano === undefined) window.nano = { version: '1.0.2' }

	var rpc = {

	    endpoint: 'https://rpc.nano.to',

		post(endpoint, data) {
			return new Promise((resolve) => {
			    var xhr = new XMLHttpRequest();
			    xhr.open("POST", endpoint, true);
			    xhr.setRequestHeader('Content-Type', 'application/json');
			    xhr.setRequestHeader('Nano-App', 'fwd/nano-goal');
			    xhr.send(JSON.stringify(data));
			    xhr.onload = function() {
			      resolve(JSON.parse(this.responseText))
			    }
			})
		},

	}

    window.nano.goal = (config) => {

		var css = `#funding-wrap { padding: 20px; box-sizing: content-box; border: 8px solid; font-family: inherit; } .flex-item { display: flex; width: 100%;; justify-content: space-between; } #glass { width: 100%; height: 20px; background: #c7c7c7; border-radius: 10px; float: left; overflow: hidden; position: relative; margin: 10px 0; } #contribution { float: left; height: 20px; z-index: 333; position: absolute; opacity: .5; } #progress { float: left; height: 20px; z-index: 333; } .goal-stat { padding: 10px; margin: 0; text-align: center; } .goal-number { font-weight: 700; }`
		var head = document.head || document.getElementsByTagName('head')[0]
		var style = document.createElement('style')

		head.appendChild(style);

		style.type = 'text/css';
		if (style.styleSheet){
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}

		var elements = config.element || config.elements

    	if (elements) {
	        
	        var all = document.querySelectorAll(elements);

        	var bulk = []

			for (let i = 0; i < all.length; i++) {
	        	var temp = {}
				if (all[i].getAttribute('data-address')) {
					temp.address = (all[i].getAttribute('data-address') || all[i].getAttribute('data-username')) 
				} else {
					temp.address = config.address
				}
				if (!temp.address) return alert('Error: No address configured.')
				if (all[i].getAttribute('data-amount')) temp.amount = (all[i].getAttribute('data-amount') || all[i].getAttribute('data-goal')) 
				if (all[i].getAttribute('data-title')) temp.title = all[i].getAttribute('data-title') 
				if (all[i].getAttribute('data-type')) temp.theme = all[i].getAttribute('data-type') 
				if (all[i].getAttribute('data-color')) temp.color = all[i].getAttribute('data-color') 
				temp.el = all[i]
				bulk.push(temp)
			}

			function kFormatter(num) {
			    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K' : Math.sign(num)*Math.abs(num)
			}

			rpc.post(config.endpoint ? config.endpoint : rpc.endpoint, { 
				action: 'accounts_balances', 
				accounts: bulk.map(a => a.address),
			}).then((balance) => {

				if (balance.error) return console.error(balance)

		        for (var el of bulk) {

		        	if (el.address) config.address = el.address
		        	if (el.amount) config.amount = el.amount
		        	if (el.title) config.title = el.title
		        	if (el.color) config.color = el.color
		        	if (el.theme) el.theme = el.theme

		        	// Oy vey
		        	var _balance = balance.balances[el.address]

		        	_balance.balance_nano = Number(_balance.receivable_nano) ? Number(_balance.balance_nano) + Number(_balance.receivable_nano) : _balance.balance_nano

					var percent = (100 * Number(_balance.balance_nano)) / Number(config.amount) > 100 ? 100 : (100 * Number(_balance.balance_nano)) / Number(config.amount)
						percent = Math.floor(percent)

		        	if (el.theme === 'bar' || el.theme === 'bar-only') {
				        var template = `
<a style="text-decoration: none; color: inherit" href="${ config.href ? config.href : ('https://nano.to/' + config.address + '?goal=' + config.amount + (config.title ? ':' + config.title : '') ) }" target="_blank">
<div id="glass">
    <div id="contribution" style="left: 0%; width: ${percent}%; background-color: ${config.color || '#089dff'}">
    </div>
    <div id="progress" style="width: 0%;">
    </div>
</div></a>`

		        	} else if (el.theme === 'custom') {
		        	
		        		var template = config.custom
			        		.replace('{{ amount }}', config.amount).replace('{{amount}}', config.amount)
			        		.replace('{{ color }}', config.color).replace('{{color}}', config.color)
			        		.replace('{{ percent }}', percent).replace('{{percent}}', percent)
			        		.replace('{{ balance }}', Number(_balance.balance_nano).toFixed(2)).replace('{{balance}}', Number(_balance.balance_nano).toFixed(2))
			        		.replace('{{ funded }}', Number(_balance.balance_nano).toFixed(2)).replace('{{funded}}', Number(_balance.balance_nano).toFixed(2))
			        		
		        	} else {

				        var template = `<div id="goal-meter">
	    <a style="text-decoration: none; color: inherit" href="${ config.href ? config.href : ('https://nano.to/' + config.address + '?goal=' + config.amount + (config.title ? ':' + config.title : '') ) }" target="_blank">
		<div id="funding-wrap" style="font-size: ${config.font ? config.font + 'px' : '18px'}; border-color: ${config.color || '#089dff'}; padding: ${config.radius || config.radius === 0 ? '0 5px' : '20px'}; border-radius: ${config.radius || config.radius === 0 ? config.radius + 'px' : '10px'}; border-width: ${config.radius || config.radius === 0 ? '0px' : '8px'};">
		    <div class="flex-item">
		        <div class="goal-stat">${config.title || 'Funding Goal'}</div>
		        <div class="goal-stat">
		            <span style="font-size: 80%; margin-right: -3px">Ӿ</span> ${kFormatter(config.amount)}
		        </div>
		    </div>
		    <div id="glass">
		        <div id="contribution" style="left: 0%; width: ${percent}%; background-color: ${config.color || '#089dff'}">
		        </div>
		        <div id="progress" style="width: 0%;">
		        </div>
		    </div>
		    <div class="flex-item">
		        <div class="goal-stat">
		            <span class="goal-number">
		                ${percent}%
		                <b>${config.strings && config.strings.funded ? config.strings.funded : 'Funded'}</b>
		            </span>
		        </div>
		        <div class="goal-stat">
		            <span class="goal-number">
		                <span style="font-size: 80%; margin-right: -1px">Ӿ</span> ${ kFormatter(Number(_balance.balance_nano).toFixed(2)) }
		                <b>${config.strings && config.strings.raised ? config.strings.raised : 'Raised'}</b>
		            </span>
		        </div>
		    </div>
		</div>
		</a>
	</div>`}

	            	el.el.innerHTML = template


		        }
			})

        }
	      
    }

})();

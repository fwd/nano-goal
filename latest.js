// NanoGoal
// https://github.com/fwd/nano-goal
// Follow me on Twitter @nano2dev
;(async () => {

	if (window.nano === undefined) window.nano = { debug: false }

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
		  // This is required for IE8 and below.
		  style.styleSheet.cssText = css;
		} else {
		  style.appendChild(document.createTextNode(css));
		}

    	if (config.element) {
	        
	        var all = document.querySelectorAll(config.element);

			rpc.post(config.endpoint ? config.endpoint : rpc.endpoint, { 
				action: 'account_info', 
				account: config.address,
			}).then((balance) => {
				var percent = (100 * balance.balance_nano) / Number(config.amount) > 100 ? 100 : (100 * balance.balance_nano) / Number(config.amount)
					percent = Math.floor(percent)
		        for (var i=0, max=all.length; i < max; i++) {

		        	if (config.theme === 'bar-only') {
				        var template = `
<a style="text-decoration: none; color: inherit" href="${ config.href ? config.href : ('https://nano.to/' + config.address + '?goal=' + config.amount + ':' + config.title) }" target="_blank">
<div id="glass">
    <div id="contribution" style="left: 0%; width: ${percent}%; background-color: ${config.color || '#089dff'}">
    </div>
    <div id="progress" style="width: 0%;">
    </div>
</div></a>`

		        	} else if (config.theme === 'custom') {
		        	
		        		var template = config.custom
			        		.replace('{{ amount }}', config.amount).replace('{{amount}}', config.amount)
			        		.replace('{{ color }}', config.color).replace('{{color}}', config.color)
			        		.replace('{{ percent }}', percent).replace('{{percent}}', percent)
			        		.replace('{{ balance }}', Number(balance.balance_nano).toFixed(2)).replace('{{balance}}', Number(balance.balance_nano).toFixed(2))
			        		.replace('{{ funded }}', Number(balance.balance_nano).toFixed(2)).replace('{{funded}}', Number(balance.balance_nano).toFixed(2))
			        		
		        	} else {

				        var template = `<div id="goal-meter">
	    <a style="text-decoration: none; color: inherit" href="${ config.href ? config.href : ('https://nano.to/' + config.address + '?goal=' + config.amount + ':' + config.title) }" target="_blank">
		<div id="funding-wrap" style="font-size: ${config.font ? config.font + 'px' : '18px'}; border-color: ${config.color || '#089dff'}; padding: ${config.radius || config.radius === 0 ? '0 5px' : '20px'}; border-radius: ${config.radius || config.radius === 0 ? config.radius + 'px' : '10px'}; border-width: ${config.radius || config.radius === 0 ? '0px' : '8px'};">
		    <div class="flex-item">
		        <div class="goal-stat">${config.title || 'Funding Goal'}</div>
		        <div class="goal-stat">
		            <span style="font-size: 80%">Ӿ</span> ${config.amount}
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
		                <span style="font-size: 80%">Ӿ</span> ${ Number(balance.balance_nano).toFixed(2) }
		                <b>Raised</b>
		            </span>
		        </div>
		    </div>
		</div>
		</a>
	</div>`

		        	}


		            all[i].innerHTML = template


		        }
			})

        }
	      
    }

})();

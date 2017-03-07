window.onload = function(){
	addSomeInfo();
	var title = $$('.titlelist li a')/*).getElementsByTagName(*/,titlelength = title.length;
	console.log(title);
	console.log(titlelength);
	var cards = $$('.tabcontent .card'),cardslength = cards.length;
	console.log(cards);
	console.log(cardslength);
	if (titlelength!=cardslength) {
		return;
	}
	for (var i = 0; i < titlelength; i++) {
		title[i].id = i;
		cards[i].id = i;
		title[i].onmouseover = function(){
			for (var j = 0; j < titlelength; j++) {
				title[j].className='';
				cards[j].style.display = 'none';
			}
			this.className = 'select';
            cards[this.id].style.display = 'block';
		}
	}
}
// 			title[i].setAttribute('customAttr',i);
// 			cards[i].setAttribute('customAttr',i);
// 			title[i].onmouseover = function(){

// 				for (var j = 0; j < titlelength; j++) {
// 					title[j].className = '';
// 	                cards[j].style.display = 'no';
// 				}
// 				this.className = 'select';
// 	            cards[this['customAttr']].style.display='block';
// 	            console.log(this.getAttribute('customAttr'));

// 			}
// }
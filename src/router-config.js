
import book from './components/book.vue'
import introduction from './components/introduction.vue'
import music from './components/music.vue'

import view from './components/view.vue'
		
		

export default{
	routes:[
		{path : '/book', component : book},
		{path : '/introduction', component : introduction},
		{path : '/view', component : view},
		{path : '/music', component : music},
		/*{path : '/seller', redirect : seller},*/
	]
}
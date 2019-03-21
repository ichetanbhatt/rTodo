(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{109:function(t,e,o){},113:function(t,e,o){"use strict";o.r(e);var a=o(1),n=o.n(a),r=o(6),s=o.n(r),i=(o(48),o(12)),l=o(7),c=o(8),d=o(10),h=o(9),u=o(11),p=o(3),g=o.n(p),m=o(21),f=o.n(m),y=o(36),v=o.n(y),T=o(37),b=o(4),S=function(t){function e(){var t,o;Object(l.a)(this,e);for(var a=arguments.length,n=new Array(a),r=0;r<a;r++)n[r]=arguments[r];return(o=Object(d.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(n)))).state={title:""},o.onChange=function(t){return o.setState({title:t.target.value})},o.onSubmit=function(t){t.preventDefault(),o.state.title.trim().length&&(o.props.addTodo(o.state.title),o.setState({title:""}))},o}return Object(u.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return n.a.createElement("form",{onSubmit:this.onSubmit,autoComplete:"off"},n.a.createElement("input",{className:"form-control form-control-md my-2",type:"text",name:"title",placeholder:"Get things done!","aria-label":"addTodo",value:this.state.title,onChange:this.onChange,style:{borderRadius:"5px"}}))}}]),e}(a.Component),x=(o(109),o(42)),D=function(t){function e(){var t;return Object(l.a)(this,e),(t=Object(d.a)(this,Object(h.a)(e).call(this))).textStyle=function(){return{textDecoration:t.props.todoItem.completed?"line-through":"none",fontWeight:t.props.todoItem.completed?"200":"500"}},t.checkboxStyle=function(){return{position:"absolute",top:"15px",left:"10px"}},t.todoStyle=function(){return{position:"relative",padding:"12px 34px 12px 30px",fontSize:"15px",color:t.props.todoItem.completed?"#c4c4c4":"#4d4d4d",textDecoration:t.props.todoItem.completed?"line-through":"none",borderLeft:t.props.todoItem.completed?"6px solid #c6cbef":"6px solid #8186d5"}},t.deleteBtnStyle=function(){return{position:"absolute",right:"0",top:"0",padding:"12px 16px 12px 16px",color:"black"}},t.editingDone=function(e){13===e.keyCode?t.state.editedTitle.replace(/\s/g,"").length?(t.props.editTodo(t.props.todoItem.id,t.state.editedTitle,t.props.todoItem.completed),t.setState({editMode:!1})):t.props.deleteTodo(t.props.todoItem.id,t.props.todoItem.completed):27===e.keyCode&&t.setState({editMode:!1,editedTitle:t.props.todoItem.title})},t.state={editMode:!1,editedTitle:"",searchTags:[]},t}return Object(u.a)(e,t),Object(c.a)(e,[{key:"componentDidMount",value:function(){this.setState({editedTitle:this.props.todoItem.title})}},{key:"enableEditing",value:function(t){this.setState({editMode:!0,editedTitle:this.props.todoItem.title})}},{key:"editingChange",value:function(t){var e=t.target.value;this.setState({editedTitle:e})}},{key:"render",value:function(){var t=this,e=this.props.todoItem,o=e.id,a=(e.title,e.completed),r={},s={};return this.state.editMode?r.display="none":s.display="none",n.a.createElement("div",{className:"todoItem",key:o},n.a.createElement("div",{style:r,onDoubleClick:this.enableEditing.bind(this)},n.a.createElement("li",{style:this.todoStyle()},n.a.createElement("input",{checked:a,type:"checkbox",onChange:this.props.toggleComplete.bind(this,o,a),style:this.checkboxStyle()}),n.a.createElement("span",{style:{wordBreak:"break-word"}},n.a.createElement(x.a,{style:this.textStyle(),renderHashtag:function(e){return n.a.createElement("a",{style:{color:"#8186d5"},value:e,onClick:t.props.updateTags.bind(t,1,e),key:f()()},e)}},this.state.editedTitle)),n.a.createElement("span",{style:this.deleteBtnStyle(),onClick:this.props.deleteTodo.bind(this,o,a)},n.a.createElement(b.e,{far:!0,icon:"trash-alt"})))),n.a.createElement("div",{style:s},n.a.createElement("li",{style:{position:"relative",padding:"12px 34px 12px 30px",fontSize:"15px",borderLeft:this.props.todoItem.completed?"6px solid #c6cbef":"6px solid #8186d5"}},n.a.createElement("span",null,n.a.createElement(b.f,{outline:!0,type:"textarea",value:this.state.editedTitle,onChange:this.editingChange.bind(this),onKeyDown:this.editingDone.bind(this)})))))}}]),e}(a.Component),E=function(t){function e(){var t,o;Object(l.a)(this,e);for(var a=arguments.length,r=new Array(a),s=0;s<a;s++)r[s]=arguments[s];return(o=Object(d.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(r)))).todoItemView=function(){return o.props.todoArray.map(function(t){return n.a.createElement(D,{key:t.id,todoItem:t,searchTodos:o.props.searchTodos,toggleComplete:o.props.toggleComplete,editTodo:o.props.editTodo,deleteTodo:o.props.deleteTodo,updateTags:o.props.updateTags})})},o.ulStyle=function(){return{margin:"0",padding:"0",listStyleType:"none"}},o}return Object(u.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return n.a.createElement("div",null,n.a.createElement("ul",{style:this.ulStyle()},this.todoItemView()))}}]),e}(a.Component),w=function(t){function e(t,o){var a;return Object(l.a)(this,e),(a=Object(d.a)(this,Object(h.a)(e).call(this,t,o))).searchHashtags=function(){var t=a.state.searchTags,e=[];if(0==t.length)a.setState({searchKeywords:"",searching:!1});else{var o=t.map(function(t){return new Set(a.state.hashtagDict[t])}).reduce(function(t,e){var o=new Set,a=!0,n=!1,r=void 0;try{for(var s,i=e[Symbol.iterator]();!(a=(s=i.next()).done);a=!0){var l=s.value;t.has(l)&&o.add(l)}}catch(c){n=!0,r=c}finally{try{a||null==i.return||i.return()}finally{if(n)throw r}}return o}),n=!0,r=!1,s=void 0;try{for(var i,l=o[Symbol.iterator]();!(n=(i=l.next()).done);n=!0){var c=i.value;e.push(a.state.todosDict[c])}}catch(d){r=!0,s=d}finally{try{n||null==l.return||l.return()}finally{if(r)throw s}}a.setState({searching:!0,searchArray:e}),console.log(e)}},a.extractHashtags=function(t){var e=/(?:^|\s)(#[a-z\d-#]+)/gi,o=(t.match(e)||[]).map(function(t){return t.replace(e,"$1")});return o=new Set(o)},a.deleteUpdateHashtags=function(t,e,o){console.log(t,e,o);var n=a.extractHashtags(e),r=a.extractHashtags(o),s=new Set(n),l=new Set(r),c=!0,d=!1,h=void 0;try{for(var u,p=r[Symbol.iterator]();!(c=(u=p.next()).done);c=!0){var m=u.value;s.delete(m)}}catch(K){d=!0,h=K}finally{try{c||null==p.return||p.return()}finally{if(d)throw h}}var f=!0,y=!1,v=void 0;try{for(var T,b=n[Symbol.iterator]();!(f=(T=b.next()).done);f=!0){var S=T.value;l.delete(S)}}catch(K){y=!0,v=K}finally{try{f||null==b.return||b.return()}finally{if(y)throw v}}var x=Object.assign({},a.state.hashtagDict),D=!0,E=!1,w=void 0;try{for(var O,j=s[Symbol.iterator]();!(D=(O=j.next()).done);D=!0){var k=O.value;console.log(k),x[k]=x[k].filter(function(e){return e!==t}),0==x[k].length&&delete x[k]}}catch(K){E=!0,w=K}finally{try{D||null==j.return||j.return()}finally{if(E)throw w}}var C=!0,I=!1,A=void 0;try{for(var H,V=l[Symbol.iterator]();!(C=(H=V.next()).done);C=!0){var N=H.value;console.log(N);var M=x[N];x.hasOwnProperty(N)?x[N]=[].concat(Object(i.a)(M),[t]):x[N]=[t]}}catch(K){I=!0,A=K}finally{try{C||null==V.return||V.return()}finally{if(I)throw A}}console.log(x),a.setState({hashtagDict:x}),g.a.set("hashtagDict",a.state.hashtagDict)},a.addTodo=function(t){var e=a.extractHashtags(t);console.log(e);var o=f()(),n={id:o,title:t,completed:!1,createdAt:new Date,completedAt:null},r=Object.assign({},a.state.todosDict),s=Object.assign({},a.state.hashtagDict);r[o]=n;var l=!0,c=!1,d=void 0;try{for(var h,u=e[Symbol.iterator]();!(l=(h=u.next()).done);l=!0){var p=h.value;console.log(p),s.hasOwnProperty(p)?s[p].push(o):s[p]=[o]}}catch(m){c=!0,d=m}finally{try{l||null==u.return||u.return()}finally{if(c)throw d}}a.setState({ongoingTodos:[o].concat(Object(i.a)(a.state.ongoingTodos)),todosDict:r,hashtagDict:s},function(){g.a.set("ongoingTodos",a.state.ongoingTodos),g.a.set("todosDict",a.state.todosDict),g.a.set("hashtagDict",a.state.hashtagDict),a.updateView()})},a.editTodo=function(t,e,o){var n=Object.assign({},a.state.todosDict),r=n[t].title;n[t].title=e,a.setState({todosDict:n},function(){g.a.set("todosDict",a.state.todosDict),a.deleteUpdateHashtags(t,r,e),a.updateView()})},a.deleteTodo=function(t,e){console.log(t,e);var o=Object.assign({},a.state.todosDict),n=o[t].title,r=a.extractHashtags(n),s=Object.assign({},a.state.hashtagDict),i=!0,l=!1,c=void 0;try{for(var d,h=r[Symbol.iterator]();!(i=(d=h.next()).done);i=!0){var u=d.value;s[u]=s[u].filter(function(e){return e!==t}),0==s[u].length&&delete s[u]}}catch(p){l=!0,c=p}finally{try{i||null==h.return||h.return()}finally{if(l)throw c}}delete o[t],e?a.setState({completedTodos:a.state.completedTodos.filter(function(e){return e!==t})},function(){return g.a.set("completedTodos",a.state.completedTodos)}):a.setState({ongoingTodos:a.state.ongoingTodos.filter(function(e){return e!==t})},function(){return g.a.set("ongoingTodos",a.state.ongoingTodos)}),a.setState({todosDict:o,hashtagDict:s},function(){g.a.set("todosDict",a.state.todosDict),g.a.set("hashtagDict",a.state.hashtagDict),a.updateView()})},a.toggleComplete=function(t,e){var o=Object.assign({},a.state.todosDict);if(console.log(o[t].completed),o[t].completed=!o[t].completed,console.log(o[t].completed),e){var n=a.state.completedTodos.findIndex(function(e){return e===t}),r=a.state.completedTodos[n];a.setState({ongoingTodos:[r].concat(Object(i.a)(a.state.ongoingTodos)),completedTodos:Object(i.a)(a.state.completedTodos.filter(function(t){return t!==r})),todosDict:o},function(){g.a.set("ongoingTodos",a.state.ongoingTodos),g.a.set("completedTodos",a.state.completedTodos),g.a.set("todosDict",a.state.todosDict),a.updateView()})}else{var s=a.state.ongoingTodos.findIndex(function(e){return e===t}),l=a.state.ongoingTodos[s];a.setState({ongoingTodos:Object(i.a)(a.state.ongoingTodos.filter(function(t){return t!==l})),completedTodos:[l].concat(Object(i.a)(a.state.completedTodos)),todosDict:o},function(){g.a.set("ongoingTodos",a.state.ongoingTodos),g.a.set("completedTodos",a.state.completedTodos),g.a.set("todosDict",a.state.todosDict),a.updateView()})}},a.resetTodos=function(){a.setState({todoArray:[],ongoingTodos:[],completedTodos:[],searchArray:[],searchTags:[],searchKeywords:"",searching:!1,todosDict:{},hashtagDict:{}},function(){g.a.clear()})},a.onChange=function(t){a.setState({searchKeywords:t.target.value},function(){a.searchTodos(a.state.searchKeywords,1)})},a.handleTagsChange=function(t,e){if(t){var o=[].concat(Object(i.a)(a.state.searchTags),[e]);a.setState({searchTags:o},function(){a.searchHashtags()})}else a.setState({searchTags:e},function(){a.searchHashtags()})},a.renderNavbar=function(){return n.a.createElement(b.h,{style:{backgroundColor:"#494ca2"},dark:!0},n.a.createElement(b.i,null,n.a.createElement("span",{className:"white-text"},n.a.createElement(b.e,{icon:"check-circle"}),"\xa0rTodo")),n.a.createElement(b.j,{right:!0},n.a.createElement(b.g,null,n.a.createElement(T.CSVLink,{style:{position:"relative",top:"6px",margin:"20px",color:"white"},data:a.state.todoArray,filename:"rTodo.csv"},n.a.createElement(b.e,{size:"2x",icon:"cloud-download-alt"})),n.a.createElement(b.a,{color:"danger",style:{margin:"0",padding:".375rem .75rem"},onClick:a.resetTodos},n.a.createElement("span",null,"Reset ",n.a.createElement(b.e,{icon:"trash"}))))))},a.state={todoArray:g.a.get("todoArray")||[],ongoingTodos:g.a.get("ongoingTodos")||[],completedTodos:g.a.get("completedTodos")||[],searchArray:[],searchTags:[],searching:!1,todosDict:g.a.get("todosDict")||{},hashtagDict:g.a.get("hashtagDict")||{}},a}return Object(u.a)(e,t),Object(c.a)(e,[{key:"updateView",value:function(){var t=this,e=[],o=!0,a=!1,n=void 0;try{for(var r,s=this.state.ongoingTodos[Symbol.iterator]();!(o=(r=s.next()).done);o=!0){var i=r.value;e.push(this.state.todosDict[i])}}catch(m){a=!0,n=m}finally{try{o||null==s.return||s.return()}finally{if(a)throw n}}var l=!0,c=!1,d=void 0;try{for(var h,u=this.state.completedTodos[Symbol.iterator]();!(l=(h=u.next()).done);l=!0){var p=h.value;e.push(this.state.todosDict[p])}}catch(m){c=!0,d=m}finally{try{l||null==u.return||u.return()}finally{if(c)throw d}}this.setState({todoArray:e},function(){g.a.set("todoArray",t.state.todoArray),t.state.searching&&t.searchHashtags()})}},{key:"render",value:function(){var t={},e={};return this.state.searching?t.display="none":e.display="none",n.a.createElement("div",{className:"App"},this.renderNavbar(),n.a.createElement(b.d,null,n.a.createElement(b.k,null,n.a.createElement(b.c,{sm:"1"}),n.a.createElement(b.c,{sm:"10"},n.a.createElement(b.k,{className:"m-2"},n.a.createElement(b.c,null,n.a.createElement("div",{style:t},n.a.createElement(S,{addTodo:this.addTodo})),n.a.createElement("div",{style:e},n.a.createElement(v.a,{value:this.state.searchTags,onChange:this.handleTagsChange.bind(this,0),inputProps:{placeholder:"Search tags"}})))),n.a.createElement(b.k,{className:"m-2"},n.a.createElement(b.c,null,n.a.createElement(b.b,null,n.a.createElement(E,{todoArray:this.state.searching?this.state.searchArray:this.state.todoArray,updateTags:this.handleTagsChange,editTodo:this.editTodo,toggleComplete:this.toggleComplete,searchTodos:this.searchTodos,deleteTodo:this.deleteTodo}))))))))}}]),e}(a.Component);o(110),o(111),o(112);s.a.render(n.a.createElement(w,null),document.getElementById("root"))},43:function(t,e,o){t.exports=o(113)},48:function(t,e,o){}},[[43,1,2]]]);
//# sourceMappingURL=main.c65808b5.chunk.js.map
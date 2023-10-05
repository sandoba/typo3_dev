import{Plugin as e,Command as t}from"@ckeditor/ckeditor5-core";import{ButtonView as s,View as i,addKeyboardHandlingForGrid as l,LabelView as n,ViewCollection as o,FocusCycler as r,createDropdown as c}from"@ckeditor/ckeditor5-ui";import{FocusTracker as a,KeystrokeHandler as d,first as u,logWarning as h}from"@ckeditor/ckeditor5-utils";import{isObject as g}from"lodash-es";import{findAttributeRange as k,findAttributeRangeBound as y}from"@ckeditor/ckeditor5-typing";
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class p extends s{constructor(e,t){super(e),this.styleDefinition=t,this.previewView=this._createPreview(),this.set({label:t.name,class:"ck-style-grid__button",withText:!0}),this.extendTemplate({attributes:{role:"option"}}),this.children.add(this.previewView,0)}_createPreview(){const e=new i(this.locale);return e.setTemplate({tag:"div",attributes:{class:["ck","ck-reset_all-excluded","ck-style-grid__button__preview","ck-content"],"aria-hidden":"true"},children:[this.styleDefinition.previewTemplate]}),e}}function b(e,{insertAt:t}={}){if(!e||"undefined"==typeof document)return;const s=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css",window.litNonce&&i.setAttribute("nonce",window.litNonce),"top"===t&&s.firstChild?s.insertBefore(i,s.firstChild):s.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}b(":root{--ck-style-panel-columns:3}.ck.ck-style-panel .ck-style-grid{display:grid;grid-template-columns:repeat(var(--ck-style-panel-columns),auto);justify-content:start}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button{display:flex;flex-direction:column;justify-content:space-between}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button .ck-style-grid__button__preview{align-content:center;align-items:center;display:flex;flex-basis:100%;flex-grow:1;justify-content:flex-start}:root{--ck-style-panel-button-width:120px;--ck-style-panel-button-height:80px;--ck-style-panel-button-label-background:#f0f0f0;--ck-style-panel-button-hover-label-background:#ebebeb;--ck-style-panel-button-hover-border-color:#b3b3b3}.ck.ck-style-panel .ck-style-grid{column-gap:var(--ck-spacing-large);row-gap:var(--ck-spacing-large)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button{--ck-color-button-default-hover-background:var(--ck-color-base-background);--ck-color-button-default-active-background:var(--ck-color-base-background);height:var(--ck-style-panel-button-height);padding:0;width:var(--ck-style-panel-button-width)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button:not(:focus){border:1px solid var(--ck-color-base-border)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button .ck-button__label{flex-shrink:0;height:22px;line-height:22px;overflow:hidden;padding:0 var(--ck-spacing-medium);text-overflow:ellipsis;width:100%}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button .ck-style-grid__button__preview{background:var(--ck-color-base-background);border:2px solid var(--ck-color-base-background);opacity:.9;overflow:hidden;padding:var(--ck-spacing-medium);width:100%}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button.ck-disabled{--ck-color-button-default-disabled-background:var(--ck-color-base-foreground)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button.ck-disabled:not(:focus){border-color:var(--ck-style-panel-button-label-background)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button.ck-disabled .ck-style-grid__button__preview{border-color:var(--ck-color-base-foreground);filter:saturate(.3);opacity:.4}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button.ck-on{border-color:var(--ck-color-base-active)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button.ck-on .ck-button__label{box-shadow:0 -1px 0 var(--ck-color-base-active);z-index:1}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button.ck-on:hover{border-color:var(--ck-color-base-active-focus)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button:not(.ck-on) .ck-button__label{background:var(--ck-style-panel-button-label-background)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button:not(.ck-on):hover .ck-button__label{background:var(--ck-style-panel-button-hover-label-background)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button:hover:not(.ck-disabled):not(.ck-on){border-color:var(--ck-style-panel-button-hover-border-color)}.ck.ck-style-panel .ck-style-grid .ck-style-grid__button:hover:not(.ck-disabled):not(.ck-on) .ck-style-grid__button__preview{opacity:1}");
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class f extends i{constructor(e,t){super(e),this.focusTracker=new a,this.keystrokes=new d,this.set("activeStyles",[]),this.set("enabledStyles",[]),this.children=this.createCollection(),this.children.delegate("execute").to(this);for(const s of t){const t=new p(e,s);this.children.add(t)}this.on("change:activeStyles",(()=>{for(const e of this.children)e.isOn=this.activeStyles.includes(e.styleDefinition.name)})),this.on("change:enabledStyles",(()=>{for(const e of this.children)e.isEnabled=this.enabledStyles.includes(e.styleDefinition.name)})),this.setTemplate({tag:"div",attributes:{class:["ck","ck-style-grid"],role:"listbox"},children:this.children})}render(){super.render();for(const e of this.children)this.focusTracker.add(e.element);l({keystrokeHandler:this.keystrokes,focusTracker:this.focusTracker,gridItems:this.children,numberOfColumns:3,uiLanguageDirection:this.locale&&this.locale.uiLanguageDirection}),this.keystrokes.listenTo(this.element)}focus(){this.children.first.focus()}destroy(){super.destroy(),this.focusTracker.destroy(),this.keystrokes.destroy()}}b(".ck.ck-style-panel .ck-style-panel__style-group>.ck-label{margin:var(--ck-spacing-large) 0}.ck.ck-style-panel .ck-style-panel__style-group:first-child>.ck-label{margin-top:0}");
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class m extends i{constructor(e,t,s){super(e),this.labelView=new n(e),this.labelView.text=t,this.gridView=new f(e,s),this.setTemplate({tag:"div",attributes:{class:["ck","ck-style-panel__style-group"],role:"group","aria-labelledby":this.labelView.id},children:[this.labelView,this.gridView]})}}b(":root{--ck-style-panel-max-height:470px}.ck.ck-style-panel{max-height:var(--ck-style-panel-max-height);overflow-y:auto;padding:var(--ck-spacing-large)}");
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class _ extends i{constructor(e,t){super(e);const s=e.t;this.focusTracker=new a,this.keystrokes=new d,this.children=this.createCollection(),this.blockStylesGroupView=new m(e,s("Block styles"),t.block),this.inlineStylesGroupView=new m(e,s("Text styles"),t.inline),this.set("activeStyles",[]),this.set("enabledStyles",[]),this._focusables=new o,this._focusCycler=new r({focusables:this._focusables,focusTracker:this.focusTracker,keystrokeHandler:this.keystrokes,actions:{focusPrevious:["shift + tab"],focusNext:["tab"]}}),t.block.length&&this.children.add(this.blockStylesGroupView),t.inline.length&&this.children.add(this.inlineStylesGroupView),this.blockStylesGroupView.gridView.delegate("execute").to(this),this.inlineStylesGroupView.gridView.delegate("execute").to(this),this.blockStylesGroupView.gridView.bind("activeStyles","enabledStyles").to(this,"activeStyles","enabledStyles"),this.inlineStylesGroupView.gridView.bind("activeStyles","enabledStyles").to(this,"activeStyles","enabledStyles"),this.setTemplate({tag:"div",attributes:{class:["ck","ck-style-panel"]},children:this.children})}render(){super.render(),this._focusables.add(this.blockStylesGroupView.gridView),this._focusables.add(this.inlineStylesGroupView.gridView),this.focusTracker.add(this.blockStylesGroupView.gridView.element),this.focusTracker.add(this.inlineStylesGroupView.gridView.element),this.keystrokes.listenTo(this.element)}focus(){this._focusCycler.focusFirst()}focusLast(){this._focusCycler.focusLast()}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */const S=["caption","colgroup","dd","dt","figcaption","legend","li","optgroup","option","rp","rt","summary","tbody","td","tfoot","th","thead","tr"];class w extends e{static get pluginName(){return"StyleUtils"}constructor(e){super(e),this.decorate("isStyleEnabledForBlock"),this.decorate("isStyleActiveForBlock"),this.decorate("getAffectedBlocks"),this.decorate("isStyleEnabledForInlineSelection"),this.decorate("isStyleActiveForInlineSelection"),this.decorate("getAffectedInlineSelectable"),this.decorate("getStylePreview"),this.decorate("configureGHSDataFilter")}init(){this._htmlSupport=this.editor.plugins.get("GeneralHtmlSupport")}normalizeConfig(e,t=[]){const s={block:[],inline:[]};for(const i of t){const t=[],l=[];for(const s of e.getDefinitionsForView(i.element)){const e="appliesToBlock"in s&&s.appliesToBlock;if(s.isBlock||e){if("string"==typeof e)t.push(e);else if(s.isBlock){const e=s;t.push(s.model),e.paragraphLikeModel&&t.push(e.paragraphLikeModel)}}else l.push(s.model)}const n=this.getStylePreview(i,[{text:"AaBbCcDdEeFfGgHhIiJj"}]);t.length?s.block.push({...i,previewTemplate:n,modelElements:t,isBlock:!0}):s.inline.push({...i,previewTemplate:n,ghsAttributes:l})}return s}isStyleEnabledForBlock(e,t){const s=this.editor.model,i=this._htmlSupport.getGhsAttributeNameForElement(e.element);return!!s.schema.checkAttribute(t,i)&&e.modelElements.includes(t.name)}isStyleActiveForBlock(e,t){const s=this._htmlSupport.getGhsAttributeNameForElement(e.element),i=t.getAttribute(s);return this.hasAllClasses(i,e.classes)}getAffectedBlocks(e,t){return e.modelElements.includes(t.name)?[t]:null}isStyleEnabledForInlineSelection(e,t){const s=this.editor.model;for(const i of e.ghsAttributes)if(s.schema.checkAttributeInSelection(t,i))return!0;return!1}isStyleActiveForInlineSelection(e,t){for(const s of e.ghsAttributes){const i=this._getValueFromFirstAllowedNode(t,s);if(this.hasAllClasses(i,e.classes))return!0}return!1}getAffectedInlineSelectable(e,t){return t}getStylePreview(e,t){const{element:s,classes:i}=e;return{tag:(l=s,S.includes(l)?"div":s),attributes:{class:i},children:t};var l}hasAllClasses(e,t){return g(e)&&(s=e,Boolean(s.classes)&&Array.isArray(s.classes))&&t.every((t=>e.classes.includes(t)));var s}configureGHSDataFilter({block:e,inline:t}){const s=this.editor.plugins.get("DataFilter");s.loadAllowedConfig(e.map(v)),s.loadAllowedConfig(t.map(v))}_getValueFromFirstAllowedNode(e,t){const s=this.editor.model.schema;if(e.isCollapsed)return e.getAttribute(t);for(const i of e.getRanges())for(const e of i.getItems())if(s.checkAttribute(e,t))return e.getAttribute(t);return null}}function v({element:e,classes:t}){return{name:e,classes:t}}b(".ck.ck-dropdown.ck-style-dropdown.ck-style-dropdown_multiple-active>.ck-button>.ck-button__label{font-style:italic}");
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
class A extends e{static get pluginName(){return"StyleUI"}static get requires(){return[w]}init(){const e=this.editor,t=e.plugins.get("DataSchema"),s=e.plugins.get("StyleUtils"),i=e.config.get("style.definitions"),l=s.normalizeConfig(t,i);e.ui.componentFactory.add("style",(t=>{const s=t.t,i=c(t),n=e.commands.get("style");return i.once("change:isOpen",(()=>{const e=new _(t,l);i.panelView.children.add(e),e.delegate("execute").to(i),e.bind("activeStyles").to(n,"value"),e.bind("enabledStyles").to(n,"enabledStyles")})),i.bind("isEnabled").to(n),i.buttonView.withText=!0,i.buttonView.bind("label").to(n,"value",(e=>e.length>1?s("Multiple styles"):1===e.length?e[0]:s("Styles"))),i.bind("class").to(n,"value",(e=>{const t=["ck-style-dropdown"];return e.length>1&&t.push("ck-style-dropdown_multiple-active"),t.join(" ")})),i.on("execute",(t=>{e.execute("style",{styleName:t.source.styleDefinition.name}),e.editing.view.focus()})),i}))}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class x extends t{constructor(e,t){super(e),this.set("value",[]),this.set("enabledStyles",[]),this._styleDefinitions=t,this._styleUtils=this.editor.plugins.get(w)}refresh(){const e=this.editor.model,t=e.document.selection,s=new Set,i=new Set;for(const e of this._styleDefinitions.inline)this._styleUtils.isStyleEnabledForInlineSelection(e,t)&&i.add(e.name),this._styleUtils.isStyleActiveForInlineSelection(e,t)&&s.add(e.name);const l=u(t.getSelectedBlocks())||t.getFirstPosition().parent;if(l){const t=l.getAncestors({includeSelf:!0,parentFirst:!0});for(const l of t){if(l.is("rootElement"))break;for(const e of this._styleDefinitions.block)this._styleUtils.isStyleEnabledForBlock(e,l)&&(i.add(e.name),this._styleUtils.isStyleActiveForBlock(e,l)&&s.add(e.name));if(e.schema.isObject(l))break}}this.enabledStyles=Array.from(i).sort(),this.isEnabled=this.enabledStyles.length>0,this.value=this.isEnabled?Array.from(s).sort():[]}execute({styleName:e,forceValue:t}){if(!this.enabledStyles.includes(e))return void h("style-command-executed-with-incorrect-style-name");const s=this.editor.model,i=s.document.selection,l=this.editor.plugins.get("GeneralHtmlSupport"),n=[...this._styleDefinitions.inline,...this._styleDefinitions.block],o=n.filter((({name:e})=>this.value.includes(e))),r=n.find((({name:t})=>t==e)),c=void 0===t?!this.value.includes(r.name):t;s.change((()=>{let e;e=function(e){return"isBlock"in e}(r)?this._findAffectedBlocks(function(e){const t=Array.from(e.getSelectedBlocks());if(t.length)return t;return[e.getFirstPosition().parent]}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */(i),r):[this._styleUtils.getAffectedInlineSelectable(r,i)];for(const t of e)c?l.addModelHtmlClass(r.element,r.classes,t):l.removeModelHtmlClass(r.element,F(o,r),t)}))}_findAffectedBlocks(e,t){const s=new Set;for(const i of e){const e=i.getAncestors({includeSelf:!0,parentFirst:!0});for(const i of e){if(i.is("rootElement"))break;const e=this._styleUtils.getAffectedBlocks(t,i);if(e){for(const t of e)s.add(t);break}}}return s}}function F(e,t){return e.reduce(((e,s)=>s.name===t.name?e:e.filter((e=>!s.classes.includes(e)))),t.classes)}class B extends e{static get pluginName(){return"DocumentListStyleSupport"}static get requires(){return[w,"GeneralHtmlSupport"]}init(){const e=this.editor;e.plugins.has("DocumentListEditing")&&(this._styleUtils=e.plugins.get(w),this._documentListUtils=this.editor.plugins.get("DocumentListUtils"),this._htmlSupport=this.editor.plugins.get("GeneralHtmlSupport"),this.listenTo(this._styleUtils,"isStyleEnabledForBlock",((e,[t,s])=>{this._isStyleEnabledForBlock(t,s)&&(e.return=!0,e.stop())}),{priority:"high"}),this.listenTo(this._styleUtils,"isStyleActiveForBlock",((e,[t,s])=>{this._isStyleActiveForBlock(t,s)&&(e.return=!0,e.stop())}),{priority:"high"}),this.listenTo(this._styleUtils,"getAffectedBlocks",((e,[t,s])=>{const i=this._getAffectedBlocks(t,s);i&&(e.return=i,e.stop())}),{priority:"high"}),this.listenTo(this._styleUtils,"getStylePreview",((e,[t,s])=>{const i=this._getStylePreview(t,s);i&&(e.return=i,e.stop())}),{priority:"high"}))}_isStyleEnabledForBlock(e,t){const s=this.editor.model;if(!["ol","ul","li"].includes(e.element))return!1;if(!this._documentListUtils.isListItemBlock(t))return!1;const i=this._htmlSupport.getGhsAttributeNameForElement(e.element);if("ol"==e.element||"ul"==e.element){if(!s.schema.checkAttribute(t,i))return!1;const l="numbered"==t.getAttribute("listType")?"ol":"ul";return e.element==l}return s.schema.checkAttribute(t,i)}_isStyleActiveForBlock(e,t){const s=this._htmlSupport.getGhsAttributeNameForElement(e.element),i=t.getAttribute(s);return this._styleUtils.hasAllClasses(i,e.classes)}_getAffectedBlocks(e,t){return this._isStyleEnabledForBlock(e,t)?"li"==e.element?this._documentListUtils.expandListBlocksToCompleteItems(t,{withNested:!1}):this._documentListUtils.expandListBlocksToCompleteList(t):null}_getStylePreview(e,t){const{element:s,classes:i}=e;return"ol"==s||"ul"==s?{tag:s,attributes:{class:i},children:[{tag:"li",children:t}]}:"li"==s?{tag:"ol",children:[{tag:s,attributes:{class:i},children:t}]}:null}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class T extends e{static get pluginName(){return"TableStyleSupport"}static get requires(){return[w]}init(){const e=this.editor;e.plugins.has("TableEditing")&&(this._styleUtils=e.plugins.get(w),this._tableUtils=this.editor.plugins.get("TableUtils"),this.listenTo(this._styleUtils,"isStyleEnabledForBlock",((e,[t,s])=>{this._isApplicable(t,s)&&(e.return=this._isStyleEnabledForBlock(t,s),e.stop())}),{priority:"high"}),this.listenTo(this._styleUtils,"getAffectedBlocks",((e,[t,s])=>{this._isApplicable(t,s)&&(e.return=this._getAffectedBlocks(t,s),e.stop())}),{priority:"high"}),this.listenTo(this._styleUtils,"configureGHSDataFilter",((e,[{block:t}])=>{this.editor.plugins.get("DataFilter").loadAllowedConfig(t.filter((e=>"figcaption"==e.element)).map((e=>({name:"caption",classes:e.classes}))))})))}_isApplicable(e,t){return["td","th"].includes(e.element)?"tableCell"==t.name:!!["thead","tbody"].includes(e.element)&&"table"==t.name}_isStyleEnabledForBlock(e,t){if(["td","th"].includes(e.element)){const s=this._tableUtils.getCellLocation(t),i=t.parent.parent,l=i.getAttribute("headingRows")||0,n=i.getAttribute("headingColumns")||0,o=s.row<l||s.column<n;return"th"==e.element?o:!o}if(["thead","tbody"].includes(e.element)){const s=t.getAttribute("headingRows")||0;return"thead"==e.element?s>0:s<this._tableUtils.getRows(t)}
/* istanbul ignore next -- @preserve */return!1}_getAffectedBlocks(e,t){return this._isStyleEnabledForBlock(e,t)?[t]:null}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class E extends e{static get pluginName(){return"LinkStyleSupport"}static get requires(){return[w,"GeneralHtmlSupport"]}init(){const e=this.editor;e.plugins.has("LinkEditing")&&(this._styleUtils=e.plugins.get(w),this._htmlSupport=this.editor.plugins.get("GeneralHtmlSupport"),this.listenTo(this._styleUtils,"isStyleEnabledForInlineSelection",((e,[t,s])=>{"a"==t.element&&(e.return=this._isStyleEnabled(t,s),e.stop())}),{priority:"high"}),this.listenTo(this._styleUtils,"isStyleActiveForInlineSelection",((e,[t,s])=>{"a"==t.element&&(e.return=this._isStyleActive(t,s),e.stop())}),{priority:"high"}),this.listenTo(this._styleUtils,"getAffectedInlineSelectable",((e,[t,s])=>{if("a"!=t.element)return;const i=this._getAffectedSelectable(t,s);i&&(e.return=i,e.stop())}),{priority:"high"}))}_isStyleEnabled(e,t){const s=this.editor.model;if(t.isCollapsed)return t.hasAttribute("linkHref");for(const e of t.getRanges())for(const t of e.getItems())if((t.is("$textProxy")||s.schema.isInline(t))&&t.hasAttribute("linkHref"))return!0;return!1}_isStyleActive(e,t){const s=this.editor.model,i=this._htmlSupport.getGhsAttributeNameForElement(e.element);if(t.isCollapsed){if(t.hasAttribute("linkHref")){const s=t.getAttribute(i);if(this._styleUtils.hasAllClasses(s,e.classes))return!0}return!1}for(const l of t.getRanges())for(const t of l.getItems())if((t.is("$textProxy")||s.schema.isInline(t))&&t.hasAttribute("linkHref")){const s=t.getAttribute(i);return this._styleUtils.hasAllClasses(s,e.classes)}return!1}_getAffectedSelectable(e,t){const s=this.editor.model;if(t.isCollapsed){const e=t.getAttribute("linkHref");return k(t.getFirstPosition(),"linkHref",e,s)}const i=[];for(const e of t.getRanges()){const t=s.createRange(U(e.start,"linkHref",!0,s),U(e.end,"linkHref",!1,s));for(const e of t.getItems())(e.is("$textProxy")||s.schema.isInline(e))&&e.hasAttribute("linkHref")&&i.push(this.editor.model.createRangeOn(e))}return function(e){for(let t=1;t<e.length;t++){const s=e[t-1].getJoined(e[t]);s&&e.splice(--t,2,s)}return e}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */(i)}}function U(e,t,s,i){const l=e.textNode||(s?e.nodeAfter:e.nodeBefore);if(!l||!l.hasAttribute(t))return e;const n=l.getAttribute(t);return y(e,t,n,s,i)}class V extends e{static get pluginName(){return"StyleEditing"}static get requires(){return["GeneralHtmlSupport",w,B,T,E]}init(){const e=this.editor,t=e.plugins.get("DataSchema"),s=e.plugins.get("StyleUtils"),i=e.config.get("style.definitions"),l=s.normalizeConfig(t,i);e.commands.add("style",new x(e,l)),s.configureGHSDataFilter(l)}}
/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */class C extends e{static get pluginName(){return"Style"}static get requires(){return[V,A]}}export{C as Style,V as StyleEditing,A as StyleUI,w as StyleUtils};
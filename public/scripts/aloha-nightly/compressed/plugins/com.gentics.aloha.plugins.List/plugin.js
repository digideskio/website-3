GENTICS.Aloha.ListPlugin=new GENTICS.Aloha.Plugin("com.gentics.aloha.plugins.List");GENTICS.Aloha.ListPlugin.languages=["en","de","fr","eo","fi","ru","it"];GENTICS.Aloha.ListPlugin.config=["ul","ol"];GENTICS.Aloha.ListPlugin.transformableElements={p:true,h1:true,h2:true,h3:true,h4:true,h5:true,h6:true,ul:true,ol:true};
GENTICS.Aloha.ListPlugin.init=function(){var a=this;this.createUnorderedListButton=new GENTICS.Aloha.ui.Button({iconClass:"GENTICS_button GENTICS_button_ul",size:"small",tooltip:this.i18n("button.createulist.tooltip"),toggle:true,onclick:function(){a.transformList(false)}});GENTICS.Aloha.FloatingMenu.addButton("GENTICS.Aloha.continuoustext",this.createUnorderedListButton,GENTICS.Aloha.i18n(GENTICS.Aloha,"floatingmenu.tab.format"),1);this.createOrderedListButton=new GENTICS.Aloha.ui.Button({iconClass:"GENTICS_button GENTICS_button_ol",
size:"small",tooltip:this.i18n("button.createolist.tooltip"),toggle:true,onclick:function(){a.transformList(true)}});GENTICS.Aloha.FloatingMenu.addButton("GENTICS.Aloha.continuoustext",this.createOrderedListButton,GENTICS.Aloha.i18n(GENTICS.Aloha,"floatingmenu.tab.format"),1);GENTICS.Aloha.EventRegistry.subscribe(GENTICS.Aloha,"selectionChanged",function(b,c){a.createUnorderedListButton.setPressed(false);a.createOrderedListButton.setPressed(false);for(var d=0;d<c.markupEffectiveAtStart.length;d++){var e=
c.markupEffectiveAtStart[d];if(GENTICS.Aloha.Selection.standardTextLevelSemanticsComparator(e,jQuery("<ul></ul>"))){a.createUnorderedListButton.setPressed(true);break}if(GENTICS.Aloha.Selection.standardTextLevelSemanticsComparator(e,jQuery("<ol></ol>"))){a.createOrderedListButton.setPressed(true);break}}GENTICS.Aloha.activeEditable&&a.applyButtonConfig(GENTICS.Aloha.activeEditable.obj);GENTICS.Aloha.FloatingMenu.doLayout()});GENTICS.Aloha.Markup.addKeyHandler(9,function(b){return a.processTab(b)})};
GENTICS.Aloha.ListPlugin.applyButtonConfig=function(a){a=this.getEditableConfig(a);if(GENTICS.Aloha.Selection.rangeObject.unmodifiableMarkupAtStart[0]){jQuery.inArray("ul",a)!=-1&&GENTICS.Aloha.Selection.canTag1WrapTag2(GENTICS.Aloha.Selection.rangeObject.unmodifiableMarkupAtStart[0].nodeName,"ul")!=-1?this.createUnorderedListButton.show():this.createUnorderedListButton.hide();jQuery.inArray("ol",a)!=-1&&GENTICS.Aloha.Selection.canTag1WrapTag2(GENTICS.Aloha.Selection.rangeObject.unmodifiableMarkupAtStart[0].nodeName,
"ol")!=-1?this.createOrderedListButton.show():this.createOrderedListButton.hide()}};GENTICS.Aloha.ListPlugin.processTab=function(a){switch(a.keyCode){case 9:return a.shiftKey?this.outdentList():this.indentList()}return true};GENTICS.Aloha.ListPlugin.getStartingDomObjectToTransform=function(){for(var a=GENTICS.Aloha.Selection.rangeObject,b=0;b<a.markupEffectiveAtStart.length;b++){var c=a.markupEffectiveAtStart[b];if(this.transformableElements[c.nodeName.toLowerCase()])return c}return false};
GENTICS.Aloha.ListPlugin.getNearestSelectedListItem=function(){for(var a=GENTICS.Aloha.Selection.rangeObject,b=0;b<a.markupEffectiveAtStart.length;b++){var c=a.markupEffectiveAtStart[b];if(GENTICS.Utils.Dom.isListElement(c))return c}return false};
GENTICS.Aloha.ListPlugin.transformList=function(a){var b=this.getStartingDomObjectToTransform();if(!b){GENTICS.Aloha.Selection.changeMarkupOnSelection(jQuery("<p></p>"));b=this.getStartingDomObjectToTransform();if(!b){GENTICS.Aloha.Log.error(this,"Could not transform selection into a list");return}}var c=b.nodeName.toLowerCase();if(c=="ul"&&!a){a=jQuery(b);c=a.parent();if(c.length>0&&GENTICS.Utils.Dom.isListElement(c.get(0)))a.children().unwrap();else{b=jQuery(b);jQuery.each(b.children("li"),function(f,
h){var g=GENTICS.Aloha.Markup.transformDomObject(h,"p");g.after(g.children("ol,ul"))});b.children().unwrap()}}else if(c=="ul"&&a){GENTICS.Aloha.Markup.transformDomObject(b,"ol");this.mergeAdjacentLists(jQuery(b))}else if(c=="ol"&&!a){GENTICS.Aloha.Markup.transformDomObject(b,"ul");this.mergeAdjacentLists(jQuery(b))}else if(c=="ol"&&a){a=jQuery(b);c=a.parent();if(c.length>0&&GENTICS.Utils.Dom.isListElement(c.get(0)))a.children().unwrap();else{b=jQuery(b);jQuery.each(b.children("li"),function(f,h){var g=
GENTICS.Aloha.Markup.transformDomObject(h,"p");g.after(g.children("ol,ul"))});b.children().unwrap()}}else{c=GENTICS.Aloha.Selection.rangeObject.getSelectedSiblings(b);a=a?jQuery("<ol></ol>"):jQuery("<ul></ul>");var d=jQuery("<li></li>");a.append(d);jQuery(b).contents().appendTo(d);jQuery(b).replaceWith(a);if(c){b=false;for(var e=0;e<c.length;++e)if(GENTICS.Utils.Dom.isBlockLevelElement(c[e])){if(b)b=false;d=GENTICS.Aloha.Markup.transformDomObject(c[e],"li");a.append(d)}else if(!(c[e].nodeType==3&&
jQuery.trim(c[e].data).length==0)){if(!b){b=jQuery("<li></li>");a.append(b)}b.append(c[e])}}this.mergeAdjacentLists(a)}this.refreshSelection()};
GENTICS.Aloha.ListPlugin.indentList=function(){var a=this.getNearestSelectedListItem();if(a){var b=jQuery(a).prev("li");if(b.length==0)return false;jQuery(a).parent();var c=GENTICS.Aloha.Selection.rangeObject.getSelectedSiblings(a),d=jQuery(a).parent().clone(false).empty();d.append(a);b.append(d);if(c)for(a=0;a<c.length;++a)d.append(jQuery(c[a]));this.mergeAdjacentLists(d);this.refreshSelection();return false}return true};
GENTICS.Aloha.ListPlugin.outdentList=function(){var a=this.getNearestSelectedListItem();if(a){var b=jQuery(a),c=b.parent(),d=c.parents("ul,ol"),e=c.parent("li");if(d.length>0&&GENTICS.Utils.Dom.isListElement(d.get(0))){d=(a=GENTICS.Aloha.Selection.rangeObject.getSelectedSiblings(a))&&a.length>0?jQuery(a[a.length-1]):b;if(d.nextAll("li").length>0){var f=c.clone(false).empty();f.append(d.nextAll())}if(e.length>0){typeof f!=="undefined"&&b.append(f);e.after(b)}else c.before(b);if(a&&a.length>0)for(f=
a.length-1;f>=0;--f)b.after(jQuery(a[f]));c.contents("li").length==0&&c.remove();e.length>0&&e.contents().length==0&&e.remove();this.refreshSelection()}return false}return true};GENTICS.Aloha.ListPlugin.refreshSelection=function(){GENTICS.Aloha.activeEditable&&GENTICS.Aloha.activeEditable.obj[0].focus();GENTICS.Aloha.Selection.rangeObject.update();GENTICS.Aloha.Selection.rangeObject.select();GENTICS.Aloha.Selection.updateSelection()};
GENTICS.Aloha.ListPlugin.mergeAdjacentLists=function(a){for(var b=a.get(0);b.previousSibling&&b.previousSibling.nodeType==1&&b.previousSibling.nodeName==b.nodeName;)b=b.previousSibling;for(a=jQuery(b);b.nextSibling&&(b.nextSibling.nodeType==1&&b.nextSibling.nodeName==b.nodeName||b.nextSibling.nodeType==3&&jQuery.trim(b.nextSibling.data).length==0);){var c=jQuery(b.nextSibling);b.nextSibling.nodeType==1&&c.contents().appendTo(a);c.remove()}};
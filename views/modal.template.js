(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['modal.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "    <div class=\"blog-content--"
    + alias5(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"query","hash":{},"data":data}) : helper)))
    + "\" data-type=\""
    + alias5(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"query","hash":{},"data":data}) : helper)))
    + "\" data-msg=\"\">\r\n      <label for=\""
    + alias5(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"query","hash":{},"data":data}) : helper)))
    + "\" class=\"col-form-label\">"
    + alias5(((helper = (helper = helpers.label || (depth0 != null ? depth0.label : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"label","hash":{},"data":data}) : helper)))
    + "</label>\r\n      <input id=\""
    + alias5(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"query","hash":{},"data":data}) : helper)))
    + "\" type=\""
    + alias5(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"type","hash":{},"data":data}) : helper)))
    + "\" name=\""
    + alias5(((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"query","hash":{},"data":data}) : helper)))
    + "\" class=\"form-control\" placeholder=\""
    + alias5(((helper = (helper = helpers.placeholder || (depth0 != null ? depth0.placeholder : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"placeholder","hash":{},"data":data}) : helper)))
    + "\">\r\n    </div>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    var helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "    <button class=\"blog-footer--"
    + alias5(((helper = (helper = helpers.targetName || (depth0 != null ? depth0.targetName : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"targetName","hash":{},"data":data}) : helper)))
    + " btn\" id=\""
    + alias5(((helper = (helper = helpers.targetName || (depth0 != null ? depth0.targetName : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"targetName","hash":{},"data":data}) : helper)))
    + "\" type=\"submit\" data-btn-target=\""
    + alias5(((helper = (helper = helpers.targetName || (depth0 != null ? depth0.targetName : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"targetName","hash":{},"data":data}) : helper)))
    + "\" >"
    + alias5(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"name","hash":{},"data":data}) : helper)))
    + "</button>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.propertyIsEnumerable, alias2=depth0 != null ? depth0 : (container.nullContext || {}), alias3=container.hooks.helperMissing, alias4="function", alias5=container.escapeExpression;

  return "<div class=\"blog-modal--wrap\">\r\n  <div class=\"blog-modal--head\">\r\n    <h4 class=\"blog-modal--title\">"
    + alias5(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h4>\r\n    <button class=\"blog-modal--close btn-close\" data-btn-target=\"close\" type=\"button\"></button>\r\n  </div>\r\n  <form id=\""
    + alias5(((helper = (helper = helpers.formType || (depth0 != null ? depth0.formType : depth0)) != null ? helper : alias3),(typeof helper === alias4 ? helper.call(alias2,{"name":"formType","hash":{},"data":data}) : helper)))
    + "\" action=\"javascript:;\">\r\n    <div class=\"blog-modal--content modal-body\">\r\n"
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.formData : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "    </div>\r\n    <div class=\"blog-modal--foot modal-footer\">\r\n"
    + ((stack1 = helpers.each.call(alias2,(depth0 != null ? depth0.btns : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </form>\r\n  </div>\r\n</div>\r\n";
},"useData":true});
})();
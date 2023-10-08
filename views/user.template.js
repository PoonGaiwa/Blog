(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['user.hbs'] = template({"1":function(container,depth0,helpers,partials,data) {
    return "<a class=\"blog-head--avatar\" href=\"javascript:;\" data-router=\"write\" id=\"router-view\">\r\n  <img src=\"./public/images/avatar.png\" alt=\"!\">\r\n  <svg class=\"blog-head--write\" xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\"\r\n    class=\"bi bi-pencil-fill\" viewBox=\"0 0 16 16\">\r\n    <path\r\n      d=\"M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z\" />\r\n  </svg>\r\n</a>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<a href=\"javascript:;\" id=\"login\" class=\"blog-btn--login\" data-modal=\"login\">登录</a>&nbsp;/&nbsp;<a\r\n            href=\"javascript:;\" id=\"register\" class=\"blog-btn--register\" data-modal=\"register\">注册</a>\r\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, alias1=container.propertyIsEnumerable;

  return ((stack1 = helpers["if"].call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? depth0.isLogin : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
})();
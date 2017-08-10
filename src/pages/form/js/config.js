/**
 * @file   表单页配置
 * @author windwithfo(windwithfo@yeah.net)
 */

// 表单页模板对象
const templates = {
  text: '<div id="{{name}}" class="form-group has-feedback">'
    + '    <div class="form-title">{{if required}}'
    + '        <em>*</em>{{/if}}<label class="control-label">{{label}}:</label>'
    + '    </div>'
    + '    <input maxlength="50" class="form-control" name="{{name}}" placeholder="{{placeholder}}"/>'
    + '    {{if required}}'
    + '    <span class="glyphicon glyphicon-ok form-control-feedback" '
    + '    style="display:none;" aria-hidden="true"></span>'
    + '    <span class="glyphicon glyphicon-remove form-control-feedback" '
    + '    style="display:none;" aria-hidden="true"></span>'
    + '    {{/if}}'
    + '    <p class="help-block">{{help}}</p>'
    + '</div>',
  radio: '<div id="{{name}}" class="form-group has-feedback">'
    + '    <div class="form-title nlh">{{if required}}'
    + '        <em>*</em>{{/if}}<label class="control-label">{{label}}:</label>'
    + '    </div>'
    + '    {{each list}}'
    + '    <label class="radio-inline">'
    + '    <input type="radio" name="{{name}}" value="{{$value.value}}" {{$value.status}}/> {{$value.text}}'
    + '    </label>'
    + '    {{/each}}'
    + '    <p class="help-block">{{help}}</p>'
    + ' </div>',
  checkbox: '<div id="{{name}}" class="form-group has-feedback">'
    + '    <div class="form-title nlh">{{if required}}'
    + '        <em>*</em>{{/if}}<label class="control-label">{{label}}:</label>'
    + '    </div>'
    + '    {{each list}}'
    + '        <div class="checkbox-inline">'
    + '            <input type="checkbox" name="{{name}}" '
    + '            value="{{$value.value}}" {{$value.status}}> {{$value.text}}'
    + '        </div>'
    + '    {{/each}}'
    + '    <p class="help-block">{{help}}</p>'
    + '    </div>',
  select: '<div id="{{name}}" class="form-group has-feedback">'
    + '      <div class="form-title">{{if required}}'
    + '          <em>*</em>{{/if}}<label class="control-label">{{label}}:</label>'
    + '      </div>'
    + '      <select class="form-control" name="{{name}}">'
    + '          {{each list}}'
    + '          <option value="{{$value.value}}" {{$value.status}}>{{$value.text}}</option>'
    + '          {{/each}}'
    + '      </select>'
    + '      <p class="help-block">{{help}}</p>'
    + '  </div>',
  areatext: '<div maxlength="500" id="{{name}}" class="form-group has-feedback">'
    + '    <div class="form-title">{{if required}}'
    + '        <em>*</em>{{/if}}<label class="control-label">{{label}}:</label>'
    + '    </div>'
    + '        <textarea name="{{name}}" class="form-control" rows="{{rows}}">{{value}}</textarea>'
    + '      <p class="help-block">{{help}}</p>'
    + '    </div>',
  file: '<div id="{{name}}" class="form-group file has-feedback">'
    + '    <div class="form-title">{{if required}}'
    + '        <em>*</em>{{/if}}<label class="control-label">{{label}}:</label>'
    + '    </div>'
    + '    <div class="file-ui">'
    + '        <span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>'
    + '        点击上传文件'
    + '    </div>'
    + '    <input type="file" name={{name}} class="file-body">'
    + '    <p class="help-block">{{help}}</p>'
    + '</div>',
  date: '<div id="{{name}}" class="form-group has-feedback">'
    + '    <div class="form-title">{{if required}}'
    + '        <em>*</em>{{/if}}<label class="control-label">{{label}}:</label>'
    + '    </div>'
    + '    <input class="form-control form_datetime"'
    + '    name="{{name}}" readonly="readonly" placeholder="{{placeholder}}"/>'
    + '    {{if required}}'
    + '    <span class="glyphicon glyphicon-ok form-control-feedback" '
    + '    style="display:none;" aria-hidden="true"></span>'
    + '    <span class="glyphicon glyphicon-remove form-control-feedback" '
    + '    style="display:none;" aria-hidden="true"></span>'
    + '    {{/if}}'
    + '    <p class="help-block">{{help}}</p>'
    + '</div>'
};

// 表单页规则校验对象
const rules = {
  email: /^([A-Za-z0-9_.-])+@([a-zA-Z0-9_-])+.([A-Za-z]{2,4})$/,
  phone: /^(\+86|086)?(13|18|15)\d{9}$/,
  number: /^(-|\+)?\d+(.\d{1,2})?$/
};

const dataUrl = '/mock/form.json';

export default {
  templates,
  rules,
  dataUrl
};

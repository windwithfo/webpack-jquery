/**
 * @file   动态表单页
 * @author windwithfo(windwithfo@yeah.net)
 */

// common for bootstrap
import 'babel-polyfill';
import $        from 'jquery';
import template from 'template';
import common   from 'comjs/common';
import 'datepicker';
import 'comcss/common';

// local files
import './css/style';
import config from './js/config';

let form;
let formData;
let flag = false;
let fr = common.queryString('fr');

// FetchData or SendData
$.get(config.dataUrl, function (ret) {
  if (ret.data) {
    form = Object.assign({}, ret.data);
  }
  else {
    return;
  }
  let dateArr = [];
  let html = '';
  let render;
  if (form) {
    $('#title').text(form.title);
    $('title').text(form.title);
    for (let field of form.fields) {
      render = template.compile(config.templates[field.type]);
      html += render(field);
      if (field.type === 'date') {
        dateArr.push({
          name: field.name,
          autoclose: true,
          startView: field.custom.startView,
          minView: field.custom.minView,
          format: field.custom.format
        });
      }
    }
  }
  html += '<input type="hidden" id="fr" name="fr"/>';
  html += '<button id="btn" class="btn btn-submit">Commit</button>';
  $('#c_form').html(html);
  $('#fr').val(fr);

  // 文件选择框美化
  $('[type="file"]').on('change', function () {
    let val = $(this).val();
    if (val) {
      $('.file-ui').html($(this).val());
    }
    else {
      $('.file-ui').html('<span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span>&nbsp;点击上传文件');
    }
  });
  $('.file-ui').on('click', function () {
    $('.file-body').click();
  });

  // 日历空间批量初始化
  for (let i = 0, len = dateArr.length;i < len;i++) {
    $('#' + dateArr[i].name + ' input').datetimepicker(dateArr[i]);
  }
}, 'json');

// event regedit
$('#form').on('submit', function () {
  if (flag === true) {
    return;
  }

  $('#btn').attr('disabled', 'true');
  flag = true;

  flag = validate();

  if (flag) {
    if (window.FormData) {
      $.ajax({
        url: form.sendUrl,
        type: 'POST',
        cache: false,
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false,
        async: false
      }).done((res) => {
        if (res.code === 1006) {
          $('#content').hide();
          $('#result').height($('body').height());
          $('#result').show();
        }
        else {
          $('#errMsg').text(res.msg);
          $('.modal').modal();
        }
        $('#btn').removeAttr('disabled');
        flag = false;
      });
    }
    else {
      $('#page')
      .append('<iframe id="form-iframe" width="0" height="0" border="0" '
      + 'name="form-iframe" style="width:0;height:0;border:0;display:none;"></iframe>');
      $(this).prop('action', form.sendUrl);
      $(this).prop('method', 'post');
      $(this).prop('target', 'form-iframe');
      $('#form-iframe').on('load', function () {
        let res;
        try {
          res = JSON.parse($(this)[0].contentDocument.body.textContent);
          if (res.code === 1006) {
            $('#content').hide();
            $('#result').height($('body').height());
            $('#result').show();
          }
          else {
            $('#errMsg').text(res.msg);
            $('.modal').modal();
          }
        }
        catch (e) {
          $('#errMsg').text('系统出错，请重试！');
          $('.modal').modal();
        }
        finally {
          $('#btn').removeAttr('disabled');
          flag = false;
          $(this).remove();
        }
      });
      $(this)[0].submit();
    }
  }
  else {
    $('#errMsg').text('请检查报名信息后重新提交！');
    $('.modal').modal();
    $('#btn').removeAttr('disabled');
    flag = false;
  }
  return false;
});

function validate() {
  if (window.FormData) {
    formData = new window.FormData();
    formData.append('fr', fr);
  }
  let ret = true;
  let val;
  for (let field of form.fields) {
    switch (field.type) {
      case 'date':
      case 'text':
        val = common.trim($('#' + field.name + ' input').val());
        if (formData) {
          formData.append(field.name, val);
        }
        if (field.required && val.length < 1) {
          ret = false;
        }
        if (field.rule) {
          ret = config.rules[field.rule].test(val);
        }
        break;
      case 'checkbox':
        val = [];
        $('[name="' + field.name + '"]').each(function () {
          if ($(this).is(':checked')) {
            if (formData) {
              formData.append(field.name, $(this).val());
            }
            val.push($(this).val());
          }
        });
        if (field.required) {
          ret = val.length > 0 ? 1 : 0;
        }
        break;
      case 'select':
        val = $('#' + field.name + ' select').val();
        if (formData) {
          formData.append(field.name, val);
        }
        if (field.required) {
          ret = val ? 1 : 0;
        }
        break;
      case 'areatext':
        val = common.trim($('#' + field.name + ' areatext').val());
        if (formData) {
          formData.append(field.name, val);
        }
        if (field.required) {
          ret = val.length > 0 ? 1 : 0;
        }
        break;
      case 'radio':
        val = $('[name="' + field.name + '"]:checked').val();
        if (formData) {
          formData.append(field.name, val);
        }
        if (field.required) {
          ret = val ? 1 : 0;
        }
        break;
      case 'file':
        val = $('#' + field.name + ' input').val();
        if (formData) {
          formData.append(field.name, $('#' + field.name + ' input')[0].files[0]);
        }
        if (field.required) {
          ret = val ? 1 : 0;
        }
        break;
    }
    $('#' + field.name).removeClass('has-success, has-error');
    $('#' + field.name + ' .glyphicon').hide();
    if (ret) {
      $('#' + field.name).addClass('has-success');
      $('#' + field.name + ' .glyphicon-ok').show();
    }
    else {
      $('#' + field.name).addClass('has-error');
      $('#' + field.name + ' .glyphicon-remove').show();
      break;
    }
  }
  return ret;
}
